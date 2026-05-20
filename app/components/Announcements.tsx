import Image from "next/image";
import React from "react";

const Announcements = () => {
  return (
    <div className="bg-white p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Announcements</h2>

        <Image src="/moreDark.png" alt="More" width={20} height={20} />
      </div>
      <div className="flex flex-col gap-4">
        <div className="bg-lamaSkyLight rounded-md p-4">
          <div className="flex items-center justify-between">
            <h2 className="font-medium">Lorem ipsum dolor sit</h2>

            <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">
              2025-01-01
            </span>
          </div>

          <p className=" text-gray-400 text-sm mt-1">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum,
            expedita. Rerum, quidem facilis?
          </p>
        </div>

        <div className="bg-lamaPurpleLight rounded-md p-4">
          <div className="flex items-center justify-between">
            <h2 className="font-medium">Lorem ipsum dolor sit</h2>

            <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">
              2025-01-01
            </span>
          </div>

          <p className=" text-gray-400 text-sm mt-1">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum,
            expedita. Rerum, quidem facilis?
          </p>
        </div>

        <div className="bg-lamaYellowLight rounded-md p-4">
          <div className="flex items-center justify-between">
            <h2 className="font-medium">Lorem ipsum dolor sit</h2>

            <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">
              2025-01-01
            </span>
          </div>

          <p className=" text-gray-400 text-sm mt-1">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum,
            expedita. Rerum, quidem facilis?
          </p>
        </div>
      </div>
    </div>
  );
};

export default Announcements;
