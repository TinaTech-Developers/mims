import React from "react";
import MainLayout from "../components/MainLayout";
import Image from "next/image";
import { FaListUl } from "react-icons/fa";
import { IoDocumentTextSharp, IoPeopleSharp } from "react-icons/io5";

function HomePage() {
  return (
    <MainLayout>
      <hr className="w-[100%] bg-blue-600 mb-2 h-1" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Total Categories */}
        <div className="flex flex-col md:flex-row items-center justify-between w-full h-auto bg-white p-2">
          <div className="flex items-center justify-center h-[70px] w-[70px] m-[5px] bg-blue-500">
            <FaListUl size={36} color="white" />
          </div>

          <h1 className="text-gray-600 text-center">Total Categories</h1>
          <h1 className="text-gray-600 mt-2 text-center md:mt-0 font-semibold mx-5 ml-0 md:ml-4">
            4
          </h1>
        </div>

        {/* Active Policies */}
        <div className="flex flex-col md:flex-row items-center justify-between w-full h-auto bg-white p-2">
          <div className="flex items-center justify-center h-[70px] w-[70px] m-[5px] bg-green-500">
            <IoDocumentTextSharp size={36} color="white" />
          </div>

          <h1 className="text-gray-600">Active Policies</h1>
          <h1 className="text-gray-600 mt-2 md:mt-0 font-semibold mx-5 ml-0 md:ml-4">
            78
          </h1>
        </div>

        {/* Inactive Policies */}
        <div className="flex flex-col md:flex-row items-center justify-between w-full h-auto bg-white p-2">
          <div className="flex items-center justify-center h-[70px] w-[70px] m-[5px] bg-red-500">
            <IoDocumentTextSharp size={36} color="white" />
          </div>

          <h1 className="text-gray-600">Inactive Policies</h1>
          <h1 className="text-gray-600 mt-2 md:mt-0 font-semibold ml-0 md:ml-4 mx-5">
            78
          </h1>
        </div>

        {/* Insured Vehicles */}
        <div className="flex flex-col md:flex-row items-center justify-between w-full h-auto bg-white p-2">
          <div className="flex items-center justify-center h-[70px] w-[70px] m-[5px] bg-green-400">
            <IoDocumentTextSharp size={36} color="white" />
          </div>

          <h1 className="text-gray-600">Insured Vehicles</h1>
          <h1 className="text-gray-600 mt-2 md:mt-0 font-semibold mx-5 ml-0 md:ml-4">
            156
          </h1>
        </div>

        {/* Clients */}
        <div className="flex flex-col md:flex-row items-center justify-between w-full h-auto bg-white p-2">
          <div className="flex items-center justify-center h-[70px] w-[70px] m-[5px] bg-green-800">
            <IoPeopleSharp size={36} color="white" />
          </div>

          <h1 className="text-gray-600">Clients</h1>
          <h1 className="text-gray-600 mt-2 md:mt-0 font-semibold mx-5 ml-0 md:ml-4">
            156
          </h1>
        </div>
      </div>

      {/* Image with Next.js optimization */}
      <div className="mt-6 mb-6">
        <Image
          className="w-full h-96 object-cover"
          src="/vehicle.jpg" // Ensure the image is in the public directory
          alt="Insured Vehicles"
          width={1200} // Define width of the image
          height={800} // Define height of the image
          quality={100} // Set image quality to 100 for better quality
        />
      </div>
    </MainLayout>
  );
}

export default HomePage;
