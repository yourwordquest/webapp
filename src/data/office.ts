export interface Office {
    OfficeId: string
    Name: string
    Occupants: number
    Level: number
    Intro: string
    Narrative: string
    OtherData: string
    Status: "Active" | "Inactive"
}
