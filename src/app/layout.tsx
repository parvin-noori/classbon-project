import "./globals.css";
import {Figtree} from "next/font/google";
import localFont from "next/font/local";

const figtree = Figtree({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-figtree",
  weight:["300",  "400", "500", "600", "700","800","900"]
})

const yekanbakh = localFont({
  src: [
      {
          path: "../../public/fonts/yekanbakh/YekanBakhFaNum-Thin.woff2",
          weight: "100",
          style: "normal",
      },
      {
          path: "../../public/fonts/yekanbakh/YekanBakhFaNum-Light.woff2",
          weight: "300",
          style: "normal",
      },
      {
          path: "../../public/fonts/yekanbakh/YekanBakhFaNum-Regular.woff2",
          weight: "400",
          style: "normal",
      },
      {
          path: "../../public/fonts/yekanbakh/YekanBakhFaNum-SemiBold.woff2",
          weight: "600",
          style: "normal",
      },
      {
          path: "../../public/fonts/yekanbakh/YekanBakhFaNum-Bold.woff2",
          weight: "700",
          style: "normal",
      },
      {
          path: "../../public/fonts/yekanbakh/YekanBakhFaNum-Black.woff2",
          weight: "900",
          style: "normal",
      },
  ],
  variable: "--font-yekanbakh",
});





export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html  dir="rtl" className={`dark ${figtree.variable} ${yekanbakh.variable}`}>
      <body className="flex flex-col min-h-screen dark:bg-base-100 dark:text-base-content">
    <header className="bg-gray-200 p-5">دوره معماری ری اکت</header>
    <div className="flex-1 flex">
        {children}
      </div>

    <footer className="bg-gray-200 p-5">footer</footer>

      </body>
    </html>
  );
}
