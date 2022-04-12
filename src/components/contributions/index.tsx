import React from "react"
import styled from "styled-components"
import { Break, ConstrainedBody, Flex, FlexColumn } from "components/shared/containers"
import { MobileBreakPoint, primaryColor, TitleFonts } from "data/theme"
import { Icon, PrimaryButton, Text } from "@fluentui/react"
import { GlobalContext, GlobalState } from "data/state"
import { observer } from "mobx-react"
import { RoutedProps, withRouter } from "utils/routing"

interface ContributionsState {
    active_tab: "new_contribution" | "contributions" | string
    contrib_item: string
}

interface ContribItem {
    title: string
    key: string
    description: string
    icon: string
}

function contrib_item(key: string, title: string, description: string, icon: string): ContribItem {
    return { key, title, description, icon }
}

const contrib_items: ContribItem[] = [
    contrib_item(
        "promise",
        "A Promise",
        "A promise made by a leader in representation of self, a company or organization.",
        "assets/promise.svg"
    ),
    contrib_item(
        "event",
        "An Event",
        "An event that happened and is meaningful to certain promises people or organizations.",
        "/assets/event.svg"
    ),
    contrib_item(
        "location",
        "Location Details",
        "A location that we don't have in our database or updated information regarding the location.",
        "/assets/location.svg"
    ),
    contrib_item(
        "person",
        "Person Details",
        "An influential person not in our database or updated information regarding them.",
        "/assets/person.svg"
    ),
    contrib_item(
        "org",
        "Organization Details",
        "An influential organization not in our database or updated information regarding them.",
        "/assets/org.svg"
    ),
    contrib_item(
        "office",
        "Office Details",
        "An office belongs to an organization and is occupied by a person, you can provide information about a new office or an update to an existing one.",
        "/assets/office.svg"
    ),
]

@observer
class RoutedContributions extends React.Component<RoutedProps<any, { loc?: string }>, ContributionsState> {
    static contextType = GlobalContext

    render() {
        const { active_tab = "new_contribution", contrib_item } = this.state || {}
        const {
            navigate,
            search: { loc },
        } = this.props
        const state: GlobalState = this.context
        const showMobile = state.appWidth <= MobileBreakPoint
        const query = loc ? `?loc=${loc}` : ""
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
                            <ContributionOptions>
                                {contrib_items.map((item) => (
                                    <Flex
                                        onClick={() => this.setState({ contrib_item: item.key })}
                                        className={`option ${contrib_item === item.key ? "selected" : ""}`}
                                        key={item.key}
                                        align="center"
                                    >
                                        <Icon
                                            className="radio"
                                            iconName={contrib_item === item.key ? "RadioBtnOn" : "RadioBtnOff"}
                                        />
                                        <img alt="" src={item.icon} />
                                        <FlexColumn autoGrow>
                                            <div className="title">{item.title}</div>
                                            <small>{item.description}</small>
                                        </FlexColumn>
                                    </Flex>
                                ))}
                                <Flex justify="flex-end">
                                    <PrimaryButton
                                        disabled={!contrib_item}
                                        text="Proceed"
                                        onClick={() => navigate(`/contribute/${contrib_item}${query}`)}
                                    />
                                </Flex>
                            </ContributionOptions>
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
                {/* On mobile make sure that we can scroll the button above the chat button */}
                <Break size={5} />
            </StyledContributions>
        )
    }
}

export const Contributions = withRouter<RoutedProps>(RoutedContributions)

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

const ContributionOptions = styled(FlexColumn)`
    .option {
        padding: 1em 0.5em;
        background-color: #ffffff;
        margin: 0.5em 0;
        border: 1px solid #f1f1f1;
        border-radius: 5px;
        font-size: 16px;
        cursor: pointer;
        .radio {
            margin-right: 0.5em;
            font-size: 1.3em;
        }
        img {
            height: 32px;
            width: auto;
            margin-right: 1em;
            fill: ${primaryColor};
        }
        &:hover {
            background-color: 11;
        }
        &.selected {
            border: 1px solid ${primaryColor};
            .radio,
            .title {
                color: ${primaryColor};
            }
        }
    }
`
