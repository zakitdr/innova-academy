// app/layout.tsx
import "./globals.css";
import Navbar from "../components/Navbar"; // use relative import, no alias

export const metadata = { title: "Innova Academy" };
export const dynamic = "force-dynamic";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
