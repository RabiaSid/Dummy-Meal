import localFont from "next/font/local";
import "@/app/globals.scss";

const geistInter = localFont({
  src: "./fonts/Inter-Regular.woff",
  variable: "--font-geist-inter",
  weight: "100 900",
});
const geistPoppin = localFont({
  src: "./fonts/poppins-regular.woff",
  variable: "--font-geist-poppin",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistPoppin.variable} ${geistInter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
