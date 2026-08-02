"use client";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

const Tablesearch = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSearch = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const value = formData.get("search")?.toString().trim() ?? "";
    const queryParams = new URLSearchParams(searchParams.toString());

    if (value) {
      queryParams.set("search", value);
    } else {
      queryParams.delete("search");
    }

    queryParams.delete("page");
    router.push(`${pathname}?${queryParams.toString()}`);
  };

  return (
    <form
      className="w-full md:w-auto flex items-center gap-2 text-xs rounded-full ring-1 ring-gray-300 px-3 py-2"
      onSubmit={handleSearch}
    >
      <button type="submit" aria-label="Search">
        <Image src="/search.png" alt="" width={18} height={18} />
      </button>

      <input
        name="search"
        type="text"
        placeholder="Search..."
        defaultValue={searchParams.get("search") ?? ""}
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
