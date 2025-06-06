"use client";
import { useState, useEffect, useRef } from "react";
import { ArrowRight, Link, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TimelineItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  icon: React.ElementType;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
}

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
}

export default function RadialOrbitalTimeline({
  timelineData,
}: RadialOrbitalTimelineProps) {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>(
    {}
  );
  const [viewMode, setViewMode] = useState<"orbital">("orbital");
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
  const [centerOffset, setCenterOffset] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      setAutoRotate(true);
    }
  };

  const toggleItem = (id: number) => {
    setExpandedItems((prev) => {
      const newState = { ...prev };
      Object.keys(newState).forEach((key) => {
        if (parseInt(key) !== id) {
          newState[parseInt(key)] = false;
        }
      });

      newState[id] = !prev[id];

      if (!prev[id]) {
        setActiveNodeId(id);
        setAutoRotate(false);

        const relatedItems = getRelatedItems(id);
        const newPulseEffect: Record<number, boolean> = {};
        relatedItems.forEach((relId) => {
          newPulseEffect[relId] = true;
        });
        setPulseEffect(newPulseEffect);

        centerViewOnNode(id);
      } else {
        setActiveNodeId(null);
        setAutoRotate(true);
        setPulseEffect({});
      }

      return newState;
    });
  };

  useEffect(() => {
    let rotationTimer: NodeJS.Timeout;

    if (autoRotate && viewMode === "orbital") {
      rotationTimer = setInterval(() => {
        setRotationAngle((prev) => {
          const newAngle = (prev + 0.3) % 360;
          return Number(newAngle.toFixed(3));
        });
      }, 50);
    }

    return () => {
      if (rotationTimer) {
        clearInterval(rotationTimer);
      }
    };
  }, [autoRotate, viewMode]);

  // Add window resize listener to adjust positions
  useEffect(() => {
    const handleResize = () => {
      // Force a re-render when window is resized
      setRotationAngle(rotationAngle => rotationAngle + 0.001);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const centerViewOnNode = (nodeId: number) => {
    if (viewMode !== "orbital" || !nodeRefs.current[nodeId]) return;

    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
    const totalNodes = timelineData.length;
    const targetAngle = (nodeIndex / totalNodes) * 360;

    setRotationAngle(270 - targetAngle);
  };

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    // Responsive radius based on screen size
    const radius = typeof window !== 'undefined'
      ? window.innerWidth < 480
        ? 130
        : window.innerWidth < 640
          ? 150
          : window.innerWidth < 768
            ? 180
            : 200
      : 200;
    const radian = (angle * Math.PI) / 180;

    // Use toFixed(3) to ensure consistent string formatting between server and client
    const x = parseFloat((radius * Math.cos(radian) + centerOffset.x).toFixed(3));
    const y = parseFloat((radius * Math.sin(radian) + centerOffset.y).toFixed(3));

    // Ensure consistent number formatting for zIndex and opacity
    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = parseFloat(
      Math.max(0.4, Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2))).toFixed(6)
    );

    return { x, y, angle, zIndex, opacity };
  };

  const getRelatedItems = (itemId: number): number[] => {
    const currentItem = timelineData.find((item) => item.id === itemId);
    return currentItem ? currentItem.relatedIds : [];
  };

  const isRelatedToActive = (itemId: number): boolean => {
    if (!activeNodeId) return false;
    const relatedItems = getRelatedItems(activeNodeId);
    return relatedItems.includes(itemId);
  };

  const getStatusStyles = (status: TimelineItem["status"]): string => {
    switch (status) {
      case "completed":
        return "text-gray-100 dark:text-white bg-gray-800 dark:bg-black border-gray-300 dark:border-white";
      case "in-progress":
        return "text-gray-900 dark:text-black bg-gray-100 dark:bg-white border-gray-800 dark:border-black";
      case "pending":
        return "text-gray-100 dark:text-white bg-gray-800/40 dark:bg-black/40 border-gray-300/50 dark:border-white/50";
      default:
        return "text-gray-100 dark:text-white bg-gray-800/40 dark:bg-black/40 border-gray-300/50 dark:border-white/50";
    }
  };

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center overflow-hidden relative"
      ref={containerRef}
      onClick={handleContainerClick}
    >
      <div className="relative w-full max-w-4xl h-full flex items-center justify-center px-4 sm:px-6">
        <div
          className="absolute w-full h-full flex items-center justify-center"
          ref={orbitRef}
          style={{
            perspective: "1000px",
            transform: `translate(${centerOffset.x}px, ${centerOffset.y}px)`,
          }}
        >
          <div className="absolute w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-purple-500 via-blue-500 to-teal-500 animate-pulse flex items-center justify-center z-10">
            <div className="absolute w-20 h-20 sm:w-24 sm:h-24 rounded-full border border-gray-300/20 dark:border-white/20 animate-ping opacity-70"></div>
            <div
              className="absolute w-24 h-24 sm:w-28 sm:h-28 rounded-full border border-gray-300/10 dark:border-white/10 animate-ping opacity-50"
              style={{ animationDelay: "0.5s" }}
            ></div>
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/80 backdrop-blur-md"></div>
          </div>

          <div className="absolute w-[260px] h-[260px] min-[480px]:w-[300px] min-[480px]:h-[300px] sm:w-[380px] sm:h-[380px] rounded-full border border-gray-300/10 dark:border-white/10"></div>

          {timelineData.map((item, index) => {
            const position = calculateNodePosition(index, timelineData.length);
            const isExpanded = expandedItems[item.id];
            const isRelated = isRelatedToActive(item.id);
            const isPulsing = pulseEffect[item.id];
            const Icon = item.icon;

            // Ensure consistent style formatting between server and client
            const nodeStyle = {
              transform: `translate(${position.x}px, ${position.y}px)`,
              zIndex: isExpanded ? 200 : position.zIndex,
              opacity: isExpanded ? 1 : position.opacity,
            };

            return (
              <div
                key={item.id}
                ref={(el) => { nodeRefs.current[item.id] = el; }}
                className="absolute transition-all duration-700 cursor-pointer"
                style={nodeStyle}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleItem(item.id);
                }}
              >
                <div
                  className={`absolute rounded-full -inset-1 ${
                    isPulsing ? "animate-pulse duration-1000" : ""
                  }`}
                  style={{
                    background: `radial-gradient(circle, rgba(128,128,128,0.2) 0%, rgba(128,128,128,0) 70%)`,
                  filter: 'var(--tw-blur)',
                  backdropFilter: 'var(--tw-backdrop-blur)',
                    width: `${item.energy * 0.5 + 40}px`,
                    height: `${item.energy * 0.5 + 40}px`,
                    left: `-${(item.energy * 0.5 + 40 - 40) / 2}px`,
                    top: `-${(item.energy * 0.5 + 40 - 40) / 2}px`,
                  }}
                ></div>

                <div
                  className={`
                  w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center
                  ${
                    isExpanded
                      ? "bg-white text-gray-900 dark:text-black"
                      : isRelated
                      ? "bg-white/50 text-gray-900 dark:text-black"
                      : "bg-gray-200 dark:bg-black text-gray-900 dark:text-white"
                  }
                  border-2
                  ${
                    isExpanded
                      ? "border-gray-400 dark:border-white shadow-lg shadow-gray-400/30 dark:shadow-white/30"
                      : isRelated
                      ? "border-gray-400 dark:border-white animate-pulse"
                      : "border-gray-400/40 dark:border-white/40"
                  }
                  transition-all duration-300 transform
                  ${isExpanded ? "scale-150" : ""}
                `}
                >
                  <Icon size={isExpanded ? 24 : 20} />
                </div>

                <div
                  className={`
                  absolute top-14 sm:top-16 whitespace-nowrap
                  text-xs font-bold tracking-wider text-center
                  transition-all duration-300 left-1/2 -translate-x-1/2
                  ${isExpanded ? "text-gray-900 dark:text-white scale-125" : "text-gray-700 dark:text-white/70"}
                `}
                >
                  {item.title}
                </div>

                {isExpanded && (
                  <Card className="absolute top-20 sm:top-20 left-1/2 -translate-x-1/2 w-[calc(100vw-40px)] max-w-[300px] sm:w-72 bg-gray-100/90 dark:bg-black/90 backdrop-blur-lg border-gray-300 dark:border-white/30 shadow-xl dark:shadow-white/10 overflow-visible z-50 mb-16">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-px h-3 bg-gray-400/50 dark:bg-white/50"></div>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <Badge
                          className={`px-2 text-xs ${getStatusStyles(
                            item.status
                          )}`}
                          variant="outline"
                        >
                          {item.status === "completed"
                            ? "AVAILABLE"
                            : item.status === "in-progress"
                            ? "IN PROGRESS"
                            : "LAUNCHING SOON"}
                        </Badge>
                        <span className="text-xs font-mono text-gray-500 dark:text-white/50">
                          {item.date}
                        </span>
                      </div>
                      <CardTitle className="text-sm mt-2 font-bold text-center">
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-xs sm:text-sm text-gray-700 dark:text-white/80 pb-4">
                      <p>{item.content}</p>

                      <div className="mt-4 pt-3 border-t border-gray-300/10 dark:border-white/10">
                        <div className="flex justify-between items-center text-xs mb-1">
                          <span className="flex items-center">
                            <Zap size={10} className="mr-1" />
                            Energy Level
                          </span>
                          <span className="font-mono">{item.energy}%</span>
                        </div>
                        <div className="w-full h-1 bg-gray-300/10 dark:bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                            style={{ width: `${item.energy}%` }}
                          ></div>
                        </div>
                      </div>

                      {item.relatedIds.length > 0 && (
                        <div className="mt-4 pt-3 border-t border-gray-300/10 dark:border-white/10">
                          <div className="flex items-center mb-2">
                            <Link size={10} className="text-gray-500 dark:text-white/70 mr-1" />
                            <h4 className="text-xs uppercase tracking-wider font-medium text-gray-500 dark:text-white/70">
                              Connected Nodes
                            </h4>
                          </div>
                          <div className="flex flex-wrap gap-1 pb-2">
                            {item.relatedIds.map((relatedId) => {
                              const relatedItem = timelineData.find(
                                (i) => i.id === relatedId
                              );
                              return (
                                <Button
                                  key={relatedId}
                                  variant="outline"
                                  size="sm"
                                  className="flex items-center h-6 px-2 py-0 text-xs rounded-none border-gray-300/20 dark:border-white/20 bg-transparent hover:bg-gray-200/10 dark:hover:bg-white/10 text-gray-700 dark:text-white/80 hover:text-gray-900 dark:hover:text-white transition-all"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleItem(relatedId);
                                  }}
                                >
                                  {relatedItem?.title}
                                  <ArrowRight
                                    size={8}
                                    className="ml-1 text-gray-500/60 dark:text-white/60"
                                  />
                                </Button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
