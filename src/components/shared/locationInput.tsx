import { FontIcon } from "@fluentui/react"
import { FluentTheme, primaryColor } from "data/theme"
import React from "react"
import styled from "styled-components"
import { Break } from "./containers"

interface LocationProps {
    name: string
    icon: string
}

interface LocationInputProps {
    location: LocationProps
    minimalView: boolean
}

export class LocationInput extends React.Component<LocationInputProps> {
    render() {
        const { location, minimalView } = this.props
        return (
            <StyledLocationInput className={minimalView ? "minimal" : "expanded"}>
                <img alt={location.name} src={location.icon} />
                {!minimalView && <Break size={0.5} />}
                {!minimalView && <span>{location.name}</span>}
                {!minimalView && <Break size={0.3} />}
                {!minimalView && <FontIcon className="expand-icon" iconName="ChevronDown" />}
            </StyledLocationInput>
        )
    }
}

const StyledLocationInput = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    background-color: #ffffff;
    height: 32px;
    padding: 0 1em;
    img {
        height: 18px;
        border-radius: 0.3em;
    }
    .expand-icon {
        color: ${primaryColor};
        font-size: 0.8em;
    }
    &.minimal {
        border-radius: 0.5em;
        &:hover {
            background-color: ${primaryColor}44;
        }
    }
    &.expanded {
        border-bottom: 1px solid ${FluentTheme.palette.neutralSecondary};
        &:hover {
            border-bottom: 1px solid ${primaryColor};
        }
    }
    &:hover {
        color: ${primaryColor};
    }
`
