import { observable } from "mobx"
import { uniqueId } from "utils/random"
import { Event, NewEvent } from "./event"
import { Location, NewLocation } from "./location"
import { NewOffice, Office } from "./office"
import { NewOrganization, Organization } from "./organization"
import { NewPerson, Person } from "./person"
import { NewPromise, Promise } from "./promise"

export type ContributionType = "promise" | "person" | "event" | "location" | "office" | "org"
export const contribution_types: ContributionType[] = ["event", "location", "office", "org", "person", "promise"]
export type ContributionStatus = "draft" | "submitted" | "has-recommendations" | "review" | "accepted" | "rejected"

export interface Contribution {
    id: string
    is_update: boolean
    original_id: string
    title: string
    type: ContributionType
    status: ContributionStatus
    details: Location | Office | Event | Person | Organization | Promise
    edges: { type: string; detail: string }[]
    attached: Contribution[]
    notes: string
}

export function NewObservableContribution(contrib_type: ContributionType): Contribution {
    let details: Location | Office | Event | Person | Organization | Promise
    let title: string
    switch (contrib_type) {
        case "promise":
            details = NewPromise()
            title = "New Promise"
            break
        case "event":
            details = NewEvent()
            title = "New Event"
            break
        case "location":
            details = NewLocation()
            title = "New Location"
            break
        case "person":
            details = NewPerson()
            title = "Introduce Person"
            break
        case "office":
            details = NewOffice()
            title = "New Office"
            break
        case "org":
            details = NewOrganization()
            title = "New Organization"
            break
    }

    return observable({
        id: uniqueId(),
        is_update: false,
        original_id: "",
        title,
        type: contrib_type,
        status: "draft",
        details,
        edges: [],
        attached: [],
        notes: "",
    })
}
