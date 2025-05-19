import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us - Sokay Technologies',
  description: 'Get in touch with our team at Sokay Technologies for product inquiries, technical assistance, or order support. We\'re here to help with any questions you might have.',
  openGraph: {
    title: 'Contact Us - Sokay Technologies',
    description: 'Get in touch with our team at Sokay Technologies for product inquiries, technical assistance, or order support.',
    type: 'website',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>{children}</>
  );
} 