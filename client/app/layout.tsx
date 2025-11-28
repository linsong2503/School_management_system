import type { Metadata } from "next";
import { Inter } from "next/font/google";
import DashboardWrapper from "./dashboardWrapper";
import "./globals.css";
// import { ToastContainer } from "react-toastify";
import { Toaster } from "sonner";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Central Primary School",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <DashboardWrapper>
          {children}
           <Toaster richColors closeButton />
        </DashboardWrapper>
      </body>
    </html>
  );
}
