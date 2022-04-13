import React from "react"
import { Organization } from "data/organization"
import { observer } from "mobx-react"
import { ContributionItem } from "./common"
import { TextField } from "@fluentui/react"

interface OrganizationProps {
    organization: Organization
}

export const OrganizationContribution = observer((props: OrganizationProps) => {
    return (
        <ContributionItem title="Organization Details">
            <TextField label="Organization Name" />
        </ContributionItem>
    )
})
