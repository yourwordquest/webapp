import React from "react"
import styled from "styled-components"
import { Break, ConstrainedBody, Flex, FlexColumn } from "components/shared/containers"
import { MobileBreakPoint, primaryColor, TitleFonts } from "data/theme"
import { PrimaryButton, Text } from "@fluentui/react"
import { GlobalContext, GlobalState } from "data/state"
import { observer } from "mobx-react"

interface ContributionsState {
    active_tab: "new_contribution" | "contributions" | string
}

@observer
export class Contributions extends React.Component<any, ContributionsState> {
    static contextType = GlobalContext

    render() {
        const { active_tab = "new_contribution" } = this.state || {}
        const state: GlobalState = this.context
        const showMobile = state.appWidth <= MobileBreakPoint
        return (
            <StyledContributions maxWidth={1400}>
                {showMobile && (
                    <Tabs equal>
                        <Flex
                            onClick={() => this.setState({ active_tab: "new_contribution" })}
                            autoGrow
                            className={`tab ${active_tab === "new_contribution" ? "active" : ""}`}
                        >
                            Contribute
                        </Flex>
                        <Flex
                            onClick={() => this.setState({ active_tab: "contributions" })}
                            autoGrow
                            className={`tab ${active_tab === "contributions" ? "active" : ""}`}
                        >
                            My Contributions
                        </Flex>
                    </Tabs>
                )}
                <Flex equal>
                    {Boolean(!showMobile || active_tab === "new_contribution") && (
                        <FlexColumn className="section" autoGrow>
                            <Intro>Hello, what would you like to contribute today?</Intro>
                        </FlexColumn>
                    )}

                    {Boolean(!showMobile || active_tab === "contributions") && (
                        <FlexColumn className="section" autoGrow>
                            {!showMobile && (
                                <Text style={{ textAlign: "center" }} variant="xxLarge">
                                    My Contributions
                                </Text>
                            )}
                            {state.user === null && (
                                <>
                                    <Break />
                                    <Text style={{ textAlign: "center" }} variant="large">
                                        You must be logged in to view your contributions.
                                    </Text>
                                    <Break />
                                    <Flex justify="center" onClick={state.toggleAuthView}>
                                        <PrimaryButton text="Go to login" />
                                    </Flex>
                                    <Break />
                                </>
                            )}
                        </FlexColumn>
                    )}
                </Flex>
            </StyledContributions>
        )
    }
}

const Intro = styled.div`
    font-size: 1.5em;
    font-style: oblique;
    font-family: ${TitleFonts};
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
    margin-bottom: 1em;
`

const StyledContributions = styled(ConstrainedBody)`
    @media (min-width: ${MobileBreakPoint}px) {
        .section {
            background-color: #fafafa;
            margin: 0.5em;
            padding: 0.5em;
        }
    }
`
