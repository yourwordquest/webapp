import React from "react"
import { Break, Flex, FlexColumn } from "components/shared/containers"
import { Text } from "@fluentui/react"
import { ScalableImage } from "components/shared/images"

export function OurHome() {
    return (
        <FlexColumn autoGrow centerAt={800}>
            <Flex justify="flex-start" align="center">
                <ScalableImage maxHeight={120} minHeight={60} relativeHeight={"10vw"} alt="" src="/icon.svg" />
                <Break />
                <FlexColumn autoGrow>
                    <Text variant="superLarge">YourWord.quest</Text>
                    <Text variant="xLarge">In quest for accountability for you; that's our promise to you</Text>
                </FlexColumn>
            </Flex>

            <Text variant="xLarge">We track promises made to humans by humans; for the sake of humanity.</Text>
            <Break size={0.5} />

            <Text style={{ textAlign: "justify" }} variant="mediumPlus">
                We live in a world where our leaders from local to world leaders say one thing and then go ahead and do another.
                This is especially common during campaign seasons when promises are made, forgotten then we repeat the same
                cycle again the next season.
            </Text>
            <Break size={0.5} />
            <Text style={{ textAlign: "justify" }} variant="mediumPlus">
                We aim to provide information to you in a more structured way, who made a promise, when and did they keep it?
                &nbsp;<a href="/about">Read all about our mission</a>&nbsp; or jump right in and see how promises that concern
                you are performing.
            </Text>
        </FlexColumn>
    )
}
