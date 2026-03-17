import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface BookingSubmission {
    id: bigint;
    customerName: string;
    serviceType: ServiceType;
    message: string;
    timestamp: Time;
    phoneNumber: string;
    deviceModel: string;
}
export type Time = bigint;
export enum ServiceType {
    chargerPortRepair = "chargerPortRepair",
    waterDamageRepair = "waterDamageRepair",
    batteryReplacement = "batteryReplacement",
    cameraRepair = "cameraRepair",
    screenDamageRepair = "screenDamageRepair"
}
export interface backendInterface {
    getAllBookings(): Promise<Array<BookingSubmission>>;
    getBookingById(id: bigint): Promise<BookingSubmission>;
    getBookingsByCustomerName(customerName: string): Promise<Array<BookingSubmission>>;
    getBookingsByServiceType(serviceType: ServiceType): Promise<Array<BookingSubmission>>;
    submitBooking(customerName: string, phoneNumber: string, deviceModel: string, serviceType: ServiceType, message: string): Promise<bigint>;
}
