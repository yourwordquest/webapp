import React, { useContext } from "react"
import { Promise, PromiseByItem, Promises } from "data/promise"
import { observer } from "mobx-react"
import styled from "styled-components"
import { Flex, FlexColumn, FlexProps } from "components/shared/containers"
import { MobileBreakPoint, primaryColor, promiseColors } from "data/theme"
import { GlobalContext } from "data/state"
import { Link } from "react-router-dom"
import { Persona, PersonaSize, Text } from "@fluentui/react"

export const PromisesKanban = observer((props: { promises: Promises }) => {
    const { tentative, promised, in_progress, delivered, broken } = props.promises.grouped_promises
    const state = useContext(GlobalContext)
    const is_narrow = (state?.appWidth || 1) <= MobileBreakPoint
    const query = state?.locations ? `?loc=${state.locations.current.id}` : ""
    return (
        <StyledContainer>
            <Flex equal breakAt={MobileBreakPoint}>
                <Column as={is_narrow ? "details" : "div"} color={primaryColor} open>
                    <Header as={is_narrow ? "summary" : "div"}>
                        <strong>{tentative.length}&nbsp;</strong>Might Be
                    </Header>
                    <Content>
                        {tentative.map((p) => (
                            <PromiseView
                                key={p.PromiseId}
                                promise={p}
                                promise_by={props.promises.promise_by_map[p.PromiseId]}
                                query={query}
                            />
                        ))}
                        <EmptyMessage query={query} has_data={Boolean(tentative.length)} />
                    </Content>
                </Column>
                <Column as={is_narrow ? "details" : "div"} color={promiseColors.pending} open>
                    <Header as={is_narrow ? "summary" : "div"}>
                        <strong>{promised.length}&nbsp;</strong>Promised
                    </Header>
                    <Content>
                        {promised.map((p) => (
                            <PromiseView
                                key={p.PromiseId}
                                promise={p}
                                promise_by={props.promises.promise_by_map[p.PromiseId]}
                                query={query}
                            />
                        ))}
                        <EmptyMessage query={query} has_data={Boolean(promised.length)} />
                    </Content>
                </Column>
                <Column as={is_narrow ? "details" : "div"} color={promiseColors.inProgress} open>
                    <Header as={is_narrow ? "summary" : "div"}>
                        <strong>{in_progress.length}&nbsp;</strong>In Progress
                    </Header>
                    <Content>
                        {in_progress.map((p) => (
                            <PromiseView
                                key={p.PromiseId}
                                promise={p}
                                promise_by={props.promises.promise_by_map[p.PromiseId]}
                                query={query}
                            />
                        ))}
                        <EmptyMessage query={query} has_data={Boolean(in_progress.length)} />
                    </Content>
                </Column>
                <Column as={is_narrow ? "details" : "div"} color={promiseColors.delivered} open>
                    <Header as={is_narrow ? "summary" : "div"}>
                        <strong>{delivered.length}&nbsp;</strong>Delivered
                    </Header>
                    <Content>
                        {delivered.map((p) => (
                            <PromiseView
                                key={p.PromiseId}
                                promise={p}
                                promise_by={props.promises.promise_by_map[p.PromiseId]}
                                query={query}
                            />
                        ))}
                        <EmptyMessage query={query} has_data={Boolean(delivered.length)} />
                    </Content>
                </Column>
                <Column as={is_narrow ? "details" : "div"} color={promiseColors.broken} open>
                    <Header as={is_narrow ? "summary" : "div"}>
                        <strong>{broken.length}&nbsp;</strong>Broken
                    </Header>
                    <Content>
                        {broken.map((p) => (
                            <PromiseView
                                key={p.PromiseId}
                                promise={p}
                                promise_by={props.promises.promise_by_map[p.PromiseId]}
                                query={query}
                            />
                        ))}
                        <EmptyMessage query={query} has_data={Boolean(broken.length)} />
                    </Content>
                </Column>
            </Flex>
        </StyledContainer>
    )
})

const StyledContainer = styled.div``

const Header = styled.div`
    padding: 0.5em 1em;
    color: #ffffff;
    font-size: 1.2em;
    position: sticky;
    top: 4em;
    z-index: 100;
    &summary {
        padding: 1em 1.5em;
    }
`

const Content = styled(FlexColumn)``

function EmptyMessage({ has_data, query }: { has_data: boolean; query: string }) {
    return (
        <StyledEmptyMessage justify={has_data ? "center" : "space-between"}>
            {!has_data && <Text>No Promises found</Text>}
            <Link to={`/contribute/promise${query}`}>Add a promise</Link>
        </StyledEmptyMessage>
    )
}

const StyledEmptyMessage = styled(Flex)`
    background-color: #ffffff55;
    padding: 0.5em 0.8em;
    margin: 0.2em 0.3em;
    border-radius: 0.5em;
`

interface ColumnProps extends FlexProps {
    color: string
}

function PromiseView({ promise, promise_by, query }: { promise: Promise; promise_by: PromiseByItem[]; query: string }) {
    return (
        <StyledPromise as={Link} to={`/promise/${promise.PromiseId}${query}`}>
            <div className="summary" title={promise.Summary}>
                {promise.Summary}
            </div>
            <div className="people">
                {promise_by?.map((pb) => (
                    <Link key={pb.id} to={`/promises/${pb.type}/${pb.id}${query}`}>
                        <Persona text={pb.name} size={PersonaSize.size8} />
                    </Link>
                ))}
            </div>
        </StyledPromise>
    )
}

const StyledPromise = styled(FlexColumn)`
    background-color: #ffffffee;
    margin: 0.2em 0.3em;
    cursor: pointer;
    color: #444444;

    .summary {
        display: block;
        display: -webkit-box;
        overflow: hidden;
        line-clamp: 3;
        text-overflow: ellipsis;
        box-orient: vertical;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        margin: 0.5em 0.8em;
    }

    &:hover {
        transition: all 1s;
        /* background-color: #ffffff; */
        color: #000000;
    }

    .people {
        padding: 0.5em 0.8em;
        /* border-radius: 0.5em; */
        background-color: #ffffff;
    }
`

const Column = styled(FlexColumn)<ColumnProps>`
    flex-grow: 1;
    flex-basis: 0;
    background-color: ${(p) => p.color}44;
    padding-bottom: 1em;
    ${Header} {
        background-color: ${(p) => p.color};
    }
    &details {
        margin: 0.25em;
    }

    ${StyledPromise} {
        border: 1px solid #ffffff;
        &:hover {
            border: 1px solid ${(p) => p.color};
            color: ${(p) => p.color};
        }
        .people:hover {
            .ms-Persona-primaryText {
                color: ${(p) => p.color};
            }
        }
    }
`
