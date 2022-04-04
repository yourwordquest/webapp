import React from "react"
import styled from "styled-components"
import { CommandButton, IconButton, IContextualMenuProps, TextField } from "@fluentui/react"
import { Break, Flex } from "components/shared/containers"
import { NavBarHeight, primaryColor } from "data/theme"
import { Link } from "react-router-dom"
import { observer } from "mobx-react"
import { GlobalContext, GlobalState } from "data/state"

interface NavBarState {
    searchBoxOpen: boolean
    mobileWidth: boolean
}

@observer
export class NavBar extends React.Component<any, NavBarState> {
    static contextType = GlobalContext
    constructor(props: any) {
        super(props)

        this.state = {
            searchBoxOpen: false,
            mobileWidth: false,
        }
    }

    render() {
        const state: GlobalState = this.context

        const menuProps: IContextualMenuProps = {
            items: [
                {
                    key: "about",
                    text: "About Us",
                    iconProps: { iconName: "Info" },
                },
                {
                    key: "contact",
                    text: "Contact Us",
                    iconProps: { iconName: "Message" },
                },
            ],
        }

        if (state.appWidth <= 800) {
            menuProps.items.unshift({
                key: "contribute",
                text: "Contribute",
                iconProps: { iconName: "CaloriesAdd" },
            })

            menuProps.items.push({
                key: "user",
                text: "Login/Sign Up",
                iconProps: { iconName: "Contact" },
            })
        }

        return (
            <NavBarContainer>
                <StyleNavBar>
                    <Flex autoGrow>
                        <Link to="/">
                            <img className="logo" src="/logo.png" alt="" />
                        </Link>
                        <Break />
                        <TextField
                            className="search-box"
                            placeholder="Search for people, promises, institutions..."
                            underlined
                            iconProps={{ iconName: "Search" }}
                            style={{ flexGrow: 1 }}
                        />
                    </Flex>
                    <Flex align="center" className="menu">
                        <CommandButton text="Contribute" iconProps={{ iconName: "CaloriesAdd" }} />
                        <CommandButton text="Login/Sign Up" iconProps={{ iconName: "Contact" }} />
                    </Flex>
                    <IconButton iconProps={{ iconName: "CollapseMenu" }} menuProps={menuProps} />
                </StyleNavBar>
            </NavBarContainer>
        )
    }
}

const NavBarContainer = styled.nav`
    top: 1em;
    position: sticky;
    z-index: 1000;
    @media (min-width: 1400px) {
        padding-right: calc((100% - 1400px) / 2);
        padding-left: calc((100% - 1400px) / 2);
    }
`

const StyleNavBar = styled.nav`
    height: ${NavBarHeight};
    margin: 1em;
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
    .search-box {
        width: 50%;
    }

    .menu {
        a {
            font-size: 1.3em;
        }
    }

    @media (max-width: 800px) {
        .menu {
            display: none;
        }

        .search-box {
            width: auto;
            flex-grow: 1;
        }
    }
`