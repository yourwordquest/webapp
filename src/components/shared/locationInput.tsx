import { FontIcon } from "@fluentui/react"
import { LOCATION_LOADING } from "constans"
import { flag_link } from "data/location"
import { GlobalContext, GlobalState } from "data/state"
import { FluentTheme, primaryColor } from "data/theme"
import { observer } from "mobx-react"
import React from "react"
import styled from "styled-components"
import { withRouter, RoutedProps } from "utils/routing"
import { Break } from "./containers"

interface LocationInputProps extends RoutedProps {
    minimalView: boolean
}

@observer
class RoutedLocationInput extends React.Component<LocationInputProps> {
    static contextType = GlobalContext
    render() {
        const state: GlobalState = this.context
        const { minimalView } = this.props
        let name = state.locations?.current.Name || ""
        const flag = flag_link(state.locations?.current)
        if (state.isLoading(LOCATION_LOADING)) {
            name = "Loading..."
        }
        return (
            <StyledLocationInput className={minimalView ? "minimal" : "expanded"}>
                <img alt="" src={flag} />
                {!minimalView && <Break size={0.5} />}
                {!minimalView && <span>{name}</span>}
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

export const LocationInput = withRouter<LocationInputProps>(RoutedLocationInput)
