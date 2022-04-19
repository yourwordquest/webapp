import React from "react"
import styled from "styled-components"
import { Break, ConstrainedBody, Flex, FlexColumn } from "components/shared/containers"
import { observer } from "mobx-react"
import { RoutedProps, withRouter } from "utils/routing"
import { MobileBreakPoint, primaryColor, TitleFonts } from "data/theme"
import { Promises, PromisesRequest } from "data/promise"
import { GlobalContext, GlobalState } from "data/state"
import { Spinner, SpinnerSize, Text } from "@fluentui/react"
import { PromiseStats } from "components/charts/promises"
import { PromisesKanban } from "./kanban"

interface Params {
    type: "location" | "person" | "office" | "organization"
    id: string
}

interface State {
    promises?: Promises
    title?: string
    description?: string
}

type Props = RoutedProps<Params, { loc?: string }>

const PROMISES_LOADING = "promises-loading"

@observer
class RoutedPromisesView extends React.Component<Props, State> {
    static contextType = GlobalContext
    componentDidMount() {
        this.loadData()
    }

    componentDidUpdate(prevProps: Props) {
        if (prevProps.params.id !== this.props.params.id || prevProps.params.type !== this.props.params.type) {
            this.loadData()
        }
    }

    loadData() {
        const {
            params: { type, id },
        } = this.props

        const state: GlobalState = this.context
        state
            .fetch<PromisesRequest>(`/promises/${type}/${id}`, { toastError: true })
            .then(({ data }) => {
                if (!data) {
                    this.setState({ promises: undefined })
                    return
                }
                let include: string[] = []
                if (type === "location") {
                    include = ["children"]
                }
                const promises = new Promises(data, include)
                this.setState({ promises, title: data.title, description: data.title })
            })
            .finally(state.promiseLoadingHelper(PROMISES_LOADING))
    }

    render() {
        const { promises, title = "loading...", description = "" } = this.state || {}
        const state: GlobalState = this.context
        const promises_loading = state.isLoading(PROMISES_LOADING)
        const on_mobile = state.appWidth <= MobileBreakPoint
        return (
            <ConstrainedBody maxWidth={1400}>
                <Banner>{title}</Banner>
                <Text variant="mediumPlus">{description}</Text>
                <Flex>
                    <FlexColumn autoGrow justify="flex-start">
                        {promises_loading && (
                            <FlexColumn align="center">
                                <Spinner size={SpinnerSize.large} />
                                <Text>Fetching promises...</Text>
                            </FlexColumn>
                        )}
                        {promises && <PromiseStats data={promises.aggregated_promises} height={240} />}
                        {promises && <PromisesKanban promises={promises} />}
                    </FlexColumn>
                </Flex>
                {on_mobile && <Break size={5} />}
            </ConstrainedBody>
        )
    }
}

export const PromiseView = withRouter(RoutedPromisesView)

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
