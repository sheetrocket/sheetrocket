"use client";
import DashboardLayout from "./_components/DashboardLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <DashboardLayout>{children}</DashboardLayout>
    </html>
  );
}
