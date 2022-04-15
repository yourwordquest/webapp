import React from "react"
import {
    Breadcrumb,
    Checkbox,
    DefaultButton,
    IBreadcrumbItem,
    PrimaryButton,
    TeachingBubble,
    Text,
    TextField,
} from "@fluentui/react"
import { ConstrainedBody, FlexColumn, Flex, Break } from "components/shared/containers"
import { Editor } from "components/shared/input"
import { Contribution, ContributionType, contribution_types, NewObservableContribution } from "data/contributions"
import { Lambda, observe } from "mobx"
import { observer } from "mobx-react"
import styled from "styled-components"
import { RoutedProps, withRouter } from "utils/routing"
import { MobileBreakPoint, primaryColor } from "data/theme"
import { set_observable } from "utils/object"
import { GlobalContext, GlobalState } from "data/state"

interface ContributionState {
    new_contrib_state: "unknown" | "searching" | "new"
    has_change: boolean
    show_submit: boolean
}

@observer
class RoutedContribution extends React.Component<RoutedProps<{ id: string }, { loc?: string }>, ContributionState> {
    static contextType = GlobalContext
    contribution?: Contribution
    dispose_observer?: Lambda
    componentDidMount() {
        const {
            params: { id },
        } = this.props
        const contrib_type = id as any as ContributionType
        if (contribution_types.includes(contrib_type)) {
            this.contribution = NewObservableContribution(contrib_type)
            this.dispose_observer = observe(this.contribution, (change) => {
                this.setState({ has_change: true })
            })
            // Mobx hasn't kicked in yet.
            this.forceUpdate()
        } else {
            // TODO: Load contribution saved in the backend
        }
    }

    componentWillUnmount() {
        if (this.dispose_observer) {
            this.dispose_observer()
        }
    }

    save(submit: boolean) {
        const state: GlobalState = this.context
        if (!state.user) {
            state.toggleAuthView()
            return
        }
    }

    render() {
        if (!this.contribution) {
            return (
                <StyledBody maxWidth={1400}>
                    <Text variant="superLarge">Contribution not found</Text>
                </StyledBody>
            )
        }

        const { has_change, show_submit } = this.state || {}

        const {
            navigate,
            setPrompt,
            search: { loc },
        } = this.props
        const query = loc ? `?loc=${loc}` : ""

        const items: IBreadcrumbItem[] = [
            { text: "Contribute", key: "contribute", onClick: () => navigate(`/contribute${query}`) },
            { text: this.contribution.title, key: "contribution" },
        ]

        if (has_change) {
            setPrompt(`You'll lose changes made to ${this.contribution.title}. Do you want to continue?`)
        }

        return (
            <StyledBody maxWidth={1400}>
                <Breadcrumb items={items} />
                <TextField
                    label="Title"
                    value={this.contribution.title}
                    onChange={(evt, value) => set_observable(this.contribution, "title", value)}
                />
                <small>Helps you and other user's easily identify this contribution</small>
                <Break />
                <FlexColumn>
                    <Break />
                    <Editor
                        description="Add details below"
                        placeholder="type here..."
                        value={this.contribution.details}
                        onChange={(value) => set_observable(this.contribution, "details", value)}
                    />

                    <Break />
                    <Flex justify="flex-end" breakAt={MobileBreakPoint}>
                        <Checkbox label="Show my name when displaying publicly" />
                        <Break />
                        <Checkbox label="You can email me on matters regarding this contribution" />
                    </Flex>
                    <Break />
                    <Flex justify="flex-end">
                        <DefaultButton
                            disabled={!has_change}
                            style={has_change ? { border: `1px solid ${primaryColor}`, color: primaryColor } : undefined}
                            text="Save"
                            onClick={() => this.save(false)}
                        />
                        <Break />
                        <PrimaryButton
                            onClick={() => this.setState({ show_submit: true })}
                            id="submit-contribution"
                            text="Submit"
                        />
                    </Flex>
                    {show_submit && (
                        <TeachingBubble
                            hasCloseButton
                            hasSmallHeadline
                            onDismiss={() => this.setState({ show_submit: false })}
                            target="#submit-contribution"
                            headline="Do your want to submit your contribution for review?"
                            primaryButtonProps={{ text: "Submit", onClick: () => this.save(true) }}
                            secondaryButtonProps={{ text: "Save Draft", onClick: () => this.save(false) }}
                        >
                            Please save a draft if not done editing
                        </TeachingBubble>
                    )}
                    <Break size={5} />
                </FlexColumn>
            </StyledBody>
        )
    }
}

const StyledBody = styled(ConstrainedBody)``

export const ContributionComponent = withRouter<RoutedProps>(RoutedContribution)
