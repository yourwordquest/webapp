import React from "react"
import styled from "styled-components"
import { FlexColumn, Flex, Break } from "components/shared/containers"
import { primaryColor, TitleFonts, secondaryColor, MobileBreakPoint } from "data/theme"
import { Link } from "react-router-dom"
import { RoutedProps, withRouter } from "utils/routing"

class RoutedHomeInfo extends React.Component<RoutedProps> {
    render() {
        const {
            search: { loc },
        } = this.props
        const query = loc ? `?loc=${loc}` : ""
        return (
            <StyledHomeInfo>
                <details id="quest" open>
                    <SectionTitle>The Quest</SectionTitle>
                    <Break />
                    <Slogan>&ldquo;The quest for accountable leadership of the world&rdquo;</Slogan>

                    <p>
                        We envision a day when quotes from our ancestors will be relevant as reminders rather than motivators;
                        because then we won't be going through the same struggles they went through.
                        <br />
                        We yearn for a world where a politician is held to a higher level of accountability than a bus driver.
                    </p>
                    <Flex breakAt={MobileBreakPoint} equal>
                        <FlexColumn autoGrow as="details">
                            <summary>Scene 1: Tour Van Driver</summary>
                            <ol>
                                <li>Promises to drive you and your family to your dream destination in your van .</li>
                                <li>You hire him.</li>
                                <li>Helps his friend move with your van on the way to your destination.</li>
                                <li>Crushes the van while arguing with other drivers on the road.</li>
                                <li>Asks you to pay for repairs of the van.</li>
                                <li>
                                    While the van is in the repair shop, tells you that time is up and you need to hire him
                                    again so that he can oversee the repairs and drive you to your dream destination
                                </li>
                                <li>You hire him.</li>
                            </ol>
                        </FlexColumn>
                        <FlexColumn autoGrow as="details">
                            <summary>Scene 2: A Politician</summary>
                            <ol>
                                <li>
                                    Promises to increase jobs, build infrastructure and lower the cost of living across the
                                    country.
                                </li>
                                <li>You vote him into office.</li>
                                <li>
                                    Passes tax laws and trade subsidies that favour businesses that he and his friends are
                                    invested in.
                                </li>
                                <li>
                                    The economy and infrastructure crushes because he's undecided and still consulting with
                                    other politicians.
                                </li>
                                <li>He increases taxes to pay for economic recovery</li>
                                <li>
                                    Election time comes and he asks you to vote him in to oversee economic recovery, increase
                                    jobs, build infrastructure and lower the cost of living across the country.
                                </li>
                                <li>You vote him into office.</li>
                            </ol>
                        </FlexColumn>
                    </Flex>
                    <Slogan>
                        &ldquo;I have learned you are never too small to make a difference.&rdquo;&nbsp; - Greta Thunberg
                    </Slogan>
                    <p>
                        You can participate in this quest by using information from this platform to hold your leaders into
                        account and make better decisions when choosing your leaders.
                    </p>
                </details>

                <details id="why">
                    <SectionTitle>The Why?</SectionTitle>
                    <Break />
                    <Slogan>
                        &ldquo;The difference between what we do and what we are capable of doing would suffice to solve most of
                        the world&rsquo;s problems.&rdquo;&nbsp;- Mahatma Gandhi
                    </Slogan>
                    <p>
                        Our leaders make promises to us on a daily basis; promises that should change our lives for the better;
                        and then they go ahead and break those promises. With elections being seasonal, it's hard to keep track
                        the promises broken over the years, and the same leader goes back to the office again in a never ending
                        cycle.
                    </p>
                    <p>
                        The why is; to put a value on the promises that our leaders make to us. A public project management
                        system that can be used to review the performance of our leaders.
                    </p>
                </details>

                <details id="how">
                    <SectionTitle>The How?</SectionTitle>
                    <Break />
                    <Slogan>
                        <Flex>&ldquo;Without community, there is no liberation.&rdquo;&nbsp;- Audre Lorde</Flex>
                    </Slogan>
                    <p>
                        One man's effort cannot see this project through; this is a community driven project where the public
                        provides the data that drives this platform.
                    </p>
                    <p>
                        We've already seen this model work well for{" "}
                        <a href="https://wikipedia.org" target="_blank" rel="noreferrer">
                            Wikipedia
                        </a>
                        ,&nbsp;
                        <a href="https://archive.org" target="_blank" rel="noreferrer">
                            Internet Archive, The Way Back Machine
                        </a>{" "}
                        and not forget all the open source software that we interact with on a daily basis.
                    </p>
                    <p>
                        Any one can contribute by simply visiting the <Link to={`/contribute${query}`}>Contribute</Link>{" "}
                        section. Other contributions can be monetary or time by contributing to our code on{" "}
                        <a href="https://github.com/yourwordquest" target="_blank" rel="noreferrer">
                            github
                        </a>{" "}
                        or by moderating and verifying the content on the platform.{" "}
                        <Link to={`/contact${query}`}>Contact Us</Link> for further details.
                    </p>
                </details>
            </StyledHomeInfo>
        )
    }
}

export const HomeInfo = withRouter<RoutedProps>(RoutedHomeInfo)

const StyledHomeInfo = styled(FlexColumn)`
    details {
        margin: 1em 0;
        background-color: #fafafa;
        padding: 0.5em 1em;
        border-radius: 0.5em;
        p {
            font-size: 1.4em;
            text-align: justify;
            a {
                color: ${secondaryColor};
                font-style: oblique;
                &:hover {
                    border-bottom: 1px dashed ${secondaryColor};
                }
            }
        }
        details {
            background-color: #ffffff;
            margin: 0.5em;
            summary {
                cursor: pointer;
            }
        }
    }
`

const SectionTitle = styled.summary`
    font-size: 1.8em;
    font-family: ${TitleFonts};
    color: ${primaryColor};
    font-style: oblique;
    cursor: pointer;
`

const Slogan = styled.div`
    color: ${secondaryColor};
    font-family: ${TitleFonts};
    font-size: 1.4em;
    font-style: oblique;
`
