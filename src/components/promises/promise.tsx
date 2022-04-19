import React from "react"
import styled from "styled-components"
import { Break, ConstrainedBody, Flex, FlexColumn } from "components/shared/containers"
import { observer } from "mobx-react"
import { RoutedProps, withRouter } from "utils/routing"
import { MobileBreakPoint, primaryColor, secondaryColor, TitleFonts } from "data/theme"
import { Promise } from "data/promise"
import { GlobalContext, GlobalState } from "data/state"
import { Spinner, SpinnerSize, Text } from "@fluentui/react"
import { Event } from "data/event"
import { Person } from "data/person"
import { Office } from "data/office"
import { Location } from "data/location"
import { Link } from "react-router-dom"

interface Params {
    id: string
}

interface Source {
    DateAdded: string
    Link: string
    SourceType: string
    Title: string
    SourceItemDate: string
}

interface State {
    promise?: Promise
    events: Event[]
    people: Person[]
    offices: Office[]
    sources: Source[]
    locations: Location[]
}

type Props = RoutedProps<Params, { loc?: string }>

const PROMISES_LOADING = "promises-loading"

@observer
class RoutedPromiseComponent extends React.Component<Props, State> {
    static contextType = GlobalContext

    componentDidMount() {
        const {
            params: { id },
        } = this.props
        this.fetchPromiseData(id)
    }

    componentDidUpdate(prev_props: Props) {
        const {
            params: { id },
        } = this.props
        if (prev_props.params.id !== id) {
            this.fetchPromiseData(id)
        }
    }

    fetchPromiseData(promise_id: string) {
        const state: GlobalState = this.context
        state
            .fetch<State>(`/promise/${promise_id}`)
            .then(({ response, data }) => {
                if (data) {
                    this.setState(data)
                } else {
                    this.setState({ promise: undefined })
                }
            })
            .finally(state.promiseLoadingHelper(PROMISES_LOADING))
    }

    render() {
        const { promise, people } = this.state || {}
        const state: GlobalState = this.context
        const promises_loading = state.isLoading(PROMISES_LOADING)
        const on_mobile = state.appWidth <= MobileBreakPoint

        if (!promise || promises_loading) {
            return (
                <ConstrainedBody maxWidth={1400}>
                    <Banner>Promise</Banner>
                    {!promises_loading && <Banner>Promise Not Found</Banner>}
                    {promises_loading && (
                        <FlexColumn align="center">
                            <Spinner size={SpinnerSize.large} />
                            <Text>Fetching promises...</Text>
                        </FlexColumn>
                    )}
                </ConstrainedBody>
            )
        }

        return (
            <ConstrainedBody maxWidth={1400}>
                <Banner>Promise</Banner>
                <Summary>
                    <Flex>{promise.Summary}</Flex>
                    <Flex justify="center">
                        {people.map((person) => (
                            <Link to={`/promises/person/${person.PersonId}`}>-&nbsp;{person.Name}</Link>
                        ))}
                    </Flex>
                </Summary>
                <Flex>
                    <FlexColumn autoGrow justify="center"></FlexColumn>
                </Flex>

                {on_mobile && <Break size={5} />}
            </ConstrainedBody>
        )
    }
}

export const PromiseComponent = withRouter(RoutedPromiseComponent)

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

const Summary = styled.div`
    color: ${secondaryColor};
    font-family: ${TitleFonts};
    font-size: 1.5em;
    font-style: oblique;
    a {
        color: ${secondaryColor};
        &:hover {
            text-decoration: underline;
        }
    }
`
