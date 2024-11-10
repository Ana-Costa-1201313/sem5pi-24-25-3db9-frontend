import { RequiredStaff } from "./requiredStaff.model";

export type CreateOperationType = {
    name?: string;
    anesthesiaPatientPreparationInMinutes?: number;
    surgeryInMinutes?: number;
    cleaningInMinutes?: number;
    requiredStaff?: RequiredStaff[];
};