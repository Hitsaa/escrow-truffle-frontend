import { DeveloperInterface } from "./developer.interface";
import { ProjectInterface } from "./project.interface";

export interface DeveloperProjectInterface {
    id?: number;
    developer: DeveloperInterface;
    project: ProjectInterface;
    status?: string;
}