import "./globals.css";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
      <div className="flex flex-col min-h-screen">
    <header className="bg-gray-200 p-5">header</header>
    <div className="flex-1 flex">
        {children}
      </div>

    <footer className="bg-gray-200 p-5">footer</footer>
    </div>
      </body>
    </html>
  );
}
