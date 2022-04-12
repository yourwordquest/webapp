import { Location } from "./location"

export type ContributionType = "promise" | "person" | "event" | "location" | "office"
export type ContributionStatus = "draft" | "submitted" | "review" | "accepted"

export interface Contribution {
    id: string
    is_saved: boolean
    title: string
    type: ContributionType
    status: ContributionStatus
    details: Location
    attached: Contribution[]
}
