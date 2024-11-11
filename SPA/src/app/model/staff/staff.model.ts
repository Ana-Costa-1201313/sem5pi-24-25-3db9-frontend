import { Role } from '../role.model';
import { Specialization } from '../specialization.model';

export type Staff = {
  id?: string;
  name?: string;
  licenseNumber?: number;
  email?: string;
  phone?: string;
  specialization?: Specialization;
  availabilitySlots?: string[];
  role?: Role;
  mechanographicNum?: string;
  active?: boolean;
};
