import { uniqueId } from "utils/random"
import { OtherData } from "./common"

export interface Person {
    PersonId: string
    Name: string
    OtherNames: { type: string; description: string; name: string }[]
    Intro: string
    Narrative: string
    OtherData: OtherData
    Status: "Alive" | "Deceased" | "UnKnown"
}

export function NewPerson(): Person {
    return {
        PersonId: uniqueId(),
        Name: "",
        OtherNames: [],
        Intro: "",
        Narrative: "",
        OtherData: {},
        Status: "UnKnown",
    }
}
