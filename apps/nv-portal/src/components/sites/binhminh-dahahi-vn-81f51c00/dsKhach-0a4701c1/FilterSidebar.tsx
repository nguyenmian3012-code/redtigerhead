"use client";

import { ChevronUp, Search } from "lucide-react";

import type { FaceFilter } from "./types";

type FilterSidebarProps = {
  query: string;
  onQueryChange: (value: string) => void;
  faceFilter: FaceFilter;
  onFaceFilterChange: (value: FaceFilter) => void;
};

const faceOptions: { value: FaceFilter; label: string }[] = [
  { value: "all", label: "Tất cả" },
  { value: "registered", label: "Đã đăng ký" },
  { value: "unregistered", label: "Chưa đăng ký" },
];

export function FilterSidebar({
  query,
  onQueryChange,
  faceFilter,
  onFaceFilterChange,
}: FilterSidebarProps) {
  return (
    <aside className="w-full shrink-0 px-[15px] py-2 md:min-h-[calc(100dvh-46px)] md:w-1/6 md:py-[15px]">
      <div className="h-full bg-white shadow-[0_1px_15px_1px_rgba(62,57,107,.07)]">
        <h2 className="flex h-[38px] items-center bg-[#2e94da] px-[15px] py-[7px] text-base font-medium text-white">
          Tìm kiếm
        </h2>

        <div className="px-[15px] py-[10px]">
          <div className="relative">
            <input
              type="search"
              value={query}
              onChange={(event) => onQueryChange(event.currentTarget.value)}
              placeholder="Nhập nội dung tìm kiếm"
              aria-label="Tìm kiếm khách hàng"
              className="block h-[37px] w-full rounded-none border border-[#dedede] bg-white px-3 pr-8 text-base text-[#464855] placeholder:text-[#888] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2e94da]"
            />
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute right-2 top-1/2 size-4 -translate-y-1/2 text-[#2e94da]"
            />
          </div>
        </div>

        <fieldset className="m-0 w-full border-0 p-0">
          <legend className="flex h-[38px] w-full items-center justify-between bg-[#2e94da] px-[15px] py-[7px] text-base font-medium text-white">
            <span>Đăng ký Face</span>
            <span
              aria-hidden="true"
              className="flex size-[18px] items-center justify-center rounded-full bg-white text-[#2e94da]"
            >
              <ChevronUp className="size-3.5" strokeWidth={3} />
            </span>
          </legend>

          <div className="px-[15px] py-[10px]">
            {faceOptions.map((option) => (
              <label
                key={option.value}
                className="mb-2 flex min-h-[26px] cursor-pointer items-center gap-2.5 text-base last:mb-0"
              >
                <input
                  type="radio"
                  name="face-registration-filter"
                  value={option.value}
                  checked={faceFilter === option.value}
                  onChange={() => onFaceFilterChange(option.value)}
                  className="size-5 shrink-0 accent-[#677bd1] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2e94da]"
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        </fieldset>
      </div>
    </aside>
  );
}
