import React from "react"
import { Promise } from "data/promise"
import { observer } from "mobx-react"
import { ContributionItem } from "./common"
import { TextField } from "@fluentui/react"

interface PromiseProps {
    promise: Promise
}

export const PromiseContribution = observer((props: PromiseProps) => {
    return (
        <ContributionItem title="Promise Details">
            <TextField label="Promise Name" />
        </ContributionItem>
    )
})
