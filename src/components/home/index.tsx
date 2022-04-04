import React from "react"
import { Break, ConstrainedBody, Flex } from "components/shared/containers"
import { OurHome } from "./our-home"
import { UserHome } from "./user-home"

// style={{ backgroundColor: "#f1f1f1", height: "auto", margin: "0.5em" }}

export class Home extends React.Component {
    render() {
        return (
            <ConstrainedBody maxWidth={1400}>
                <Flex breakAt={900} equal>
                    <OurHome />
                    <Break size={3} />
                    <UserHome />
                </Flex>
            </ConstrainedBody>
        )
    }
}
