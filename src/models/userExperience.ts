import { UserOrganization } from "./UserOrganization";

export interface UserExperience {
    id: number;
    fromDate: string;
    toDate: string;
    organizationId: number;
    organizationDetails: UserOrganization;
    currentOrganization: boolean;
    description1: string,
    description2: string,
    description3: string
}