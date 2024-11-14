import { RequiredStaff } from "./requiredStaff.model";

export type OperationTypeDto = {
    name?: string;
    anesthesiaPatientPreparationInMinutes?: number;
    surgeryInMinutes?: number;
    cleaningInMinutes?: number;
    requiredStaff?: RequiredStaff[];
};