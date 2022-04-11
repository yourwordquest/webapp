import { FontIcon, Panel, PanelType, DefaultButton } from "@fluentui/react"
import { LOCATION_LOADING } from "app_constants"
import { flag_link } from "data/location"
import { GlobalContext, GlobalState } from "data/state"
import { FluentTheme, primaryColor, secondaryColor } from "data/theme"
import { observer } from "mobx-react"
import React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { withRouter, RoutedProps } from "utils/routing"
import { plural } from "utils/text"
import { Break, Flex, FlexColumn } from "./containers"

interface LocationInputProps extends RoutedProps {
    minimalView: boolean
}

@observer
class RoutedLocationInput extends React.Component<LocationInputProps> {
    static contextType = GlobalContext

    renderHeader = () => {
        const state: GlobalState = this.context
        let name = state.locations?.current.Name || ""
        const flag = flag_link(state.locations?.current)
        if (state.isLoading(LOCATION_LOADING)) {
            name = "Loading..."
        }
        return (
            <PickerTitle justify="flex-start" align="flex-start">
                <Flex align="center" className="inner" autoGrow>
                    <img alt="" src={flag} />
                    {name}
                </Flex>
                {!state.isLoading(LOCATION_LOADING) && (
                    <DefaultButton text="Done" iconProps={{ iconName: "CheckMark" }} onClick={state.toggleLocationPicker} />
                )}
            </PickerTitle>
        )
    }

    render() {
        const state: GlobalState = this.context
        const { minimalView } = this.props
        let name = state.locations?.current.Name || ""
        const flag = flag_link(state.locations?.current)
        if (state.isLoading(LOCATION_LOADING)) {
            name = "Loading..."
        }

        const has_parents = Boolean(state.locations?.parents.length)
        let children_types: string[] = []
        if (state.locations) {
            children_types = Object.keys(state.locations.children_by_type).reverse()
        }
        return (
            <>
                <StyledLocationInput onClick={state.toggleLocationPicker} className={minimalView ? "minimal" : "expanded"}>
                    <img alt="" src={flag} />
                    {!minimalView && <Break size={0.5} />}
                    {!minimalView && <span>{name}</span>}
                    {!minimalView && <Break size={0.3} />}
                    {!minimalView && <FontIcon className="expand-icon" iconName="ChevronDown" />}
                </StyledLocationInput>
                <Panel
                    isLightDismiss
                    isOpen={state.locationPickerOpen}
                    onDismiss={state.toggleLocationPicker}
                    type={PanelType.medium}
                    customWidth="50vw"
                    onRenderHeader={this.renderHeader}
                    hasCloseButton={false}
                >
                    <StyledLocationPicker>
                        <Break />
                        {has_parents && (
                            <>
                                <Break />
                                <Break />
                                <label>Located In</label>
                                <Break />
                                <div className="parents">
                                    {state.locations?.parents.map((loc) => (
                                        <LocationPill key={loc.LocationId} to={`?loc=${loc.LocationId}`}>
                                            <img alt="" src={flag_link(loc)} />
                                            {loc.Name}
                                        </LocationPill>
                                    ))}
                                </div>
                            </>
                        )}
                        {children_types.map((locType) => (
                            <FlexColumn key={locType}>
                                <Break />
                                <label>{plural(locType) || "Locations"}</label>
                                <Break />
                                <div className="children">
                                    {state.locations?.children_by_type[locType].map((loc) => (
                                        <LocationPill key={loc.LocationId} to={`?loc=${loc.LocationId}`}>
                                            <img alt="" src={flag_link(loc)} />
                                            {loc.Name}
                                        </LocationPill>
                                    ))}
                                </div>
                            </FlexColumn>
                        ))}
                    </StyledLocationPicker>
                </Panel>
            </>
        )
    }
}

const PickerTitle = styled(Flex)`
    position: sticky;
    background-color: #ffffff;
    top: 0;
    font-size: 1.6em;
    padding-top: 0.5em;
    .inner {
        padding: 0.5em;
    }
    img {
        height: 32px;
        width: auto;
        border-radius: 8px;
        margin-right: 0.5em;
    }
    button {
        padding: 0 0.5em;
        margin-right: 0.5em;
        color: ${primaryColor};
        border: 1px solid ${primaryColor};
        &:hover {
            color: ${primaryColor};
            background-color: ${primaryColor}22;
        }
    }
`

const StyledLocationPicker = styled.div`
    label {
        font-size: 1.5em;
        font-style: oblique;
    }
    .parents,
    .children {
        padding: 0.5em 1em;
        border-radius: 0.5em;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }
    .parents {
        background-color: ${primaryColor}22;
    }
    .children {
        background-color: ${secondaryColor}22;
    }
    display: flex;
    flex-direction: column;
`

const LocationPill = styled(Link)`
    display: flex;
    background-color: #ffffff;
    padding: 0.4em 0.8em;
    margin: 0.4em;
    align-items: center;
    flex-grow: 1;
    flex-basis: 1;
    cursor: pointer;
    img {
        height: 18px;
        border-radius: 0.3em;
        margin-right: 0.3em;
    }
    &:hover {
        color: ${primaryColor};
    }
`

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
