import React from "react"
import styled from "styled-components"
import { FlexColumn } from "components/shared/containers"
import { Text } from "@fluentui/react"
import { PromiseStats } from "components/charts/promises"
import { primaryColor, TitleFonts } from "data/theme"
import { Link } from "react-router-dom"

export function UserHome() {
    return (
        <FlexColumn autoGrow centerAt={800} justify="flex-start">
            <Banner>
                <img alt="" src="/assets/Simple_Globe.svg" />
                The World
            </Banner>

            <PromiseStats data={{ broken: 647, pending: 123, inProgress: 39, delivered: 215 }} height={240} />
            <Text variant="mediumPlus">
                The World has a high rate of <strong>broken promises</strong>. It's our hope that you'll use this information to
                help correct this trend. <Link to="/">See what you can do...</Link>
            </Text>
        </FlexColumn>
    )
}

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
