import React from "react"
import { Break, Flex, FlexColumn } from "components/shared/containers"
import { ScalableImage } from "components/shared/images"
import { ProgressIndicator, Text } from "@fluentui/react"

export function UserHome() {
    return (
        <FlexColumn autoGrow centerAt={800} justify="flex-start">
            <Flex justify="flex-end" align="center">
                <Text variant="xxLarge">Our Planet</Text>
                <Break />
                <ScalableImage maxHeight={120} minHeight={60} relativeHeight={"10vw"} alt="" src="/assets/Simple_Globe.svg" />
            </Flex>
            <Text variant="xLarge">The only planet we call home, let us make sure that it's under the right hands.</Text>

            <ProgressIndicator label="Known Promises (1078)" percentComplete={1} barHeight={4} />
            <ProgressIndicator label="Delivered (215)" percentComplete={0.2} />
            <ProgressIndicator label="Pending Delivery (162)" percentComplete={0.15} />
            <ProgressIndicator label="Not Deliverable (54)" percentComplete={0.05} />
            <ProgressIndicator label="Broken (647)" percentComplete={0.6} />
        </FlexColumn>
    )
}
