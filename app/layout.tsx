import Navbar from "./components/Navbar";
import "./globals.css";
import "react-datepicker/dist/react-datepicker.css";

import AuthContext from "./context/AuthContext";
import { exo2 } from "./fonts";

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
      <body className={exo2.className}>
        <main className="bg-gray-100 min-h-screen ">
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
