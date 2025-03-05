import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: LayoutProps) => {
  return (
    <div className="flex h-screen">
      <div className="fixed top-0 left-0 h-screen w-48 bg-blue-950">
        <Sidebar />
      </div>

      <div className="flex-1 ml-48 flex flex-col">
        <div className="fixed top-0 left-0 w-full bg-gray-800 ml-48 z-10">
          <Navbar />
        </div>

        <main className="flex-1 p-6 bg-gray-100 mt-16 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
