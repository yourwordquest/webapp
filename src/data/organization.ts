export interface Organization {
    OrganizationId: string
    Name: string
    Level: number
    Intro: string
    Narrative: string
    OtherData: string
    OrganizationType: "GovernmentInstitution" | "NonGovernmentalInstitution" | "AcademicInstitution" | "Company" | "Other"
    Status: "Active" | "Inactive"
}
