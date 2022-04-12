import { uniqueId } from "utils/random"
import { OtherData } from "./common"

export interface Location {
    LocationId: string
    Name: string
    Code: string
    Intro: string
    Narrative: string
    OtherData: OtherData
    Status: "Active" | "InActive"
    LocationType?: string
}

export function NewLocation(): Location {
    return {
        LocationId: uniqueId(),
        Name: "",
        Code: "",
        Intro: "",
        Narrative: "",
        OtherData: {},
        Status: "Active",
    }
}

export interface LocationRelations {
    parent_locations: Location[]
    child_locations: Location[]
    current_location: Location
}

export class Locations {
    current: Location
    parents: Location[]
    children: Location[]

    constructor(location_relations: LocationRelations) {
        this.current = location_relations.current_location
        this.parents = location_relations.parent_locations
        this.children = location_relations.child_locations
    }

    get children_by_type(): { [type: string]: Location[] } {
        const response: { [type: string]: Location[] } = {}
        for (let i = 0; i < this.children.length; i++) {
            const location = this.children[i]
            if (!location.LocationType) continue
            if (!response[location.LocationType]) {
                response[location.LocationType] = []
            }
            response[location.LocationType].push(location)
        }
        return response
    }
}

export function flag_link(location?: Location): string {
    let flag = "/assets/Simple_Globe.svg"

    if (!location || !location.OtherData || !location.OtherData.flag) {
        return flag
    }

    return location.OtherData.flag.payload
}
