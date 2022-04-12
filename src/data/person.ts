export interface Person {
    PersonId: string
    Name: string
    OtherNames: { type: string; description: string; name: string }[]
    Intro: string
    Narrative: string
    OtherData: string
    Status: "Alive" | "Deceased" | "UnKnown"
}
