import { Inter } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SolveAndWins",
  description: "Best website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <body className=" bg-white">

      {children}


    </body>
  </html>
  );
}
