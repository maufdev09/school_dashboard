"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const Tablesearch = () => {
  const router = useRouter();
  const handleSearch = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const value = (e.currentTarget.elements[0] as HTMLInputElement).value;
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set("search", value);
    router.push(`${window.location.pathname}?${queryParams}`);
  };

  return (
    <form
      className="w-full md:w-auto flex items-center gap-2 text-xs rounded-full ring-1 ring-gray-300 px-3 py-2"
      onSubmit={handleSearch}
    >
      <Image src="/search.png" alt="Search" width={18} height={18} />

      <input
        type="text"
        placeholder="Search..."
        className="
              w-full
              md:w-[220px]
              bg-transparent
              outline-none
              text-sm
            "
      />
    </form>
  );
};

export default Tablesearch;
