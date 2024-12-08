import { UserExperience } from "./userData";
import { UserOrganization } from "./UserOrganization";

export interface UserExperienceDetails extends UserExperience {
    id: number;
    fromDate: string;
    toDate: string;
    organizationId?: number;
    organizationName?: string;
    organizationDetails?: UserOrganization;
    isCurrentOrganization: boolean;
    description1: string,
    description2: string,
    description3: string
}