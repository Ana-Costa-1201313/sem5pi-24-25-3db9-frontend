import { Role } from "../role.model";

export type CreateStaff = {
  name?: string;
  licenseNumber?: number;
  phone?: string;
  specialization?: string;
  availabilitySlots?: string[];
  role?: Role;
  recruitmentYear?: number;
};
