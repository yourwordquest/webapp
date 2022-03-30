import { NavBarHeight, SideBarWidth } from "data/theme"
import React from "react"
import styled from "styled-components"

interface FlexProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    justify?: "flex-start" | "flex-end" | "center" | "space-between" | "space-around"
    align?: "flex-start" | "flex-end" | "center" | "stretch"
    equal?: boolean
    autoGrow?: boolean
    // Used to automatically convert a row to column at specific media-width
    breakAt?: number
    centerAt?: number
}
export const Flex = styled.div<FlexProps>`
    display: flex;
    justify-content: ${(props) => (props.justify ? props.justify : "flex-start")};
    align-items: ${(props) => (props.align ? props.align : "stretch")};
    flex-basis: ${(props) => (props.equal ? "0" : "inherit")};
    flex-grow: ${(props) => (props.equal || props.autoGrow ? "1" : "initial")};

    @media (max-width: ${({ breakAt }) => (breakAt ? breakAt : 0)}px) {
        flex-direction: column;
    }
    @media (max-width: ${({ centerAt }) => (centerAt ? centerAt : 0)}px) {
        align-items: center;
        justify-content: center;
    }
`

export const FlexColumn = styled(Flex)<FlexProps>`
    flex-direction: column;
`

interface ConstrainedBodyProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    maxWidth: number
}

export const ConstrainedBody = styled.div<ConstrainedBodyProps>`
    padding-top: 1.5em;
    @media (min-width: ${(props) => props.maxWidth}px) {
        padding-right: calc((100% - ${(props) => props.maxWidth}px) / 2);
        padding-left: calc((100% - ${(props) => props.maxWidth}px) / 2);
    }
`

export const HideAt = styled.div<{ maxWidth: number }>`
    @media (max-width: ${(props) => props.maxWidth}px) {
        display: none;
    }
`

export const BodyContainer = styled.div`
    margin: ${NavBarHeight + 20}px 10px 20px ${SideBarWidth + 10}px;
`

interface BreakProps {
    size?: number
    divider?: boolean
}

export const Break = styled.div<BreakProps>`
    height: ${({ size }) => (size ? size : 1)}em;
    width: ${({ size, divider }) => (divider ? "100%" : (size ? size : 1) + "em")};
    border-bottom: ${(p) => (p.divider ? "1px solid #eeeeee" : "none")};
`
