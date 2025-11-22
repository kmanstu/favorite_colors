// app/layout.tsx
import React from "react";

export const metadata = {
  title: "Favorite Colors",
  description: "Simple app to track people and their favorite colors",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          background: "linear-gradient(to bottom right, #eff6ff, #e0e7ff)",
          minHeight: "100vh",
        }}
      >
        {children}
      </body>
    </html>
  );
}
