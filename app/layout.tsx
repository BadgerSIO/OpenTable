import Navbar from "./components/Navbar";
import "./globals.css";
import "react-datepicker/dist/react-datepicker.css";
import { Inter } from "next/font/google";
import AuthContext from "./context/AuthContext";
const inter = Inter({ subsets: ["latin"] });
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className={inter.className}>
        <main className="bg-gray-100 min-h-screen w-screen">
          <AuthContext>
            <main className="max-w-screen-2xl m-auto bg-white">
              <Navbar />
              {children}
            </main>
          </AuthContext>
        </main>
      </body>
    </html>
  );
}
//2OtntSmiVV5tXKTl
