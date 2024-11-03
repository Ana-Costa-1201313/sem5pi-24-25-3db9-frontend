import { Role } from "./role.model";

export type Staff = {
    id: string | null |undefined;
    name: string | null | undefined;
    licenseNumber: number | null | undefined;
    email: string | null |undefined;
    phone: string | null |undefined;
    specialization: string | null |undefined;
    availabilitySlots: string[] | null |undefined;
    role: Role | null |undefined;
    mechanographicNum: string | null |undefined;
    active: boolean | null | undefined;
}