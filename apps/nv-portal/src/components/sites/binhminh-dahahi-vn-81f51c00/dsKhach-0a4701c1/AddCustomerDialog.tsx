"use client";

import { FormEvent, useEffect, useState } from "react";

import type { CustomerDraft } from "./types";

type AddCustomerDialogProps = {
  open: boolean;
  nextCode: string;
  onClose: () => void;
  onSubmit: (draft: CustomerDraft) => void;
};

type FormState = {
  code: string;
  name: string;
  gender: "" | "Nam" | "Nữ";
  address: string;
  phone: string;
  email: string;
  appointment: string;
  hasAppointment: boolean;
  faceRegistered: boolean;
  organization: string;
  identityNumber: string;
  department: string;
};

const initialForm = (nextCode: string): FormState => ({
  code: nextCode,
  name: "",
  gender: "",
  address: "",
  phone: "",
  email: "",
  appointment: "",
  hasAppointment: false,
  faceRegistered: false,
  organization: "",
  identityNumber: "",
  department: "",
});

const fieldClass =
  "min-h-9 w-full border-0 border-b border-[#dddddd] bg-transparent px-1 py-1 text-[#464855] outline-none transition-colors focus:border-[#2e94da]";

const rowClass =
  "grid grid-cols-[120px_minmax(0,1fr)] items-start gap-3 max-sm:grid-cols-1 max-sm:gap-1";

export function AddCustomerDialog({
  open,
  nextCode,
  onClose,
  onSubmit,
}: AddCustomerDialogProps) {
  const [form, setForm] = useState<FormState>(() => initialForm(nextCode));
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!open) return;
    setForm(initialForm(nextCode));
    setSubmitted(false);
  }, [nextCode, open]);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [onClose, open]);

  if (!open) return null;

  const setField = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((current) => ({ ...current, [key]: value }));

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);

    const name = form.name.trim();
    if (!name) return;

    onSubmit({
      code: form.code.trim(),
      name,
      phone: form.phone.trim(),
      organization: form.organization.trim(),
      appointment: form.hasAppointment ? form.appointment.trim() : "",
      faceRegistered: form.faceRegistered,
      gender: form.gender || undefined,
      address: form.address.trim() || undefined,
      email: form.email.trim() || undefined,
      department: form.department.trim() || undefined,
      identityNumber: form.identityNumber.trim() || undefined,
    });
    setForm(initialForm(nextCode));
    setSubmitted(false);
  };

  const nameInvalid = submitted && !form.name.trim();

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-3"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        aria-labelledby="add-customer-title"
        aria-modal="true"
        className="flex max-h-[90vh] w-[876px] max-w-[80vw] flex-col overflow-hidden bg-white shadow-[0_8px_24px_rgba(0,0,0,0.35)] max-md:max-w-[calc(100vw-24px)]"
        role="dialog"
      >
        <header className="flex min-h-14 shrink-0 items-center justify-between bg-[#2e94da] px-4 text-white">
          <h2 id="add-customer-title" className="text-xl font-normal max-md:text-lg">
            Thêm khách hàng
          </h2>
          <button
            aria-label="Đóng"
            className="h-10 w-10 text-3xl leading-none hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
            onClick={onClose}
            type="button"
          >
            ×
          </button>
        </header>

        <form className="flex min-h-0 flex-1 flex-col" noValidate onSubmit={handleSubmit}>
          <div className="grid min-h-0 flex-1 grid-cols-2 gap-x-7 gap-y-5 overflow-y-auto px-9 py-7 max-md:grid-cols-1 max-md:px-3 max-md:py-4">
            <div className="space-y-5">
              <label className={rowClass} htmlFor="customer-code">
                <span>Mã khách hàng</span>
                <input
                  className={`${fieldClass} cursor-default bg-[#fafafa]`}
                  id="customer-code"
                  readOnly
                  value={form.code}
                />
              </label>

              <label className={rowClass} htmlFor="customer-name">
                <span>
                  Tên khách hàng <span className="text-red-600">(*)</span>
                </span>
                <span>
                  <input
                    aria-describedby={nameInvalid ? "customer-name-error" : undefined}
                    aria-invalid={nameInvalid}
                    autoFocus
                    className={`${fieldClass} ${nameInvalid ? "border-red-600" : ""}`}
                    id="customer-name"
                    onChange={(event) => setField("name", event.target.value)}
                    value={form.name}
                  />
                  {nameInvalid && (
                    <span className="mt-1 block text-sm text-red-600" id="customer-name-error">
                      Vui lòng nhập tên khách hàng.
                    </span>
                  )}
                </span>
              </label>

              <fieldset className={rowClass}>
                <legend>Giới tính</legend>
                <span className="flex min-h-9 items-center gap-5">
                  {(["Nam", "Nữ"] as const).map((gender) => (
                    <label className="flex cursor-pointer items-center gap-2" key={gender}>
                      <input
                        checked={form.gender === gender}
                        name="customer-gender"
                        onChange={() => setField("gender", gender)}
                        type="radio"
                      />
                      {gender}
                    </label>
                  ))}
                </span>
              </fieldset>

              <label className={rowClass} htmlFor="customer-address">
                <span>Địa chỉ</span>
                <input
                  className={fieldClass}
                  id="customer-address"
                  onChange={(event) => setField("address", event.target.value)}
                  value={form.address}
                />
              </label>

              <label className={rowClass} htmlFor="customer-phone">
                <span>Số điện thoại</span>
                <input
                  className={fieldClass}
                  id="customer-phone"
                  inputMode="tel"
                  onChange={(event) => setField("phone", event.target.value)}
                  type="tel"
                  value={form.phone}
                />
              </label>

              <label className={rowClass} htmlFor="customer-email">
                <span>Email</span>
                <input
                  className={fieldClass}
                  id="customer-email"
                  onChange={(event) => setField("email", event.target.value)}
                  type="email"
                  value={form.email}
                />
              </label>

              <label className={rowClass} htmlFor="customer-appointment">
                <span>Hẹn gặp ai</span>
                <input
                  className={fieldClass}
                  disabled={!form.hasAppointment}
                  id="customer-appointment"
                  onChange={(event) => setField("appointment", event.target.value)}
                  value={form.appointment}
                />
              </label>

              <label className={rowClass} htmlFor="customer-has-appointment">
                <span>Có lịch hẹn?</span>
                <span className="flex min-h-9 items-center">
                  <input
                    checked={form.hasAppointment}
                    id="customer-has-appointment"
                    onChange={(event) => setField("hasAppointment", event.target.checked)}
                    type="checkbox"
                  />
                </span>
              </label>

              <label className={rowClass} htmlFor="customer-timeface">
                <span>Đăng ký TimeFace</span>
                <span className="flex min-h-9 items-center">
                  <input
                    checked={form.faceRegistered}
                    id="customer-timeface"
                    onChange={(event) => setField("faceRegistered", event.target.checked)}
                    type="checkbox"
                  />
                </span>
              </label>
            </div>

            <div className="space-y-5">
              <div className={rowClass}>
                <span>Ảnh đại diện</span>
                <div>
                  <div className="flex h-32 w-36 flex-col items-center justify-end overflow-hidden bg-[#f4f4f4]" aria-hidden="true">
                    <span className="h-14 w-14 rounded-full bg-[#bdbdbd]" />
                    <span className="-mb-5 h-16 w-28 rounded-[50%] bg-[#bdbdbd]" />
                  </div>
                  <button
                    className="mt-1 min-h-9 bg-[#555555] px-3 text-sm text-white opacity-65"
                    disabled
                    type="button"
                  >
                    Tải ảnh đại diện
                  </button>
                  <p className="mt-1 text-sm text-[#737373]">Chưa hỗ trợ trong bản thử</p>
                </div>
              </div>

              <label className={rowClass} htmlFor="customer-organization">
                <span>Cơ quan/đơn vị</span>
                <select
                  className={fieldClass}
                  id="customer-organization"
                  onChange={(event) => setField("organization", event.target.value)}
                  value={form.organization}
                >
                  <option value="">Chọn đơn vị</option>
                  <option value="Bình Minh (dữ liệu thử)">Bình Minh (dữ liệu thử)</option>
                </select>
              </label>

              <label className={rowClass} htmlFor="customer-identity">
                <span>CMND/HC</span>
                <input
                  className={fieldClass}
                  id="customer-identity"
                  onChange={(event) => setField("identityNumber", event.target.value)}
                  value={form.identityNumber}
                />
              </label>

              <label className={rowClass} htmlFor="customer-department">
                <span>Phòng ban</span>
                <input
                  className={fieldClass}
                  id="customer-department"
                  onChange={(event) => setField("department", event.target.value)}
                  value={form.department}
                />
              </label>
            </div>
          </div>

          <footer className="flex shrink-0 justify-end gap-2 border-t border-[#eeeeee] bg-white px-4 py-3">
            <button
              className="min-h-10 bg-[#4bac4d] px-5 text-white hover:bg-[#44a446] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2e94da]"
              type="submit"
            >
              Tạo mới
            </button>
            <button
              className="min-h-10 bg-[#ef3e4a] px-5 text-white hover:bg-[#dc3545] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2e94da]"
              onClick={onClose}
              type="button"
            >
              Đóng
            </button>
          </footer>
        </form>
      </section>
    </div>
  );
}
