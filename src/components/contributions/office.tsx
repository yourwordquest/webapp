import React from "react"
import { Office } from "data/office"
import { observer } from "mobx-react"
import { ContributionItem } from "./common"
import { TextField } from "@fluentui/react"

interface OfficeProps {
    office: Office
}

export const OfficeContribution = observer((props: OfficeProps) => {
    return (
        <ContributionItem title="Office Details">
            <TextField label="Office Name" />
        </ContributionItem>
    )
})
