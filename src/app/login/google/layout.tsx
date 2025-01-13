export default function GoogleRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-full items-start justify-center min-h-screen py-2">
      {children}
    </div>
  );
}
