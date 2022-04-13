import React from "react"
import { Person } from "data/person"
import { observer } from "mobx-react"
import { ContributionItem } from "./common"
import { TextField } from "@fluentui/react"

interface PersonProps {
    person: Person
}

export const PersonContribution = observer((props: PersonProps) => {
    return (
        <ContributionItem title="Person Details">
            <TextField label="Person Name" />
        </ContributionItem>
    )
})
