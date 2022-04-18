import { uniqueId } from "utils/random"
import { OtherData, SupportingContent } from "./common"

export interface Event {
    EventId: string
    Name: string
    Detail: string
    AnnouncementDate: string
    StartDate: string
    EndDate: string
    Status: "Pending" | "Canceled" | "Completed"
    SupportingContent: SupportingContent[]
    OtherData: OtherData
    Clarity?: number
}

export function NewEvent(): Event {
    return {
        EventId: uniqueId(),
        Name: "",
        Detail: "",
        AnnouncementDate: "",
        StartDate: "",
        EndDate: "",
        Status: "Pending",
        SupportingContent: [],
        OtherData: {},
    }
}
