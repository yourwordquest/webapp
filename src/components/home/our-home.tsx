import React from "react"
import { Break, FlexColumn, Flex } from "components/shared/containers"
import { observer } from "mobx-react"
import styled from "styled-components"
import { MobileBreakPoint, primaryColor, secondaryColor, TitleFonts } from "data/theme"

export const OurHome = observer(() => {
    return (
        <FlexColumn autoGrow centerAt={MobileBreakPoint}>
            <Banner>
                <img alt="" src="/icon.svg" />
                <span>YourWord.Quest</span>
            </Banner>

            <Slogan>
                <Flex>&ldquo;We must accept finite disappointment, but never lose infinite hope.&rdquo;</Flex>
                <Flex justify="center"> - Dr. Martin Luther King Jr</Flex>
            </Slogan>
            <Break size={1} />

            <Content>
                We want to rekindle hope for a better future in a world full of broken promises by ensuring that:
                <ul>
                    <li>Promises aren't forgotten in the shuffle of daily news cycles.</li>
                    <li>
                        Promises can be linked to their original source, the time they were made, and when they were/will be
                        delivered.
                    </li>
                    <li>
                        We provide the public with actionable information that can aid in the election of new leaders and hold
                        current leaders accountable.
                    </li>
                </ul>
            </Content>
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
    user-select: none;
    img {
        margin-right: 5px;
        height: 40px;
    }
`

const Slogan = styled.div`
    color: ${secondaryColor};
    font-family: ${TitleFonts};
    font-size: 1.5em;
    font-style: oblique;
`

const Content = styled.div`
    font-size: 1.4em;
    font-family: ${TitleFonts};
    text-align: justify;
    li {
        font-style: oblique;
        text-align: left;
    }
`
