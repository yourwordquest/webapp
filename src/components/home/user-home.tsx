import React from "react"
import styled from "styled-components"
import { Flex, FlexColumn } from "components/shared/containers"
import { PromiseStats } from "components/charts/promises"
import { MobileBreakPoint, primaryColor, TitleFonts } from "data/theme"
import { Link } from "react-router-dom"
import { observer } from "mobx-react"
import { GlobalContext, GlobalState } from "data/state"
import { flag_link } from "data/location"
import { LOCATION_LOADING } from "app_constants"
import { OutlinedPrimaryButton } from "components/shared/input"
import { Lambda, observe } from "mobx"
import { Promises, PromisesRequest } from "data/promise"
import { Spinner, SpinnerSize, Text } from "@fluentui/react"

interface UserHomeState {
    promises?: Promises
}

@observer
export class UserHome extends React.Component<any, UserHomeState> {
    static contextType = GlobalContext
    unsubscribe?: Lambda
    promises?: Promises

    componentDidMount() {
        this.loadPromises()
        const state: GlobalState = this.context
        this.unsubscribe = observe(state, "locations", (change) => {
            // Load promises for the new location
            this.loadPromises()
        })
    }

    loadPromises() {
        const state: GlobalState = this.context
        const location_id = state.locations?.current.id
        if (!location_id) {
            this.setState({ promises: undefined })
            return
        }

        state
            .fetch<PromisesRequest>(`/promises/location/${location_id}`, { toastError: true })
            .then(({ data }) => {
                if (!data) {
                    this.setState({ promises: undefined })
                    return
                }
                const promises = new Promises(data, ["children"])
                this.setState({ promises })
            })
            .finally(state.promiseLoadingHelper("loading-home-promises"))
    }

    componentWillUnmount() {
        if (this.unsubscribe) this.unsubscribe()
    }

    render() {
        const state: GlobalState = this.context

        let location_name = state.locations?.current.name || ""
        const location_loading = state.isLoading(LOCATION_LOADING)
        if (location_loading) {
            location_name = "Loading..."
        }

        const { promises } = this.state || {}

        const promises_loading = state.isLoading("loading-home-promises") || location_loading

        return (
            <FlexColumn autoGrow centerAt={MobileBreakPoint} justify="flex-start">
                <Banner>
                    <img alt="" src={flag_link(state.locations?.current)} />
                    {location_name}
                </Banner>

                {promises && <PromiseStats data={promises.aggregated_promises} height={240} />}

                {promises_loading && (
                    <FlexColumn align="center">
                        <Spinner size={SpinnerSize.large} />
                        <Text>Fetching promises...</Text>
                    </FlexColumn>
                )}

                {!promises_loading && (
                    <Flex justify={state.appWidth <= MobileBreakPoint ? "center" : "flex-end"}>
                        <Link to={`/location/${state.locations?.current.id}`}>
                            <OutlinedPrimaryButton>
                                Show promises for <strong>{location_name}</strong> in detail
                            </OutlinedPrimaryButton>
                        </Link>
                    </Flex>
                )}
            </FlexColumn>
        )
    }
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
