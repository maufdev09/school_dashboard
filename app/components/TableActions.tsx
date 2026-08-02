"use client";

import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import Tablesearch from "./Tablesearch";

export type FilterOption = {
  label: string;
  value: string;
};

export type TableFilter = {
  label: string;
  param: string;
  options: FilterOption[];
};

const TableActions = ({ filters = [] }: { filters?: TableFilter[] }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<Record<string, string>>(() =>
    Object.fromEntries(filters.map((filter) => [filter.param, ""])),
  );

  const activeFilters = useMemo(
    () => filters.filter((filter) => searchParams.get(filter.param)),
    [filters, searchParams],
  );

  const updateQuery = (updates: Record<string, string | null>) => {
    const queryParams = new URLSearchParams(searchParams.toString());

    for (const [key, value] of Object.entries(updates)) {
      if (value) {
        queryParams.set(key, value);
      } else {
        queryParams.delete(key);
      }
    }

    queryParams.delete("page");
    router.push(`${pathname}?${queryParams.toString()}`);
  };

  const applyFilters = () => {
    updateQuery(draft);
    setOpen(false);
  };

  const clearFilters = () => {
    const cleared = Object.fromEntries(
      filters.map((filter) => [filter.param, null]),
    );
    setDraft(Object.fromEntries(filters.map((filter) => [filter.param, ""])));
    updateQuery(cleared);
    setOpen(false);
  };

  const toggleSort = () => {
    updateQuery({ sort: searchParams.get("sort") === "asc" ? "desc" : "asc" });
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
      <Tablesearch />
      <div className="flex items-center gap-4 self-end">
        <div className="relative">
          <button
            type="button"
            aria-label="Filter"
            onClick={() => setOpen((value) => !value)}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow relative"
          >
            <Image src="/filter.png" alt="" width={14} height={14} />
            {activeFilters.length > 0 && (
              <span className="absolute -right-1 -top-1 h-4 min-w-4 rounded-full bg-red-500 px-1 text-[10px] text-white">
                {activeFilters.length}
              </span>
            )}
          </button>

          {open && (
            <div className="absolute right-0 top-10 z-20 w-64 rounded-md border border-gray-100 bg-white p-3 shadow-lg">
              {filters.length > 0 ? (
                <div className="flex flex-col gap-3">
                  {filters.map((filter) => (
                    <label
                      key={filter.param}
                      className="flex flex-col gap-1 text-xs text-gray-500"
                    >
                      {filter.label}
                      <select
                        className="rounded-md border border-gray-200 p-2 text-sm text-gray-700 outline-none"
                        value={
                          draft[filter.param] ??
                          searchParams.get(filter.param) ??
                          ""
                        }
                        onChange={(event) =>
                          setDraft((current) => ({
                            ...current,
                            [filter.param]: event.target.value,
                          }))
                        }
                      >
                        <option value="">All</option>
                        {filter.options.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </label>
                  ))}
                  <div className="flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={clearFilters}
                      className="rounded-md bg-slate-100 px-3 py-2 text-xs font-semibold text-gray-600"
                    >
                      Clear
                    </button>
                    <button
                      type="button"
                      onClick={applyFilters}
                      className="rounded-md bg-lamaSky px-3 py-2 text-xs font-semibold"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-gray-500">No filters for this list.</p>
              )}
            </div>
          )}
        </div>

        <button
          type="button"
          aria-label="Sort"
          onClick={toggleSort}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow"
        >
          <Image src="/sort.png" alt="" width={14} height={14} />
        </button>
      </div>
    </div>
  );
};

export default TableActions;
