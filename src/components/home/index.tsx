import React from "react"
import { Break, ConstrainedBody, Flex, FlexColumn } from "components/shared/containers"
import { OurHome } from "./our-home"
import { UserHome } from "./user-home"
import { GlobalContext, GlobalState } from "data/state"
import { observer } from "mobx-react"
import { MobileBreakPoint } from "data/theme"
import { Pivot, PivotItem } from "@fluentui/react"

interface HomeState {
    activeMobileView: "explore" | "learn" | string
}

@observer
export class Home extends React.Component<any, HomeState> {
    static contextType = GlobalContext

    constructor(props: any) {
        super(props)
        this.state = {
            activeMobileView: "explore",
        }
    }
    render() {
        const { activeMobileView } = this.state
        const state: GlobalState = this.context
        const showMobile = state.appWidth <= MobileBreakPoint
        return (
            <ConstrainedBody maxWidth={1400}>
                <Flex breakAt={MobileBreakPoint} equal>
                    <OurHome />
                    {!showMobile && <Break size={3} />}
                    {!showMobile && <UserHome />}
                </Flex>
                {showMobile && (
                    <FlexColumn align="center">
                        <Break size={1} />
                        <Pivot
                            selectedKey={activeMobileView}
                            headersOnly
                            onLinkClick={(item) => this.setState({ activeMobileView: `${item?.props.itemKey}` })}
                        >
                            <PivotItem headerText="Explore Promises" itemKey="explore" key="explore" />
                            <PivotItem headerText="Learn More" itemKey="learn" key="learn" />
                        </Pivot>
                        <Break size={3} />
                    </FlexColumn>
                )}
                {showMobile && activeMobileView === "explore" && <UserHome />}
                <Break size={3} />
            </ConstrainedBody>
        )
    }
}
