import React from "react"
import { Breadcrumb, DefaultButton, IBreadcrumbItem, PrimaryButton, Text, TextField } from "@fluentui/react"
import { ConstrainedBody, FlexColumn, Flex, Break } from "components/shared/containers"
import { Editor } from "components/shared/input"
import { Contribution, ContributionType, contribution_types, NewObservableContribution } from "data/contributions"
import { Lambda, observe } from "mobx"
import { observer } from "mobx-react"
import styled from "styled-components"
import { RoutedProps, withRouter } from "utils/routing"
import { EventContribution } from "./event"
import { Event } from "data/event"
import { LocationContribution } from "./location"
import { Location } from "data/location"
import { OfficeContribution } from "./office"
import { Office } from "data/office"
import { OrganizationContribution } from "./organization"
import { Organization } from "data/organization"
import { PersonContribution } from "./person"
import { Person } from "data/person"
import { PromiseContribution } from "./promise"
import { Promise } from "data/promise"
import { primaryColor } from "data/theme"
import { set_observable } from "utils/object"

interface ContributionState {
    new_contrib_state: "unknown" | "searching" | "new"
    has_change: boolean
}

@observer
class RoutedContribution extends React.Component<RoutedProps<{ id: string }, { loc?: string }>, ContributionState> {
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

    render() {
        if (!this.contribution) {
            return (
                <StyledBody maxWidth={1400}>
                    <Text variant="superLarge">Contribution not found</Text>
                </StyledBody>
            )
        }

        const { has_change } = this.state || {}

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

                <FlexColumn>
                    <Flex className="dual-input">
                        <TextField
                            label="Subject"
                            value={this.contribution.title}
                            onChange={(evt) => set_observable(this.contribution, "title", evt.currentTarget.value)}
                        />
                    </Flex>

                    {this.contribution.type === "event" && <EventContribution event={this.contribution.details as Event} />}
                    {this.contribution.type === "location" && (
                        <LocationContribution location={this.contribution.details as Location} />
                    )}
                    {this.contribution.type === "office" && <OfficeContribution office={this.contribution.details as Office} />}
                    {this.contribution.type === "org" && (
                        <OrganizationContribution organization={this.contribution.details as Organization} />
                    )}
                    {this.contribution.type === "person" && <PersonContribution person={this.contribution.details as Person} />}
                    {this.contribution.type === "promise" && (
                        <PromiseContribution promise={this.contribution.details as Promise} />
                    )}
                    <Editor label="Notes" value={this.contribution.notes} placeholder="Write your notes here..." />
                    <Break />
                    <Flex justify="flex-end">
                        <DefaultButton
                            disabled={!has_change}
                            style={has_change ? { border: `1px solid ${primaryColor}`, color: primaryColor } : undefined}
                            text="Save"
                        />
                        <Break />
                        <PrimaryButton text="Submit" />
                    </Flex>
                </FlexColumn>
            </StyledBody>
        )
    }
}

const StyledBody = styled(ConstrainedBody)``

export const ContributionComponent = withRouter<RoutedProps>(RoutedContribution)
