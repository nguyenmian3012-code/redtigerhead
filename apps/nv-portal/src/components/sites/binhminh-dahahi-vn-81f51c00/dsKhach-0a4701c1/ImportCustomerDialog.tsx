"use client";

import { useEffect, useState } from "react";
import { Download, Save, Upload, X } from "lucide-react";

type ImportCustomerDialogProps = {
  open: boolean;
  onClose: () => void;
};

const columns = [
  "STT",
  "Mã",
  "Họ tên",
  "SĐT",
  "Giới tính",
  "CCCD/CMND",
  "Chức vụ",
  "Cơ quan",
  "Địa chỉ",
  "Hình ảnh",
];

export default function ImportCustomerDialog({
  open,
  onClose,
}: ImportCustomerDialogProps) {
  const [activeTab, setActiveTab] = useState<"customers" | "errors">(
    "customers",
  );
  const [fileName, setFileName] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!open) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open, onClose]);

  if (!open) return null;

  const downloadTemplate = () => {
    const csv =
      "Ma,Ho ten,So dien thoai,Gioi tinh,CCCD/CMND,Chuc vu,Co quan,Dia chi,Hinh anh\n";
    const url = URL.createObjectURL(
      new Blob(["\uFEFF", csv], { type: "text/csv;charset=utf-8" }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = "mau-du-lieu-khach-hang.csv";
    link.click();
    URL.revokeObjectURL(url);
    setMessage("Đã tạo file mẫu trên thiết bị của bạn");
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        aria-labelledby="import-customer-title"
        aria-modal="true"
        className="max-h-[calc(100vh-2rem)] w-[min(990px,calc(100vw-2rem))] overflow-y-auto bg-white shadow-[0_12px_30px_rgba(0,0,0,0.32)]"
        role="dialog"
      >
        <header className="flex h-[63px] items-center justify-between bg-[#2e94da] px-5 text-white">
          <h2 id="import-customer-title" className="text-xl font-normal">
            Nhập dữ liệu khách hàng
          </h2>
          <button
            aria-label="Đóng"
            autoFocus
            className="grid size-10 place-items-center transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-white"
            onClick={onClose}
            type="button"
          >
            <X aria-hidden="true" size={27} strokeWidth={2.4} />
          </button>
        </header>

        <div className="px-5 py-6 sm:px-9">
          <div className="grid gap-5 md:grid-cols-2">
            <section className="border-b border-[#a9c3cc] pb-4">
              <h3 className="mb-1 text-base font-normal text-[#464855]">
                Bước 1: Tải file mẫu và nhập thông tin
              </h3>
              <button
                className="inline-flex h-[38px] items-center gap-2 bg-[#4bac4d] px-5 text-base text-white transition-colors hover:bg-[#44a446] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4bac4d]"
                onClick={downloadTemplate}
                type="button"
              >
                <Download aria-hidden="true" size={18} />
                Tải file mẫu dữ liệu khách hàng
              </button>
            </section>

            <section className="border-b border-[#a9c3cc] pb-4">
              <h3 className="mb-1 text-base font-normal text-[#464855]">
                Bước 2: Tải dữ liệu đã nhập lên hệ thống
              </h3>
              <label className="inline-flex h-[38px] cursor-pointer items-center gap-2 bg-[#168de2] px-5 text-base text-white transition-colors hover:bg-[#117ecb] focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-[#168de2]">
                <Upload aria-hidden="true" size={18} />
                Tải lên file dữ liệu
                <input
                  accept=".csv,.xlsx,.xls"
                  className="sr-only"
                  onChange={(event) => {
                    setFileName(event.target.files?.[0]?.name ?? "");
                    setMessage("");
                  }}
                  type="file"
                />
              </label>
              {fileName && (
                <p className="mt-2 truncate text-sm text-[#646776]">
                  {fileName}
                </p>
              )}
            </section>
          </div>

          <div className="mt-7 flex border-b border-[#d5d9dc]" role="tablist">
            <button
              aria-selected={activeTab === "customers"}
              className={`border-b-2 px-6 py-3 text-sm font-medium ${
                activeTab === "customers"
                  ? "border-[#ff4d8b] text-[#596f9d]"
                  : "border-transparent text-[#888]"
              }`}
              onClick={() => setActiveTab("customers")}
              role="tab"
              type="button"
            >
              DỮ LIỆU KHÁCH HÀNG (0)
            </button>
            <button
              aria-selected={activeTab === "errors"}
              className={`border-b-2 px-6 py-3 text-sm font-medium ${
                activeTab === "errors"
                  ? "border-[#ff4d8b] text-[#596f9d]"
                  : "border-transparent text-[#888]"
              }`}
              onClick={() => setActiveTab("errors")}
              role="tab"
              type="button"
            >
              DỮ LIỆU TẢI LÊN LỖI (0)
            </button>
          </div>

          <div className="mt-8 overflow-x-auto border border-[#d8dcdf]">
            <table className="min-w-[880px] w-full border-collapse text-sm">
              <thead>
                <tr>
                  {columns.map((column) => (
                    <th
                      className="whitespace-nowrap border-r border-[#d8dcdf] px-3 py-3 text-left font-semibold text-[#52677a] last:border-r-0"
                      key={column}
                    >
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-t-2 border-[#909090]">
                  <td
                    className="h-[58px] text-center text-[#646776]"
                    colSpan={columns.length}
                  >
                    Không có dữ liệu
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p aria-live="polite" className="mt-3 min-h-5 text-sm text-[#646776]">
            {message}
          </p>

          <footer className="mt-8 flex justify-end gap-2">
            <button
              className="inline-flex h-[38px] items-center gap-2 bg-[#4bac4d] px-4 text-base text-white transition-colors hover:bg-[#44a446] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4bac4d]"
              onClick={() =>
                setMessage("Bản thử không tải dữ liệu lên máy chủ")
              }
              type="button"
            >
              <Save aria-hidden="true" size={17} />
              Lưu lại
            </button>
            <button
              className="inline-flex h-[38px] items-center gap-2 bg-[#d9534f] px-4 text-base text-white transition-colors hover:bg-[#c9302c] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d9534f]"
              onClick={onClose}
              type="button"
            >
              <X aria-hidden="true" size={17} />
              Đóng
            </button>
          </footer>
        </div>
      </section>
    </div>
  );
}
