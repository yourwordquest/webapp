import React from "react"
import { Break, ConstrainedBody, Flex } from "components/shared/containers"
import { OurHome } from "./our-home"
import { UserHome } from "./user-home"
import { Label, Pivot, PivotItem } from "@fluentui/react"

export function Home() {
    return (
        <ConstrainedBody maxWidth={1400}>
            <Flex style={{ padding: "1em 0.5em" }} breakAt={800} equal>
                <OurHome />
                <Break size={0.3} style={{ backgroundColor: "#f1f1f1", height: "auto", margin: "0.5em" }} />
                <UserHome />
            </Flex>
            <Pivot>
                <PivotItem headerText="Promise Feed">
                    <Label>A list of promises made recently to the currently selected entity.</Label>
                </PivotItem>
                <PivotItem headerText="Institutions">
                    <Label>Institutions relating to the currently selected entity.</Label>
                </PivotItem>
                <PivotItem headerText="Subdivisions">
                    <Label>Sub Divisions of the current entity if applicable.</Label>
                </PivotItem>
            </Pivot>
        </ConstrainedBody>
    )
}
