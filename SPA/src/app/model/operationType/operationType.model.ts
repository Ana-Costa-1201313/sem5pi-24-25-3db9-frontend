import { RequiredStaff } from "./requiredStaff.model";

export type OperationType = {
    id: string | null |undefined;
    name: string | null | undefined;
    anesthesiaPatientPreparationInMinutes: number | null | undefined;
    surgeryInMinutes: number | null | undefined;
    cleaningInMinutes: number | null | undefined;
    requiredStaff: RequiredStaff[] | null | undefined;
    active: boolean | null | undefined;
}