import React, { useContext } from "react"
import styled from "styled-components"
import { FlexColumn } from "components/shared/containers"
import { Text } from "@fluentui/react"
import { PromiseStats } from "components/charts/promises"
import { MobileBreakPoint, primaryColor, TitleFonts } from "data/theme"
import { Link } from "react-router-dom"
import { observer } from "mobx-react"
import { GlobalContext } from "data/state"
import { flag_link } from "data/location"
import { LOCATION_LOADING } from "app_constants"

export const UserHome = observer(() => {
    const state = useContext(GlobalContext)
    if (state === null) return null

    let location_name = state.locations?.current.Name || ""
    if (state.isLoading(LOCATION_LOADING)) {
        location_name = "Loading..."
    }
    return (
        <FlexColumn autoGrow centerAt={MobileBreakPoint} justify="flex-start">
            <Banner>
                <img alt="" src={flag_link(state.locations?.current)} />
                {location_name}
            </Banner>

            <PromiseStats data={{ broken: 647, pending: 123, inProgress: 39, delivered: 215 }} height={240} />
            <Text variant="mediumPlus">
                {location_name} has a high rate of <strong>broken promises</strong>. It's our hope that you'll use this
                information to help correct this trend. <Link to="/">See what you can do...</Link>
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
