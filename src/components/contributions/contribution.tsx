import { Text } from "@fluentui/react"
import { ConstrainedBody } from "components/shared/containers"
import React from "react"
import styled from "styled-components"
import { RoutedProps, withRouter } from "utils/routing"

class RoutedContribution extends React.Component<RoutedProps<{ id: string }>> {
    render() {
        return (
            <StyledBody maxWidth={1400}>
                <Text>New Promise</Text>
            </StyledBody>
        )
    }
}

const StyledBody = styled(ConstrainedBody)``

export const Contribution = withRouter<RoutedProps>(RoutedContribution)
