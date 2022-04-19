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
        const { promise, people, offices, locations, events, sources } = this.state || {}
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
                <Banner style={{ textAlign: "center" }}>Promise</Banner>
                <Summary>
                    <Flex justify="center" style={{ textAlign: "center" }}>
                        {promise.Summary}
                    </Flex>
                    <Break />
                    <Flex justify="center">
                        {people.map((person) => (
                            <Link key={person.PersonId} to={`/promises/person/${person.PersonId}`}>
                                -&nbsp;{person.Name}
                            </Link>
                        ))}
                    </Flex>
                    <Flex justify="center">
                        {offices.map((office) => (
                            <Link key={office.OfficeId} to={`/promises/office/${office.OfficeId}`}>
                                -&nbsp;{office.Name}
                            </Link>
                        ))}
                    </Flex>

                    <FlexColumn align="center">
                        <span>to</span>
                        {locations.map((loc) => (
                            <Link key={loc.id} to={`/promises/location/${loc.id}`}>
                                -&nbsp;{loc.name}
                            </Link>
                        ))}
                    </FlexColumn>
                </Summary>

                {Boolean(sources.length) && (
                    <ItemsBox>
                        <Title>Sources</Title>
                        {sources.map((source) => (
                            <Item>
                                <a href={source.Link} target="_blank" rel="noreferrer">
                                    {source.Title}
                                </a>
                                <Break size={0.5} />
                                <Flex>
                                    <label>{source.SourceType}</label>
                                    <Break />
                                    <label>{source.SourceItemDate}</label>
                                </Flex>
                            </Item>
                        ))}
                    </ItemsBox>
                )}

                {Boolean(events.length) && (
                    <ItemsBox>
                        <Title>Events</Title>
                        {events.map((event) => (
                            <Item>
                                <Text>{event.Name}</Text>
                                <Break size={0.5} />
                                <Flex>
                                    <label>From {event.StartDate}</label>
                                    <Break />
                                    <label>To {event.EndDate}</label>
                                </Flex>
                            </Item>
                        ))}
                    </ItemsBox>
                )}

                {on_mobile && <Break size={5} />}
            </ConstrainedBody>
        )
    }
}

export const PromiseComponent = withRouter(RoutedPromiseComponent)

const ItemsBox = styled(FlexColumn)`
    background-color: #f1f1f1;
    padding: 1em;
    margin: 1em 0;
    border-radius: 0.6em;
`

const Title = styled.div`
    font-size: 1.5em;
`

const Item = styled.div`
    background-color: #ffffff;
    padding: 0.5em;
    margin: 0.5em 0;
    border-radius: 0.4em;
    label {
        color: #777777;
    }
`

const Banner = styled.div`
    display: flex;
    color: ${primaryColor};
    font-family: ${TitleFonts};
    font-size: 2em;
    font-style: oblique;
    align-items: center;
    margin-bottom: 16px;
    justify-content: center;
    img {
        margin-right: 5px;
        height: 40px;
    }
`

const Summary = styled(FlexColumn)`
    color: ${secondaryColor};
    font-family: ${TitleFonts};
    font-size: 1.5em;
    font-style: oblique;
    a {
        color: ${secondaryColor};
        font-size: 0.8em;
        &:hover {
            text-decoration: underline;
        }
    }
`
