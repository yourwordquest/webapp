import React from "react"
import styled from "styled-components"
import { FlexColumn } from "components/shared/containers"

export function ContributionItem({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <StyledItem>
            <label className="item-label">{title}</label>
            {children}
        </StyledItem>
    )
}

const StyledItem = styled(FlexColumn)`
    background-color: #f1f1f1;
    padding: 1em 0.5em;
    margin: 1em 0;
    border-radius: 1em;
    .item-label {
        font-size: 1.5em;
    }
`
