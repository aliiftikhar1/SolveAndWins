import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from './Header'



const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SolveAndWIns",
  description: "best earning website from competition",
};

export default function UserLayout({ children }) {
  return (
    <html lang="en">
    <body className=" bg-white">
  
<Header/>
      {children}


    </body>
  </html>
  );
}
