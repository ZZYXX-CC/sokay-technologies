import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'About | Sokay Technologies',
  description: 'Learn about Sokay Technologies and our premium audio equipment.',
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
