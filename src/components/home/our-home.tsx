import React from "react"
import { Break, FlexColumn } from "components/shared/containers"
import { Text } from "@fluentui/react"
import { observer } from "mobx-react"
import styled from "styled-components"
import { primaryColor, TitleFonts } from "data/theme"

export const OurHome = observer(() => {
    return (
        <FlexColumn autoGrow centerAt={800}>
            <Banner>
                <img alt="" src="/icon.svg" />
                <span>YourWord.Quest</span>
            </Banner>

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
})

const Banner = styled.div`
    display: flex;
    color: ${primaryColor};
    font-family: ${TitleFonts};
    font-size: 2em;
    font-style: oblique;
    align-items: center;
    margin-bottom: 16px;
    img {
        margin-right: 5px;
        height: 40px;
    }
`
