import { SupportingContent } from "./common"

export interface Event {
    EventId: string
    Name: string
    Detail: string
    AnnouncementDate: string
    StartDate: string
    EndDate: string
    Status: "Pending" | "Canceled" | "Executed"
    SupportingContent: SupportingContent
    OtherData: string
}
