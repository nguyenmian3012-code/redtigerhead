"use client";

import { CirclePlus, Share, Upload } from "lucide-react";
import { useState } from "react";

import type { Customer } from "./types";

type CustomerTableProps = {
  customers: Customer[];
  onOpenImport: () => void;
  onOpenAdd: () => void;
  onExport: () => void;
};

const toolbarButton =
  "inline-flex h-[38px] items-center gap-2 bg-[#4bac4d] px-5 py-1.5 text-[16px] leading-[26px] text-white transition-colors duration-[350ms] hover:bg-[#44a446] hover:shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2e94da]";

export function CustomerTable({
  customers,
  onOpenImport,
  onOpenAdd,
  onExport,
}: CustomerTableProps) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const allSelected =
    customers.length > 0 && customers.every(({ id }) => selected.has(id));
  const someSelected = customers.some(({ id }) => selected.has(id));

  function toggleAll() {
    setSelected(allSelected ? new Set() : new Set(customers.map(({ id }) => id)));
  }

  function toggleOne(id: string) {
    setSelected((current) => {
      const next = new Set(current);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  return (
    <section className="min-w-0">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <h1 className="font-[Arial] text-[28px] leading-[38px] font-normal text-[#2c304d]">
          Danh sách khách
        </h1>

        <div className="flex flex-wrap gap-1" aria-label="Công cụ danh sách khách">
          <button type="button" className={toolbarButton} onClick={onOpenImport}>
            <Upload aria-hidden="true" size={18} strokeWidth={3} />
            Nhập từ file
          </button>
          <button type="button" className={toolbarButton} onClick={onOpenAdd}>
            <CirclePlus aria-hidden="true" size={18} fill="currentColor" strokeWidth={1.5} />
            Thêm khách hàng
          </button>
          <button type="button" className={toolbarButton} onClick={onExport}>
            <Share aria-hidden="true" size={18} strokeWidth={3} />
            Xuất file
          </button>
        </div>
      </div>

      <div className="mt-5 min-h-[300px] bg-white shadow-[0_1px_15px_rgba(62,57,107,0.07)] md:h-[calc(100vh-169px)]">
        <div className="h-full min-h-[300px] overflow-auto border border-[#dee2e6]">
          <table className="w-full min-w-[900px] border-collapse text-left text-[14px] text-[#464855]">
            <thead>
              <tr className="border-b-2 border-[#adb5bd]">
                <th className="sticky top-0 z-10 w-[66px] bg-white p-3">
                  <input
                    ref={(checkbox) => {
                      if (checkbox) checkbox.indeterminate = someSelected && !allSelected;
                    }}
                    type="checkbox"
                    checked={allSelected}
                    onChange={toggleAll}
                    aria-label="Chọn tất cả khách hàng"
                    className="size-5 accent-[#2e94da]"
                  />
                </th>
                {[
                  "Hành động",
                  "Tên khách hàng",
                  "Điện thoại",
                  "Đơn vị",
                  "Hẹn gặp",
                  "Thời gian",
                ].map((label) => (
                  <th
                    key={label}
                    scope="col"
                    className="sticky top-0 z-10 whitespace-nowrap bg-white p-3 text-[16px] font-bold text-[#52677a]"
                  >
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {customers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="bg-[#f2f2f2] px-[13.6px] py-2.5">
                    Không tìm thấy bản ghi nào
                  </td>
                </tr>
              ) : (
                customers.map((customer) => (
                  <tr key={customer.id} className="border-b border-[#dee2e6] hover:bg-[#fafafa]">
                    <td className="px-3 py-2.5">
                      <input
                        type="checkbox"
                        checked={selected.has(customer.id)}
                        onChange={() => toggleOne(customer.id)}
                        aria-label={`Chọn ${customer.name}`}
                        className="size-5 accent-[#2e94da]"
                      />
                    </td>
                    <td className="whitespace-nowrap px-3 py-2.5">
                      <button type="button" className="mr-3 text-[#2e94da] hover:underline" title="Chế độ minh họa">
                        Sửa
                      </button>
                      <button type="button" className="text-[#d9534f] hover:underline" title="Chế độ minh họa">
                        Xóa
                      </button>
                    </td>
                    <td className="px-3 py-2.5">{customer.name}</td>
                    <td className="px-3 py-2.5">{customer.phone}</td>
                    <td className="px-3 py-2.5">{customer.organization}</td>
                    <td className="px-3 py-2.5">{customer.appointment}</td>
                    <td className="whitespace-nowrap px-3 py-2.5">{customer.time}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
