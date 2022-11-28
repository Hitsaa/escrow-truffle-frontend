export interface ClientInterface {
    id: number,
    clientName: string;
    phoneNumber: string;
    projects: ProjectInterface[];
}

export interface ProjectInterface {
    id: number;
    projectName: string;
    address: string;
}
