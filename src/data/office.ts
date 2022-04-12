import { uniqueId } from "utils/random"
import { OtherData } from "./common"

export interface Office {
    OfficeId: string
    Name: string
    Occupants: number
    Level: number
    Intro: string
    Narrative: string
    OtherData: OtherData
    Status: "Active" | "Inactive"
}

export function NewOffice(): Office {
    return {
        OfficeId: uniqueId(),
        Name: "",
        Occupants: 1,
        Level: 0,
        Intro: "",
        Narrative: "",
        OtherData: {},
        Status: "Active",
    }
}
