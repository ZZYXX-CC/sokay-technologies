"use client";

import { useEffect, useState } from 'react';

interface PerformanceMetrics {
  fcp: number | null;
  lcp: number | null;
  cls: number | null;
  fid: number | null;
  ttfb: number | null;
}

export function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fcp: null,
    lcp: null,
    cls: null,
    fid: null,
    ttfb: null,
  });
  
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only run in development mode
    if (process.env.NODE_ENV !== 'development') return;
    
    // Toggle visibility with keyboard shortcut (Ctrl+Shift+P)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'P') {
        e.preventDefault();
        setVisible(prev => !prev);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    // Measure First Contentful Paint (FCP)
    const fcpObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      if (entries.length > 0) {
        const fcp = entries[0].startTime;
        setMetrics(prev => ({ ...prev, fcp }));
      }
    });
    
    fcpObserver.observe({ type: 'paint', buffered: true });
    
    // Measure Largest Contentful Paint (LCP)
    const lcpObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      if (entries.length > 0) {
        const lastEntry = entries[entries.length - 1];
        const lcp = lastEntry.startTime;
        setMetrics(prev => ({ ...prev, lcp }));
      }
    });
    
    lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
    
    // Measure Cumulative Layout Shift (CLS)
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (!(entry as any).hadRecentInput) {
          clsValue += (entry as any).value;
          setMetrics(prev => ({ ...prev, cls: clsValue }));
        }
      }
    });
    
    clsObserver.observe({ type: 'layout-shift', buffered: true });
    
    // Measure First Input Delay (FID)
    const fidObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      if (entries.length > 0) {
        const firstInput = entries[0];
        const fid = (firstInput as any).processingStart - (firstInput as any).startTime;
        setMetrics(prev => ({ ...prev, fid }));
      }
    });
    
    fidObserver.observe({ type: 'first-input', buffered: true });
    
    // Measure Time to First Byte (TTFB)
    const navigationEntries = performance.getEntriesByType('navigation');
    if (navigationEntries.length > 0) {
      const ttfb = (navigationEntries[0] as any).responseStart;
      setMetrics(prev => ({ ...prev, ttfb }));
    }
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      fcpObserver.disconnect();
      lcpObserver.disconnect();
      clsObserver.disconnect();
      fidObserver.disconnect();
    };
  }, []);
  
  if (!visible || process.env.NODE_ENV !== 'development') return null;
  
  const getMetricColor = (name: string, value: number | null): string => {
    if (value === null) return 'text-gray-400';
    
    switch (name) {
      case 'FCP':
        return value < 1800 ? 'text-green-500' : value < 3000 ? 'text-yellow-500' : 'text-red-500';
      case 'LCP':
        return value < 2500 ? 'text-green-500' : value < 4000 ? 'text-yellow-500' : 'text-red-500';
      case 'CLS':
        return value < 0.1 ? 'text-green-500' : value < 0.25 ? 'text-yellow-500' : 'text-red-500';
      case 'FID':
        return value < 100 ? 'text-green-500' : value < 300 ? 'text-yellow-500' : 'text-red-500';
      case 'TTFB':
        return value < 200 ? 'text-green-500' : value < 500 ? 'text-yellow-500' : 'text-red-500';
      default:
        return 'text-gray-400';
    }
  };
  
  return (
    <div className="fixed bottom-4 right-4 z-50 bg-black/80 text-white p-4 rounded-lg shadow-lg font-mono text-xs">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold">Performance Metrics</h3>
        <button 
          onClick={() => setVisible(false)}
          className="text-gray-400 hover:text-white"
        >
          ✕
        </button>
      </div>
      <div className="space-y-1">
        <div className="flex justify-between">
          <span>FCP:</span>
          <span className={getMetricColor('FCP', metrics.fcp)}>
            {metrics.fcp ? `${metrics.fcp.toFixed(0)}ms` : 'Measuring...'}
          </span>
        </div>
        <div className="flex justify-between">
          <span>LCP:</span>
          <span className={getMetricColor('LCP', metrics.lcp)}>
            {metrics.lcp ? `${metrics.lcp.toFixed(0)}ms` : 'Measuring...'}
          </span>
        </div>
        <div className="flex justify-between">
          <span>CLS:</span>
          <span className={getMetricColor('CLS', metrics.cls)}>
            {metrics.cls !== null ? metrics.cls.toFixed(3) : 'Measuring...'}
          </span>
        </div>
        <div className="flex justify-between">
          <span>FID:</span>
          <span className={getMetricColor('FID', metrics.fid)}>
            {metrics.fid ? `${metrics.fid.toFixed(0)}ms` : 'Waiting for input...'}
          </span>
        </div>
        <div className="flex justify-between">
          <span>TTFB:</span>
          <span className={getMetricColor('TTFB', metrics.ttfb)}>
            {metrics.ttfb ? `${metrics.ttfb.toFixed(0)}ms` : 'Measuring...'}
          </span>
        </div>
      </div>
      <div className="mt-2 text-gray-400 text-[10px]">
        Press Ctrl+Shift+P to toggle
      </div>
    </div>
  );
}
