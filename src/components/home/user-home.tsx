import React from "react"
import { Break, Flex, FlexColumn } from "components/shared/containers"
import { ScalableImage } from "components/shared/images"
import { Text } from "@fluentui/react"
import { PromiseStats } from "components/charts/promises"

export function UserHome() {
    return (
        <FlexColumn autoGrow centerAt={800} justify="flex-start">
            <Flex justify="flex-end" align="center">
                <Text variant="xxLarge">Our Planet</Text>
                <Break />
                <ScalableImage maxHeight={120} minHeight={60} relativeHeight={"10vw"} alt="" src="/assets/Simple_Globe.svg" />
            </Flex>
            <Text variant="large">The only planet we call home, let us make sure that it's under the right hands.</Text>

            <PromiseStats data={{ broken: 647, pending: 123, inProgress: 39, delivered: 215 }} height={240} />
        </FlexColumn>
    )
}
