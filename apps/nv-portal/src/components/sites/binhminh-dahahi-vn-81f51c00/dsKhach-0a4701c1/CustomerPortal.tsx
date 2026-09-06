"use client";

import { useMemo, useState } from "react";
import {
  Activity,
  Bell,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  CircleAlert,
  Clock3,
  Database,
  Download,
  FileBarChart,
  Fingerprint,
  LayoutDashboard,
  Menu,
  MonitorSmartphone,
  RefreshCw,
  Search,
  Settings2,
  ShieldCheck,
  UserPlus,
  Users,
  WifiOff,
  X,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type View =
  | "overview"
  | "people"
  | "attendance"
  | "devices"
  | "reports"
  | "system";

type AttendanceTab = "today" | "exceptions" | "timesheet" | "shifts" | "events";

type PersonDraft = {
  id: string;
  code: string;
  name: string;
  department: string;
  position: string;
  employmentType: string;
};

const emptyPersonDraft: PersonDraft = {
  id: "",
  code: "",
  name: "",
  department: "",
  position: "",
  employmentType: "Chính thức",
};

const navItems = [
  { id: "overview" as const, label: "Tổng quan", icon: LayoutDashboard },
  { id: "people" as const, label: "Nhân sự", icon: Users },
  { id: "attendance" as const, label: "Chấm công", icon: Clock3 },
  { id: "devices" as const, label: "Thiết bị", icon: MonitorSmartphone },
  { id: "reports" as const, label: "Báo cáo", icon: FileBarChart },
  { id: "system" as const, label: "Hệ thống", icon: Settings2 },
];

const viewTitles: Record<View, { title: string; description: string }> = {
  overview: {
    title: "Tổng quan vận hành",
    description: "Tình trạng chấm công và kết nối thiết bị trong hôm nay.",
  },
  people: {
    title: "Nhân sự",
    description: "Một hồ sơ thống nhất cho nhân viên, công việc và phương thức nhận diện.",
  },
  attendance: {
    title: "Chấm công",
    description: "Theo dõi vào/ra, phát hiện bất thường và duyệt bảng công.",
  },
  devices: {
    title: "Thiết bị",
    description: "Tình trạng Terminal và BM Device Bridge tại nhà máy.",
  },
  reports: {
    title: "Báo cáo",
    description: "Tổng hợp bảng công, ngoại lệ và sức khỏe thiết bị.",
  },
  system: {
    title: "Hệ thống",
    description: "Tài khoản quản trị, phân quyền, tích hợp và nhật ký kiểm toán.",
  },
};

function StatusPill({
  tone,
  children,
}: {
  tone: "ok" | "warning" | "neutral" | "danger";
  children: React.ReactNode;
}) {
  const styles = {
    ok: "border-emerald-200 bg-emerald-50 text-emerald-700",
    warning: "border-amber-200 bg-amber-50 text-amber-700",
    neutral: "border-slate-200 bg-slate-50 text-slate-600",
    danger: "border-red-200 bg-red-50 text-red-700",
  };
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[13px] font-semibold ${styles[tone]}`}>
      {children}
    </span>
  );
}

function MetricCard({
  label,
  value,
  note,
  icon: Icon,
  tone = "wine",
}: {
  label: string;
  value: string;
  note: string;
  icon: typeof Activity;
  tone?: "wine" | "blue" | "amber" | "green";
}) {
  const tones = {
    wine: "bg-[#fff0f3] text-[#981b37]",
    blue: "bg-sky-50 text-sky-700",
    amber: "bg-amber-50 text-amber-700",
    green: "bg-emerald-50 text-emerald-700",
  };
  return (
    <article className="rounded-2xl border border-[#e7dfe1] bg-white p-5 shadow-[0_1px_2px_rgba(55,34,39,0.04)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="m-0 text-sm font-semibold text-slate-500">{label}</p>
          <p className="mb-1 mt-3 text-3xl font-bold tracking-tight text-slate-900">{value}</p>
          <p className="m-0 text-sm text-slate-500">{note}</p>
        </div>
        <span className={`grid size-11 shrink-0 place-items-center rounded-xl ${tones[tone]}`}>
          <Icon size={21} aria-hidden="true" />
        </span>
      </div>
    </article>
  );
}

function SectionCard({
  title,
  action,
  children,
  className = "",
}: {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`rounded-2xl border border-[#e7dfe1] bg-white shadow-[0_1px_2px_rgba(55,34,39,0.04)] ${className}`}>
      <div className="flex min-h-16 items-center justify-between gap-3 border-b border-[#eee7e8] px-5 py-3">
        <h2 className="m-0 text-lg font-bold text-slate-900">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}

function OverviewView() {
  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Terminal hoạt động" value="0/1" note="Chờ kết nối thử nghiệm" icon={MonitorSmartphone} />
        <MetricCard label="Sự kiện hôm nay" value="0" note="Chưa nhận dữ liệu" icon={Activity} tone="blue" />
        <MetricCard label="Đang có mặt" value="0" note="Chưa có lượt vào" icon={Users} tone="green" />
        <MetricCard label="Cần xử lý" value="0" note="Không có bất thường" icon={CircleAlert} tone="amber" />
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.35fr_1fr]">
        <SectionCard
          title="Tình trạng kết nối"
          action={<StatusPill tone="neutral">Chưa nhận dữ liệu thật</StatusPill>}
        >
          <div className="divide-y divide-[#eee7e8] px-5">
            {[
              ["BM Face Terminal", "1605063 · LAN 192.168.1.227 đã xác minh", "Chờ bật HTTP"],
              ["BM Device Bridge", "Gói Shadow v0.1.0 · lưu SQLite tại MINHCOMP", "Chờ cài đặt"],
              ["BMA Workforce Core", "Nguồn dữ liệu nhân sự và chấm công", "Chờ tích hợp"],
            ].map(([name, detail, state]) => (
              <div key={name} className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-slate-100 text-slate-500">
                    <WifiOff size={18} aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <p className="m-0 font-bold text-slate-800">{name}</p>
                    <p className="m-0 mt-0.5 text-sm text-slate-500">{detail}</p>
                  </div>
                </div>
                <StatusPill tone="neutral">{state}</StatusPill>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Việc cần làm">
          <div className="space-y-3 p-5">
            {[
              ["01", "Cài và test listener trên MINHCOMP"],
              ["02", "Bật HTTP Subscription song song với MQTT"],
              ["03", "Đối soát 3–7 ngày trước khi tắt Dahahi"],
            ].map(([step, item]) => (
              <div key={step} className="flex gap-3 rounded-xl border border-[#eee7e8] bg-[#fcfbfb] p-3.5">
                <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-[#981b37] text-sm font-bold text-white">{step}</span>
                <p className="m-0 self-center text-[15px] font-semibold leading-5 text-slate-700">{item}</p>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Sự kiện gần nhất" action={<button className="text-sm font-semibold text-[#981b37] hover:underline">Xem toàn bộ</button>}>
        <div className="grid min-h-44 place-items-center px-5 py-8 text-center">
          <div>
            <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-slate-100 text-slate-500"><Activity size={22} /></span>
            <p className="mb-1 mt-3 font-bold text-slate-800">Chưa có sự kiện vào/ra</p>
            <p className="m-0 text-sm text-slate-500">Dữ liệu sẽ xuất hiện sau khi BM Device Bridge kết nối an toàn.</p>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}

function PeopleView() {
  const [people, setPeople] = useState<PersonDraft[]>([]);
  const [query, setQuery] = useState("");
  const [createOpen, setCreateOpen] = useState(false);
  const [enrollmentOpen, setEnrollmentOpen] = useState(false);
  const [enrollmentStep, setEnrollmentStep] = useState(1);
  const [selectedPerson, setSelectedPerson] = useState<PersonDraft | null>(null);
  const [draft, setDraft] = useState<PersonDraft>(emptyPersonDraft);

  const visiblePeople = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase("vi");
    if (!needle) return people;
    return people.filter((person) =>
      [person.code, person.name, person.department, person.position]
        .join(" ")
        .toLocaleLowerCase("vi")
        .includes(needle),
    );
  }, [people, query]);

  const formReady = Boolean(
    draft.code.trim() &&
      draft.name.trim() &&
      draft.department.trim() &&
      draft.position.trim(),
  );

  function updateDraft(field: keyof PersonDraft, value: string) {
    setDraft((current) => ({ ...current, [field]: value }));
  }

  function saveDraft(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!formReady) return;
    const person = { ...draft, id: String(Date.now()) };
    setPeople((current) => [...current, person]);
    setDraft(emptyPersonDraft);
    setCreateOpen(false);
  }

  function startEnrollment(person: PersonDraft) {
    setSelectedPerson(person);
    setEnrollmentStep(1);
    setEnrollmentOpen(true);
  }

  return (
    <>
    <SectionCard title="Danh sách nhân sự" action={<StatusPill tone="neutral">{people.length} bản nháp thử nghiệm</StatusPill>}>
      <div className="flex flex-col gap-3 border-b border-[#eee7e8] p-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative min-w-0 flex-1 lg:max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input value={query} onChange={(event) => setQuery(event.target.value)} className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-3 text-[15px] text-slate-800 outline-none transition focus:border-[#981b37] focus:ring-2 focus:ring-[#981b37]/10" placeholder="Tìm theo mã hoặc tên nhân viên" aria-label="Tìm nhân viên" />
        </div>
        <div className="flex flex-wrap gap-2">
          <select className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700" aria-label="Lọc bộ phận">
            <option>Tất cả bộ phận</option>
          </select>
          <select className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700" aria-label="Lọc trạng thái nhận diện">
            <option>Mọi trạng thái nhận diện</option>
          </select>
          <button onClick={() => setCreateOpen(true)} className="inline-flex h-11 items-center gap-2 rounded-xl bg-[#981b37] px-4 text-sm font-bold text-white transition hover:bg-[#7f1931]"><UserPlus size={17} /> Tạo hồ sơ thử nghiệm</button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[850px] border-collapse text-left text-[15px]">
          <thead className="bg-[#faf8f8] text-sm text-slate-500">
            <tr>
              {['Mã nhân viên','Họ và tên','Bộ phận','Chức vụ','Loại lao động','Nhận diện','Trạng thái'].map((label) => <th key={label} className="border-b border-[#eee7e8] px-5 py-3 font-bold">{label}</th>)}
            </tr>
          </thead>
          <tbody>
            {visiblePeople.map((person) => (
              <tr key={person.id} className="border-b border-[#eee7e8] last:border-0 hover:bg-[#fffafb]">
                <td className="px-5 py-4 font-bold text-slate-800">{person.code}</td>
                <td className="px-5 py-4 font-bold text-slate-900">{person.name}</td>
                <td className="px-5 py-4 text-slate-600">{person.department}</td>
                <td className="px-5 py-4 text-slate-600">{person.position}</td>
                <td className="px-5 py-4 text-slate-600">{person.employmentType}</td>
                <td className="px-5 py-4"><StatusPill tone="warning">Chưa đăng ký</StatusPill></td>
                <td className="px-5 py-4"><button onClick={() => startEnrollment(person)} className="rounded-lg border border-[#d7b9c0] px-3 py-2 text-sm font-bold text-[#981b37] hover:bg-[#fff0f3]">Đăng ký nhận diện</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {visiblePeople.length === 0 && <div className="grid min-h-72 place-items-center px-5 py-10 text-center">
        <div className="max-w-md">
          <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-[#fff0f3] text-[#981b37]"><Users size={25} /></span>
          <h3 className="mb-1 mt-4 text-lg font-bold text-slate-900">{people.length ? "Không tìm thấy nhân viên" : "Chưa có hồ sơ thử nghiệm"}</h3>
          <p className="m-0 text-[15px] leading-6 text-slate-500">Bản nháp chỉ tồn tại trong phiên xem và không ghi vào BMA Core hoặc Terminal.</p>
        </div>
      </div>}
    </SectionCard>

    <Dialog open={createOpen} onOpenChange={setCreateOpen}>
      <DialogContent className="max-h-[90vh] overflow-y-auto rounded-2xl border-[#e7dfe1] sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl text-slate-900">Tạo hồ sơ thử nghiệm</DialogTitle>
          <DialogDescription className="text-[15px] leading-6">Dùng để kiểm tra luồng giao diện. Dữ liệu không được lưu sau khi tải lại trang.</DialogDescription>
        </DialogHeader>
        <form onSubmit={saveDraft} className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              ["Mã nhân viên", "code", "Ví dụ: BM-TEST-001"],
              ["Họ và tên", "name", "Nhập họ và tên"],
              ["Bộ phận", "department", "Ví dụ: Vận hành"],
              ["Chức vụ", "position", "Ví dụ: Nhân viên vận hành"],
            ].map(([label, field, placeholder]) => (
              <label key={field} className="block text-sm font-bold text-slate-700">
                {label}
                <input required value={draft[field as keyof PersonDraft]} onChange={(event) => updateDraft(field as keyof PersonDraft, event.target.value)} placeholder={placeholder} className="mt-2 h-11 w-full rounded-xl border border-slate-200 px-3 text-[15px] font-normal outline-none focus:border-[#981b37] focus:ring-2 focus:ring-[#981b37]/10" />
              </label>
            ))}
            <label className="block text-sm font-bold text-slate-700 sm:col-span-2">
              Loại lao động
              <select value={draft.employmentType} onChange={(event) => updateDraft("employmentType", event.target.value)} className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-[15px] font-normal">
                <option>Chính thức</option>
                <option>Thử việc</option>
                <option>Thời vụ</option>
              </select>
            </label>
          </div>
          <div className="rounded-xl border border-sky-200 bg-sky-50 p-3.5 text-sm leading-5 text-sky-800">Hồ sơ nhân viên thật vẫn phải do BMA Workforce Core cấp mã và quản lý.</div>
          <DialogFooter>
            <button type="button" onClick={() => setCreateOpen(false)} className="h-11 rounded-xl border border-slate-200 px-4 text-sm font-bold text-slate-600">Hủy</button>
            <button type="submit" disabled={!formReady} className="h-11 rounded-xl bg-[#981b37] px-4 text-sm font-bold text-white disabled:opacity-45">Tạo bản nháp</button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>

    <Dialog open={enrollmentOpen} onOpenChange={setEnrollmentOpen}>
      <DialogContent className="max-h-[90vh] overflow-y-auto rounded-2xl border-[#e7dfe1] sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl text-slate-900">Đăng ký nhận diện khuôn mặt</DialogTitle>
          <DialogDescription className="text-[15px] leading-6">Luồng ba bước; không tải ảnh lên cloud và không thay firmware Terminal.</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-3 gap-2" aria-label={`Bước ${enrollmentStep} trên 3`}>
          {[1,2,3].map((step) => <span key={step} className={`h-1.5 rounded-full ${step <= enrollmentStep ? "bg-[#981b37]" : "bg-slate-200"}`} />)}
        </div>
        {enrollmentStep === 1 && selectedPerson && (
          <div className="space-y-4">
            <div className="rounded-2xl border border-[#e7dfe1] bg-[#fcfbfb] p-5">
              <p className="m-0 text-sm font-bold text-slate-500">BƯỚC 1 · XÁC NHẬN NHÂN VIÊN</p>
              <h3 className="mb-1 mt-3 text-xl font-bold text-slate-900">{selectedPerson.name}</h3>
              <p className="m-0 text-[15px] text-slate-600">{selectedPerson.code} · {selectedPerson.department} · {selectedPerson.position}</p>
            </div>
            <div className="flex gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm leading-5 text-emerald-800"><CheckCircle2 size={19} className="mt-0.5 shrink-0" />Hồ sơ thử nghiệm đủ thông tin tối thiểu để bắt đầu đăng ký.</div>
          </div>
        )}
        {enrollmentStep === 2 && (
          <div className="space-y-4">
            <p className="m-0 text-sm font-bold text-slate-500">BƯỚC 2 · CHỌN THIẾT BỊ</p>
            <div className="flex items-start justify-between gap-4 rounded-2xl border border-[#d7b9c0] bg-[#fffafb] p-5">
              <div className="flex gap-3">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-[#fff0f3] text-[#981b37]"><MonitorSmartphone size={21} /></span>
                <div><p className="m-0 font-bold text-slate-900">BM Face Terminal 01</p><p className="mb-0 mt-1 text-sm text-slate-500">DAHAHI DAH 1035 · Nhà máy Bình Minh</p></div>
              </div>
              <StatusPill tone="neutral">Chưa kết nối</StatusPill>
            </div>
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-5 text-amber-800">Có thể chuẩn bị yêu cầu, nhưng chưa gửi lệnh cho đến khi Bridge được xác thực.</div>
          </div>
        )}
        {enrollmentStep === 3 && (
          <div className="space-y-4">
            <p className="m-0 text-sm font-bold text-slate-500">BƯỚC 3 · KIỂM TRA SẴN SÀNG</p>
            {[
              ["Hồ sơ nhân viên", "Sẵn sàng", true],
              ["Firmware Terminal", "Giữ nguyên", true],
              ["BM Device Bridge", "Chưa cấu hình", false],
              ["Kết nối Terminal", "Chưa xác minh", false],
            ].map(([label, status, ready]) => (
              <div key={String(label)} className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 p-4">
                <span className="font-bold text-slate-800">{label}</span>
                <StatusPill tone={ready ? "ok" : "warning"}>{status}</StatusPill>
              </div>
            ))}
            <p className="m-0 text-sm leading-5 text-slate-500">Không có dữ liệu khuôn mặt nào được thu thập hoặc gửi trong lần kiểm tra này.</p>
          </div>
        )}
        <DialogFooter>
          <button type="button" onClick={() => enrollmentStep === 1 ? setEnrollmentOpen(false) : setEnrollmentStep((step) => step - 1)} className="h-11 rounded-xl border border-slate-200 px-4 text-sm font-bold text-slate-600">{enrollmentStep === 1 ? "Đóng" : "Quay lại"}</button>
          {enrollmentStep < 3 ? <button type="button" onClick={() => setEnrollmentStep((step) => step + 1)} className="h-11 rounded-xl bg-[#981b37] px-4 text-sm font-bold text-white">Tiếp tục</button> : <button type="button" disabled className="h-11 rounded-xl bg-[#981b37] px-4 text-sm font-bold text-white opacity-45">Chờ Bridge online</button>}
        </DialogFooter>
      </DialogContent>
    </Dialog>
    </>
  );
}

function AttendanceView() {
  const [tab, setTab] = useState<AttendanceTab>("today");
  const tabs: Array<[AttendanceTab, string]> = [
    ["today", "Hôm nay"],
    ["exceptions", "Bất thường"],
    ["timesheet", "Bảng công"],
    ["shifts", "Ca làm việc"],
    ["events", "Sự kiện Terminal"],
  ];
  const emptyCopy: Record<AttendanceTab, [string, string]> = {
    today: ["Chưa có lượt vào/ra hôm nay", "Dữ liệu sẽ được cập nhật từ các sự kiện Terminal hợp lệ."],
    exceptions: ["Không có bất thường cần xử lý", "Lượt thiếu, trùng hoặc sai ca sẽ được gom tại đây."],
    timesheet: ["Chưa có bảng công", "Bảng công chỉ được lập từ sự kiện đã đối soát và phê duyệt."],
    shifts: ["Chưa có lịch ca", "Ca làm việc sẽ được đồng bộ từ nguồn nhân sự chính thức."],
    events: ["Chưa nhận sự kiện Terminal", "Sự kiện gốc là bất biến; mọi điều chỉnh được ghi thành lịch sử riêng."],
  };
  return (
    <SectionCard title="Vận hành chấm công" action={<StatusPill tone="neutral">Ngày hôm nay</StatusPill>}>
      <div className="scrollbar-none flex gap-1 overflow-x-auto border-b border-[#eee7e8] px-4 pt-3" role="tablist" aria-label="Các màn hình chấm công">
        {tabs.map(([id, label]) => (
          <button key={id} onClick={() => setTab(id)} role="tab" aria-selected={tab === id} className={`whitespace-nowrap border-b-2 px-4 py-3 text-sm font-bold transition ${tab === id ? "border-[#981b37] text-[#981b37]" : "border-transparent text-slate-500 hover:text-slate-800"}`}>
            {label}
          </button>
        ))}
      </div>
      <div className="flex flex-col gap-3 border-b border-[#eee7e8] p-4 sm:flex-row sm:items-center sm:justify-between">
        <label className="flex h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700">
          <CalendarDays size={17} className="text-slate-400" />
          <input type="date" className="bg-transparent outline-none" aria-label="Chọn ngày" />
        </label>
        <button disabled className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-500 opacity-60">
          <Download size={16} /> Xuất dữ liệu
        </button>
      </div>
      <div className="grid min-h-80 place-items-center px-5 py-12 text-center">
        <div className="max-w-md">
          <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-slate-100 text-slate-500"><Clock3 size={25} /></span>
          <h3 className="mb-1 mt-4 text-lg font-bold text-slate-900">{emptyCopy[tab][0]}</h3>
          <p className="m-0 text-[15px] leading-6 text-slate-500">{emptyCopy[tab][1]}</p>
        </div>
      </div>
    </SectionCard>
  );
}

function DevicesView() {
  const [connection, setConnection] = useState<{
    state: "idle" | "checking" | "online" | "offline";
    message: string;
  }>({ state: "idle", message: "Chưa thực hiện kiểm tra" });

  async function checkConnection() {
    setConnection({ state: "checking", message: "Đang kiểm tra đường dữ liệu…" });
    try {
      const response = await fetch("/api/bridge/health", { cache: "no-store" });
      const result = (await response.json()) as { online?: boolean; message?: string };
      setConnection({
        state: result.online ? "online" : "offline",
        message: result.message || (result.online ? "Đường dữ liệu hoạt động" : "Chưa thể kết nối"),
      });
    } catch {
      setConnection({ state: "offline", message: "Không thể gọi dịch vụ kiểm tra" });
    }
  }

  return (
    <div className="grid gap-5 xl:grid-cols-[1.35fr_1fr]">
      <SectionCard title="Terminal tại nhà máy" action={<StatusPill tone="warning">Sẵn sàng shadow</StatusPill>}>
        <div className="p-5">
          <div className="rounded-2xl border border-[#e7dfe1] bg-[#fcfbfb] p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex gap-3">
                <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-white text-[#981b37] shadow-sm"><MonitorSmartphone size={23} /></span>
                <div>
                  <h3 className="m-0 text-lg font-bold text-slate-900">BM Face Terminal 01</h3>
                  <p className="mb-0 mt-1 text-sm text-slate-500">DAHAHI DAH 1035 · ID 1605063</p>
                </div>
              </div>
              <StatusPill tone="warning">Chưa bật HTTP</StatusPill>
            </div>
            <dl className="mt-5 grid gap-3 border-t border-[#e7dfe1] pt-4 sm:grid-cols-2">
              {[
                ["Địa chỉ LAN", "192.168.1.227"],
                ["MAC", "5c:f2:86:8b:58:58"],
                ["Web quản trị", "Port 80 · Đã xác minh"],
                ["Firmware", "v5.57.12.4-2806.1.2"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-xl bg-white px-4 py-3">
                  <dt className="text-sm font-semibold text-slate-500">{label}</dt>
                  <dd className="mb-0 ml-0 mt-1 font-bold text-slate-800">{value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-4 flex flex-wrap gap-2">
              <a href="/downloads/BM-Device-Bridge-Shadow-v0.1.0.zip" download className="inline-flex items-center gap-2 rounded-xl bg-[#981b37] px-3.5 py-2.5 text-sm font-bold text-white">
                <Download size={16} /> Tải gói Shadow cho Windows
              </a>
              <button onClick={checkConnection} disabled={connection.state === "checking"} className="inline-flex items-center gap-2 rounded-xl border border-[#d7b9c0] bg-white px-3.5 py-2.5 text-sm font-bold text-[#981b37] disabled:opacity-55">
                <RefreshCw size={16} className={connection.state === "checking" ? "animate-spin" : ""} /> Kiểm tra Gateway
              </button>
              {['Đồng bộ nhân viên','Đồng bộ thời gian'].map((label) => (
                <button key={label} disabled className="rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-bold text-slate-500 opacity-60">{label}</button>
              ))}
            </div>
            <div className={`mt-4 rounded-xl border p-3.5 text-sm font-semibold ${connection.state === "online" ? "border-emerald-200 bg-emerald-50 text-emerald-800" : connection.state === "offline" ? "border-amber-200 bg-amber-50 text-amber-800" : "border-slate-200 bg-white text-slate-600"}`} role="status">
              {connection.message}
            </div>
          </div>
        </div>
      </SectionCard>
      <SectionCard title="BM Device Bridge">
        <div className="space-y-4 p-5">
          <div className="flex items-center justify-between rounded-xl border border-slate-200 p-4">
            <div>
              <p className="m-0 font-bold text-slate-800">Dịch vụ cục bộ</p>
              <p className="mb-0 mt-1 text-sm text-slate-500">MINHCOMP · 192.168.1.99:8789</p>
            </div>
            <StatusPill tone="warning">Chờ cài</StatusPill>
          </div>
          <div className="flex items-center justify-between rounded-xl border border-slate-200 p-4">
            <div>
              <p className="m-0 font-bold text-slate-800">Hàng đợi sự kiện</p>
              <p className="mb-0 mt-1 text-sm text-slate-500">SQLite · ghi trước khi trả OK</p>
            </div>
            <StatusPill tone="neutral">Gateway đang tắt</StatusPill>
          </div>
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-[15px] leading-6 text-amber-800">
            Shadow chỉ nhận thêm HTTP qua LAN. MQTT Dahahi, Kết nối trung tâm và firmware đều giữ nguyên cho đến khi đối soát đạt yêu cầu.
          </div>
        </div>
      </SectionCard>
    </div>
  );
}

function ReportsView() {
  const reports = [
    ["Bảng công tháng", "Ngày công và ca đã được phê duyệt", CalendarDays],
    ["Đi trễ · về sớm", "Các trường hợp lệch lịch ca", Clock3],
    ["Điều chỉnh chấm công", "Lý do, người yêu cầu và người duyệt", CheckCircle2],
    ["Sức khỏe thiết bị", "Kết nối, đồng bộ và hàng đợi sự kiện", Activity],
  ] as const;
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {reports.map(([title, description, Icon]) => (
        <article key={title} className="rounded-2xl border border-[#e7dfe1] bg-white p-5 shadow-[0_1px_2px_rgba(55,34,39,0.04)]">
          <div className="flex items-start gap-4">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-[#fff0f3] text-[#981b37]"><Icon size={21} /></span>
            <div className="min-w-0 flex-1">
              <h2 className="m-0 text-lg font-bold text-slate-900">{title}</h2>
              <p className="mb-4 mt-1 text-[15px] leading-6 text-slate-500">{description}</p>
              <button disabled className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3.5 py-2 text-sm font-bold text-slate-500 opacity-60"><Download size={16} /> Xuất báo cáo</button>
            </div>
          </div>
        </article>
      ))}
      <div className="rounded-xl border border-sky-200 bg-sky-50 px-4 py-3 text-sm font-semibold text-sky-800 sm:col-span-2">
        Báo cáo chỉ mở khi dữ liệu đã được đối soát. Round 1 chưa thực hiện tính lương tự động.
      </div>
    </div>
  );
}

function SystemView() {
  const groups = [
    ["Tài khoản quản trị", "Tài khoản đăng nhập BM Bridge, tách biệt với hồ sơ nhân viên.", ShieldCheck, "1 chủ sở hữu"],
    ["Vai trò và quyền hạn", "Phân quyền HR, quản lý ca, bảo vệ, IT và chỉ đọc.", Fingerprint, "Chờ cấu hình"],
    ["Nguồn dữ liệu", "BMA Workforce Core là nguồn chính; không ghi song song sang hệ thống khác.", Database, "Chờ tích hợp"],
    ["Nhật ký kiểm toán", "Ghi nhận đăng nhập, phê duyệt và mọi thay đổi quan trọng.", Activity, "Sẵn sàng thiết kế"],
  ] as const;
  return (
    <SectionCard title="Quản trị hệ thống" action={<StatusPill tone="ok">Site riêng tư</StatusPill>}>
      <div className="grid gap-4 p-5 md:grid-cols-2">
        {groups.map(([title, description, Icon, status]) => (
          <button key={title} className="flex items-start gap-4 rounded-2xl border border-[#e7dfe1] bg-white p-4 text-left transition hover:border-[#cbaeb5] hover:bg-[#fffafb]">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-slate-100 text-slate-600"><Icon size={21} /></span>
            <span className="min-w-0 flex-1">
              <span className="block font-bold text-slate-900">{title}</span>
              <span className="mt-1 block text-sm leading-5 text-slate-500">{description}</span>
              <span className="mt-3 block text-sm font-bold text-[#981b37]">{status}</span>
            </span>
          </button>
        ))}
      </div>
    </SectionCard>
  );
}

export function BMBridgePortal() {
  const [view, setView] = useState<View>("overview");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const today = useMemo(
    () => new Intl.DateTimeFormat("vi-VN", { weekday: "long", day: "2-digit", month: "2-digit", year: "numeric" }).format(new Date()),
    [],
  );
  const current = viewTitles[view];

  function chooseView(next: View) {
    setView(next);
    setMobileMenuOpen(false);
  }

  return (
    <div className="min-h-screen bg-[#f7f5f4] text-slate-700 lg:flex">
      {mobileMenuOpen && <button className="fixed inset-0 z-30 bg-slate-950/35 lg:hidden" onClick={() => setMobileMenuOpen(false)} aria-label="Đóng menu" />}
      <aside className={`fixed inset-y-0 left-0 z-40 flex w-[280px] flex-col border-r border-[#e6dcde] bg-[#fffdfd] transition-transform lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex h-20 items-center gap-3 border-b border-[#eee7e8] px-5">
          <img src="/sites/binhminh-dahahi-vn-81f51c00/dsKhach-0a4701c1/binh-minh-logo.webp" alt="Bình Minh" className="size-11 rounded-full object-cover" />
          <div className="min-w-0 flex-1">
            <p className="m-0 text-[12px] font-extrabold tracking-[0.18em] text-[#981b37]">BÌNH MINH</p>
            <p className="m-0 mt-0.5 truncate text-lg font-bold text-slate-900">BM Bridge</p>
          </div>
          <button className="grid size-10 place-items-center rounded-xl text-slate-500 hover:bg-slate-100 lg:hidden" onClick={() => setMobileMenuOpen(false)} aria-label="Đóng menu"><X size={21} /></button>
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto p-3" aria-label="Điều hướng chính">
          {navItems.map(({ id, label, icon: Icon }) => {
            const active = id === view;
            return (
              <button key={id} onClick={() => chooseView(id)} className={`flex h-12 w-full items-center gap-3 rounded-xl px-3.5 text-left text-[15px] font-bold transition ${active ? "bg-[#981b37] text-white shadow-[0_8px_20px_rgba(152,27,55,0.18)]" : "text-slate-600 hover:bg-[#fff0f3] hover:text-[#981b37]"}`}>
                <Icon size={19} aria-hidden="true" />
                <span>{label}</span>
              </button>
            );
          })}
        </nav>
        <div className="m-3 rounded-2xl border border-[#eadadd] bg-[#fff7f8] p-4">
          <div className="flex items-center gap-2 text-sm font-bold text-[#7f1931]"><ShieldCheck size={17} /> Round 1 · Chấm công</div>
          <p className="mb-0 mt-2 text-[13px] leading-5 text-slate-500">Một nhà máy · Một Terminal thử nghiệm · Không dùng vendor cloud</p>
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-20 flex h-20 items-center justify-between gap-3 border-b border-[#e6dcde] bg-white/95 px-4 backdrop-blur sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <button className="grid size-11 shrink-0 place-items-center rounded-xl border border-slate-200 text-slate-600 lg:hidden" onClick={() => setMobileMenuOpen(true)} aria-label="Mở menu"><Menu size={22} /></button>
            <div className="min-w-0">
              <p className="m-0 truncate text-lg font-bold text-slate-900 sm:text-xl">{current.title}</p>
              <p className="m-0 mt-0.5 hidden truncate text-sm text-slate-500 sm:block">{today}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <StatusPill tone="warning">Dữ liệu minh họa</StatusPill>
            <button className="relative grid size-11 place-items-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50" aria-label="Thông báo">
              <Bell size={19} />
            </button>
            <button className="flex h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-2.5 text-left hover:bg-slate-50" aria-label="Tài khoản của Minh An">
              <span className="grid size-7 place-items-center rounded-lg bg-[#981b37] text-xs font-extrabold text-white">MA</span>
              <span className="hidden text-sm font-bold text-slate-700 sm:block">Minh An</span>
              <ChevronDown size={15} className="hidden text-slate-400 sm:block" />
            </button>
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8">
          <div className="mb-5">
            <h1 className="m-0 text-2xl font-extrabold tracking-tight text-slate-950 sm:text-[28px]">{current.title}</h1>
            <p className="mb-0 mt-1 text-[15px] leading-6 text-slate-500">{current.description}</p>
          </div>
          {view === "overview" && <OverviewView />}
          {view === "people" && <PeopleView />}
          {view === "attendance" && <AttendanceView />}
          {view === "devices" && <DevicesView />}
          {view === "reports" && <ReportsView />}
          {view === "system" && <SystemView />}
        </main>
      </div>
    </div>
  );
}
