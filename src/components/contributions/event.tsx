import React from "react"
import { Event } from "data/event"
import { observer } from "mobx-react"
import { ContributionItem } from "./common"
import { TextField } from "@fluentui/react"

interface EventProps {
    event: Event
}

export const EventContribution = observer((props: EventProps) => {
    return (
        <ContributionItem title="Event Details">
            <TextField label="Event Name" />
        </ContributionItem>
    )
})
