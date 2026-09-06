"use client";

import { useEffect, useState } from "react";
import {
  BarChart3,
  Briefcase,
  ChevronDown,
  Clock3,
  Contact,
  CreditCard,
  MapPin,
  Menu,
  Settings,
  ShieldCheck,
  Smartphone,
  UserRound,
  Users,
  X,
  type LucideIcon,
} from "lucide-react";

type NavigationItem = {
  label: string;
  icon: LucideIcon;
  children?: readonly string[];
};

const navigationItems: readonly NavigationItem[] = [
  { label: "Khách hàng", icon: UserRound },
  { label: "Nhân viên", icon: Users },
  { label: "Tài khoản", icon: CreditCard },
  { label: "Thiết bị", icon: Smartphone },
  { label: "Lịch sử checkin", icon: MapPin },
  { label: "Nhân viên thời vụ", icon: Briefcase },
  {
    label: "Quản lý Nhân viên",
    icon: Contact,
    children: [
      "Danh sách nhân viên",
      "Quản lý cơ sở, đơn vị",
      "Quản lý chức danh",
      "Quản lý ca làm việc",
      "Danh sách vai trò",
      "Phân quyền vai trò",
      "Quản lý nhóm nhân viên",
      "Quản lý phòng/ban",
      "Đơn công tác",
      "Đối tác",
      "Quản lý nghỉ phép",
      "Quản lý đổi ca",
      "Quản lý thẻ",
      "Quản lý yêu cầu cho đi muộn, về sớm",
    ],
  },
  { label: "Chấm công", icon: Clock3 },
  {
    label: "Quản trị hệ thống",
    icon: ShieldCheck,
    children: ["Quản lý đăng ký faceid", "Quản lý tài khoản"],
  },
  {
    label: "Cài đặt",
    icon: Settings,
    children: [
      "Tích hợp API",
      "Quản lý vai trò",
      "Phân quyền vai trò",
      "Danh mục phòng ban",
      "Thông tin đơn vị",
      "Vị trí đặt thiết bị",
      "Quản lý nhóm thông báo",
      "Quản lý thông báo",
      "Quản lý yêu cầu cập nhật công",
      "Loại nghỉ phép",
      "Quản lý ứng lương",
    ],
  },
  { label: "Báo cáo", icon: BarChart3 },
];

const preventNavigation = (event: React.MouseEvent<HTMLAnchorElement>) => {
  event.preventDefault();
};

export function TopNavigation() {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  return (
    <header className="relative z-50 min-h-[46px] w-full bg-[#2e94da] text-white">
      <div className="flex min-h-[46px] w-full items-stretch overflow-hidden">
        <a
          href="#"
          aria-label="Trang chủ Bình Minh"
          onClick={preventNavigation}
          className="flex h-[46px] shrink-0 items-center px-[12px] min-[992px]:pl-[17px] min-[992px]:pr-[8px]"
        >
          <img
            src="/sites/binhminh-dahahi-vn-81f51c00/dsKhach-0a4701c1/binh-minh-logo.webp"
            alt="Bình Minh"
            width={34}
            height={34}
            className="h-[34px] w-[34px] bg-white object-contain"
          />
        </a>

        <nav
          aria-label="Điều hướng chính"
          className="hidden min-w-0 flex-1 items-stretch min-[992px]:flex"
        >
          {navigationItems.map((item, index) => {
            const Icon = item.icon;
            const active = index === 0;

            return (
              <div
                key={item.label}
                className="group relative flex min-w-0 shrink items-stretch"
              >
                <a
                  href="#"
                  onClick={preventNavigation}
                  aria-current={active ? "page" : undefined}
                  className={`flex min-w-0 items-center gap-[3px] whitespace-nowrap px-[4px] text-[14px] leading-[46px] transition-colors duration-[350ms] hover:bg-[#2782c0] focus-visible:bg-[#2782c0] min-[1400px]:px-[7px] ${
                    active ? "bg-[#2782c0]" : ""
                  }`}
                >
                  <Icon aria-hidden="true" className="h-[14px] w-[14px] shrink-0" />
                  <span className="overflow-hidden text-ellipsis">{item.label}</span>
                  {item.children && (
                    <ChevronDown aria-hidden="true" className="h-[12px] w-[12px] shrink-0" />
                  )}
                </a>

                {item.children && (
                  <div className="absolute left-0 top-full hidden max-h-[calc(100vh-46px)] min-w-[230px] overflow-y-auto bg-white py-[4px] text-[#464855] shadow-[0_4px_12px_rgba(0,0,0,0.18)] group-hover:block group-focus-within:block">
                    {item.children.map((child) => (
                      <a
                        key={child}
                        href="#"
                        onClick={preventNavigation}
                        className="block whitespace-nowrap px-[14px] py-[8px] text-[14px] leading-[20px] transition-colors duration-[350ms] hover:bg-[#f2f2f2] focus-visible:bg-[#f2f2f2]"
                      >
                        {child}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div
          title="Cty TNHH SX Tinh Bột Khoai Mì Bình Minh"
          className="flex min-w-0 flex-1 items-center truncate pr-[6px] text-[14px] min-[992px]:max-w-[120px] min-[992px]:shrink min-[992px]:pl-[6px] min-[1280px]:max-w-[225px]"
        >
          Cty TNHH SX Tinh Bột Khoai Mì Bình Minh
        </div>

        <button
          type="button"
          aria-label={mobileOpen ? "Đóng menu" : "Mở menu"}
          aria-controls="bm-mobile-navigation"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((open) => !open)}
          className="flex h-[46px] w-[46px] shrink-0 items-center justify-center transition-colors duration-[350ms] hover:bg-[#2782c0] focus-visible:bg-[#2782c0] min-[992px]:hidden"
        >
          {mobileOpen ? <X aria-hidden="true" size={22} /> : <Menu aria-hidden="true" size={22} />}
        </button>
      </div>

      <nav
        id="bm-mobile-navigation"
        aria-label="Điều hướng di động"
        hidden={!mobileOpen}
        className="absolute left-0 top-[46px] max-h-[calc(100vh-46px)] w-full overflow-y-auto bg-[#2e94da] shadow-[0_6px_14px_rgba(0,0,0,0.22)] min-[992px]:hidden"
      >
        {navigationItems.map((item, index) => {
          const Icon = item.icon;
          const active = index === 0;

          if (item.children) {
            return (
              <details key={item.label} className="group/mobile border-t border-white/15">
                <summary className="flex cursor-pointer list-none items-center gap-[8px] px-[16px] py-[11px] text-[14px] hover:bg-[#2782c0] [&::-webkit-details-marker]:hidden">
                  <Icon aria-hidden="true" className="h-[15px] w-[15px]" />
                  <span className="flex-1">{item.label}</span>
                  <ChevronDown
                    aria-hidden="true"
                    className="h-[14px] w-[14px] transition-transform group-open/mobile:rotate-180"
                  />
                </summary>
                <div className="bg-[#2782c0] py-[3px]">
                  {item.children.map((child) => (
                    <a
                      key={child}
                      href="#"
                      onClick={preventNavigation}
                      className="block px-[39px] py-[8px] text-[14px] hover:bg-white/10 focus-visible:bg-white/10"
                    >
                      {child}
                    </a>
                  ))}
                </div>
              </details>
            );
          }

          return (
            <a
              key={item.label}
              href="#"
              onClick={preventNavigation}
              aria-current={active ? "page" : undefined}
              className={`flex items-center gap-[8px] border-t border-white/15 px-[16px] py-[11px] text-[14px] hover:bg-[#2782c0] focus-visible:bg-[#2782c0] ${
                active ? "bg-[#2782c0]" : ""
              }`}
            >
              <Icon aria-hidden="true" className="h-[15px] w-[15px]" />
              {item.label}
            </a>
          );
        })}
      </nav>
    </header>
  );
}

export default TopNavigation;
