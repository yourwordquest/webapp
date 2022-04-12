import { uniqueId } from "utils/random"
import { OtherData } from "./common"

export interface Organization {
    OrganizationId: string
    Name: string
    Level: number
    Intro: string
    Narrative: string
    OtherData: OtherData
    OrganizationType: "GovernmentInstitution" | "NonGovernmentalInstitution" | "AcademicInstitution" | "Company" | "Other"
    Status: "Active" | "Inactive"
}

export function NewOrganization(): Organization {
    return {
        OrganizationId: uniqueId(),
        Name: "",
        Level: 0,
        Intro: "",
        Narrative: "",
        OtherData: {},
        OrganizationType: "Other",
        Status: "Active",
    }
}
