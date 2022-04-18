import {
    EVENT_CONTRIBUTION_TEMPLATE,
    LOCATION_CONTRIBUTION_TEMPLATE,
    OFFICE_CONTRIBUTION_TEMPLATE,
    ORGANIZATION_CONTRIBUTION_TEMPLATE,
    PERSON_CONTRIBUTION_TEMPLATE,
    PROMISE_CONTRIBUTION_TEMPLATE,
} from "app_constants"
import { observable } from "mobx"
import { uniqueId } from "utils/random"
import { epoch } from "utils/time"

export type ContributionType = "promise" | "person" | "event" | "location" | "office" | "org"
export const contribution_types: ContributionType[] = ["event", "location", "office", "org", "person", "promise"]
export type ContributionStatus = "draft" | "submitted" | "has-recommendations" | "review" | "accepted" | "rejected"

export interface Contribution {
    id: string
    title: string
    type: ContributionType
    status: ContributionStatus
    details: string
    date_added: number
    date_accepted: number
    events: { time: number; event: string }[]
    archived: boolean
    email_permission: boolean
    name_permission: boolean
    user_id?: boolean
    user_name?: boolean
}

export function NewObservableContribution(contrib_type: ContributionType): Contribution {
    let details: string
    let title: string
    switch (contrib_type) {
        case "promise":
            details = PROMISE_CONTRIBUTION_TEMPLATE
            title = "New Promise"
            break
        case "event":
            details = EVENT_CONTRIBUTION_TEMPLATE
            title = "New Event"
            break
        case "location":
            details = LOCATION_CONTRIBUTION_TEMPLATE
            title = "New Location"
            break
        case "person":
            details = PERSON_CONTRIBUTION_TEMPLATE
            title = "Introduce Person"
            break
        case "office":
            details = OFFICE_CONTRIBUTION_TEMPLATE
            title = "New Office"
            break
        case "org":
            details = ORGANIZATION_CONTRIBUTION_TEMPLATE
            title = "New Organization"
            break
    }

    return observable({
        id: uniqueId(),
        title,
        type: contrib_type,
        status: "draft",
        details,
        date_added: epoch(new Date()),
        date_accepted: 0,
        events: [{ time: epoch(new Date()), event: "Created contribution" }],
        archived: false,
        email_permission: false,
        name_permission: false,
    })
}
