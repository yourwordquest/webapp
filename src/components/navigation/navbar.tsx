import React from "react"
import styled from "styled-components"
import {
    CommandButton,
    IconButton,
    IContextualMenuProps,
    Persona,
    PersonaSize,
    Spinner,
    SpinnerSize,
    TextField,
} from "@fluentui/react"
import { Break, Flex } from "components/shared/containers"
import { MobileBreakPoint, NavBarHeight, primaryColor } from "data/theme"
import { Link } from "react-router-dom"
import { observer } from "mobx-react"
import { GlobalContext, GlobalState } from "data/state"
import { LocationInput } from "components/shared/locationInput"
import { withRouter, RoutedProps } from "utils/routing"
import { CCA2_CCA3 } from "data/cca_map"
import { LOCATION_LOADING } from "app_constants"
import { Location } from "data/location"

interface NavBarState {
    searchBoxOpen: boolean
    mobileWidth: boolean
}

@observer
class RoutedNavBar extends React.Component<RoutedProps<any, { loc?: string }>, NavBarState> {
    static contextType = GlobalContext
    constructor(props: RoutedProps) {
        super(props)

        this.state = {
            searchBoxOpen: false,
            mobileWidth: false,
        }
    }

    loadLocation() {
        const {
            search: { loc },
        } = this.props
        const state: GlobalState = this.context

        const load_based_on_ip_location = () => {
            state
                .fetch<{ country_code: string }>("/location")
                .then(({ data }) => {
                    let location_id = "earth"
                    if (data && data.country_code) {
                        const cca3 = CCA2_CCA3[data.country_code]
                        if (cca3) {
                            location_id = `country:${cca3}`.toLocaleLowerCase()
                        }
                    }
                    state.setLocation(location_id)
                })
                .finally(state.promiseLoadingHelper(LOCATION_LOADING))
        }

        if (loc) {
            // Avoid loading a non-existent location
            state
                .fetch<Location>(`/location/${loc}`.toLocaleLowerCase())
                .then(({ data, response }) => {
                    if (response?.ok && data) {
                        state.setLocation(data.id)
                        return
                    }
                    load_based_on_ip_location()
                })
                .finally(state.promiseLoadingHelper(LOCATION_LOADING))
            return
        }
        load_based_on_ip_location()
    }

    componentDidMount() {
        this.loadLocation()
    }

    componentDidUpdate(prevProps: RoutedProps<any, { loc?: string }>) {
        const prev_loc = prevProps.search.loc
        const current_loc = this.props.search.loc
        if (prev_loc !== current_loc) {
            this.loadLocation()
        }
    }

    render() {
        const {
            search: { loc },
            navigate,
        } = this.props

        const query = loc ? `?loc=${loc}` : ""
        const state: GlobalState = this.context

        const menuProps: IContextualMenuProps = {
            items: [
                {
                    key: "about",
                    text: "About Us",
                    iconProps: { iconName: "Info" },
                    onClick: () => navigate(`/about${query}`),
                },
                {
                    key: "contact",
                    text: "Contact Us",
                    iconProps: { iconName: "Message" },
                    onClick: () => navigate(`/contact${query}`),
                },
            ],
        }

        if (state.user) {
            const logout_item = {
                key: "logout",
                text: "Logout",
                iconProps: { iconName: "Leave" },
                onClick: () => state.logout(),
            }
            if (state.appWidth <= MobileBreakPoint) {
                menuProps.items.push({
                    key: "account",
                    text: "Account",
                    iconProps: { iconName: "Contact" },
                    subMenuProps: {
                        items: [
                            {
                                key: "account-page",
                                text: "Settings",
                                iconProps: { iconName: "Settings" },
                                onClick: () => navigate(`/contribute${query}`),
                            },
                            logout_item,
                        ],
                    },
                })
            } else {
                menuProps.items.push(logout_item)
            }
        }

        if (state.appWidth <= MobileBreakPoint) {
            menuProps.items.unshift({
                key: "contribute",
                text: "Contribute",
                iconProps: { iconName: "CaloriesAdd" },
                onClick: () => navigate(`/contribute${query}`),
            })

            if (state.user === null) {
                menuProps.items.push({
                    key: "user",
                    text: "Login/Sign Up",
                    iconProps: { iconName: "Contact" },
                    onClick: state.toggleAuthView,
                })
            }
        }

        const display_name = (state.user?.displayName || state.user?.email || "User").split(" ")[0]

        return (
            <NavBarContainer>
                <StyleNavBar>
                    <Flex autoGrow>
                        <Link to={`/${query}`}>
                            {state.loading && <Spinner size={SpinnerSize.large} />}
                            {!state.loading && <img className="logo" src="/logo.png" alt="" />}
                        </Link>
                        <Break size={0.5} />
                        <TextField
                            type="search"
                            className="search-box"
                            placeholder="Search for people, promises, institutions..."
                            underlined
                            iconProps={{ iconName: "Search", style: { color: primaryColor, cursor: "pointer" } }}
                            style={{ flexGrow: 1 }}
                        />
                        <Break size={0.5} />
                        <LocationInput minimalView={state.appWidth <= MobileBreakPoint} />
                    </Flex>
                    <Flex align="center" className="menu">
                        <Link to={`/contribute${query}`}>
                            <CommandButton text="Contribute" iconProps={{ iconName: "CaloriesAdd" }} />
                        </Link>
                        {state.user === null && (
                            <CommandButton
                                onClick={state.toggleAuthView}
                                text="Login/Sign Up"
                                iconProps={{ iconName: "Contact" }}
                            />
                        )}
                        {state.user !== null && (
                            <Link to={`/account${query}`}>
                                <Persona size={PersonaSize.size24} text={display_name} imageUrl={state.user.photoURL || ""} />
                            </Link>
                        )}
                    </Flex>
                    <IconButton iconProps={{ iconName: "CollapseMenu" }} menuProps={menuProps} />
                </StyleNavBar>
            </NavBarContainer>
        )
    }
}

export const NavBar = withRouter(RoutedNavBar)

const NavBarContainer = styled.div`
    top: 0;
    position: sticky;
    padding: 1em 0.5em 0;
    margin-bottom: 1em;
    z-index: 1000;
    background-color: #ffffffaa;
    @media (min-width: 1400px) {
        padding-right: calc((100% - 1400px) / 2);
        padding-left: calc((100% - 1400px) / 2);
    }
`

const StyleNavBar = styled.nav`
    height: ${NavBarHeight};
    padding: 0.4em 1em;
    border-radius: 1em;
    box-sizing: border-box;
    background-color: #fafafa;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid ${primaryColor};
    .logo {
        height: 32px;
        width: auto;
    }
    /* Spinner same size as the log */
    .circle-140 {
        height: 32px;
        width: 32px;
        /* border-width: 3px; */
    }
    .search-box {
        width: auto;
        flex-grow: 1;
    }

    .menu {
        a {
            font-size: 1.3em;
        }
    }

    @media (max-width: ${MobileBreakPoint}px) {
        .menu {
            display: none;
        }
    }

    .ms-Persona:hover {
        .ms-Persona-primaryText {
            color: ${primaryColor};
        }
    }
`
