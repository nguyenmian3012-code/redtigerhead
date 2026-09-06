export type FaceFilter = "all" | "registered" | "unregistered";

export type Customer = {
  id: string;
  code: string;
  name: string;
  phone: string;
  organization: string;
  appointment: string;
  time: string;
  faceRegistered: boolean;
  gender?: "Nam" | "Nữ";
  address?: string;
  email?: string;
  department?: string;
  identityNumber?: string;
};

export type CustomerDraft = Omit<Customer, "id" | "time">;

