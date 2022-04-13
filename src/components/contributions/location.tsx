import React from "react"
import { Location } from "data/location"
import { observer } from "mobx-react"
import { ContributionItem } from "./common"
import { TextField } from "@fluentui/react"

interface LocationProps {
    location: Location
}

export const LocationContribution = observer((props: LocationProps) => {
    return (
        <ContributionItem title="Location Details">
            <TextField label="Location Name" />
        </ContributionItem>
    )
})
