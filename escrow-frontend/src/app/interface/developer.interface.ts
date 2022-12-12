import { ProjectInterface } from "./project.interface";

export interface DeveloperInterface {
    id: number,
    developerName: string;
    phoneNumber: string;
    projects: ProjectInterface[];
}
