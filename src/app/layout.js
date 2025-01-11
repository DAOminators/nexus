import localFont from "next/font/local";
import "./globals.css";
import UploadPaper from "./components/UploadPaper";
import Page from "./page";
// import HOME from "./home/page";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Nexus",
  description: "Research DAO",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <main className="w-full mx-auto">
          <Page />
          <UploadPaper />
          {children}
        </main>
      </body>
    </html>
  );
}
