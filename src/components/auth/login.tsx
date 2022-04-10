import {
    CommandButton,
    DefaultButton,
    Dialog,
    DialogType,
    IDialogContentProps,
    PrimaryButton,
    TextField,
} from "@fluentui/react"
import { Break, Flex, FlexColumn } from "components/shared/containers"
import { GlobalContext, GlobalState } from "data/state"
import { primaryColor, secondaryColor, TextFonts } from "data/theme"
import { observer } from "mobx-react"
import React from "react"
import styled from "styled-components"

interface AuthContainerState {
    view: "login" | "register"
}

@observer
export class AuthContainer extends React.Component<any, AuthContainerState> {
    static contextType = GlobalContext
    render() {
        const state: GlobalState = this.context
        const smallView = state.appWidth <= 600
        const { view = "login" } = this.state || {}

        const dialog_content_props: IDialogContentProps = {
            type: DialogType.largeHeader,
            title: <Title>Authentication</Title>,
        }

        const isRegister = view === "register"

        return (
            <Dialog
                hidden={!state.authShowing}
                onDismiss={state.toggleAuthView}
                dialogContentProps={dialog_content_props}
                modalProps={{ isBlocking: true }}
                minWidth={smallView ? "90vw" : "500px"}
            >
                <FlexColumn as="form" onSubmit={(evt: React.FormEvent) => evt.preventDefault()}>
                    <ProviderButton>
                        <img alt="" src="assets/github_logo.png" />
                        Authenticate With Github
                    </ProviderButton>
                    <ProviderButton>
                        <img alt="" src="assets/google_logo.png" />
                        Authenticate With Google
                    </ProviderButton>
                    <Break />
                    <Flex justify="center" as="strong">
                        Or
                    </Flex>
                    <Break />
                    <Tabs equal>
                        <Flex
                            onClick={() => this.setState({ view: "login" })}
                            autoGrow
                            className={`tab ${view === "login" ? "active" : ""}`}
                        >
                            Login
                        </Flex>
                        <Flex
                            onClick={() => this.setState({ view: "register" })}
                            autoGrow
                            className={`tab ${view === "register" ? "active" : ""}`}
                        >
                            Sign Up
                        </Flex>
                    </Tabs>
                    <Break />
                    {isRegister && <TextField label="Name" required />}
                    <TextField label="Email Address" required type="email" />
                    <TextField label="Password" type="password" required canRevealPassword />
                    {isRegister && <TextField label="Confirm Password" required type="password" />}
                    <Break />
                    <Flex justify="space-between">
                        <DefaultButton onClick={state.toggleAuthView} text="Close" />
                        <PrimaryButton text={isRegister ? "Sign Up" : "Login"} type="submit" />
                    </Flex>
                    {!isRegister && (
                        <Flex justify="flex-end">
                            <CommandButton>Forgot Password?</CommandButton>
                        </Flex>
                    )}
                </FlexColumn>
                <Break />
            </Dialog>
        )
    }
}

const ProviderButton = styled.div`
    display: flex;
    align-items: center;
    margin: 0.3em 0;
    padding: 0.5em 1em;
    border: 1px solid #000000;
    cursor: pointer;
    user-select: none;
    background-color: #ffffff;
    img {
        height: 18px;
        width: auto;
        margin-right: 0.5em;
    }
    &:hover {
        background-color: ${primaryColor}11;
    }
`

const Title = styled.div`
    font-size: 1.4em;
    font-family: ${TextFonts};
    color: ${secondaryColor};
`

const Tabs = styled(Flex)`
    .tab {
        padding: 0.8em 1em 0.4em;
        cursor: pointer;
        &:hover {
            color: ${primaryColor};
        }
    }
    .active {
        color: ${primaryColor};
        background-color: ${primaryColor}11;
    }
    border-bottom: 2px solid ${primaryColor};
`
