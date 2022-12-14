import { ProjectInterface } from "./project.interface";

export interface ClientInterface {
    id: number,
    clientName: string;
    phoneNumber: string;
    address: string;
    projects: ProjectInterface[];
}
