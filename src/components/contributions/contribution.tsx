import { Breadcrumb, IBreadcrumbItem, Text, TextField } from "@fluentui/react"
import { ConstrainedBody, FlexColumn, Flex } from "components/shared/containers"
import { Editor } from "components/shared/input"
import { Contribution, ContributionType, contribution_types, NewObservableContribution } from "data/contributions"
import { observer } from "mobx-react"
import React from "react"
import styled from "styled-components"
import { RoutedProps, withRouter } from "utils/routing"

interface ContributionState {
    new_contrib_state: "unknown" | "searching" | "new"
}

@observer
class RoutedContribution extends React.Component<RoutedProps<{ id: string }, { loc?: string }>, ContributionState> {
    contribution?: Contribution
    componentDidMount() {
        const {
            params: { id },
        } = this.props
        const contrib_type = id as any as ContributionType
        if (contribution_types.includes(contrib_type)) {
            this.contribution = NewObservableContribution(contrib_type)
            // Mobx hasn't kicked in yet.
            this.forceUpdate()
        } else {
            // TODO: Load contribution saved in the backend
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

        const {
            navigate,
            search: { loc },
        } = this.props
        const query = loc ? `?loc=${loc}` : ""

        const items: IBreadcrumbItem[] = [
            { text: "Contribute", key: "contribute", onClick: () => navigate(`/contribute${query}`) },
            { text: this.contribution.title, key: "contribution" },
        ]

        return (
            <StyledBody maxWidth={1400}>
                <Breadcrumb items={items} />
                <FlexColumn>
                    <Flex className="dual-input">
                        <TextField label="Title" />
                    </Flex>
                    <Editor label="Notes" value={this.contribution.notes} placeholder="Write your notes here..." />
                </FlexColumn>
            </StyledBody>
        )
    }
}

const StyledBody = styled(ConstrainedBody)``

export const ContributionComponent = withRouter<RoutedProps>(RoutedContribution)
