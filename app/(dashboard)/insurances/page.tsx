import React from "react";
import MainLayout from "../components/MainLayout";
import InsuranceTable from "./components/InsuranceTable";

function Insurance() {
  return (
    <MainLayout>
      <div className="w-full h-full bg-white text-black">
        <InsuranceTable />
      </div>
    </MainLayout>
  );
}

export default Insurance;
