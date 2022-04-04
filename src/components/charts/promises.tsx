import React from "react"
import styled from "styled-components"
import { Cell, Pie, PieChart, Tooltip } from "recharts"
import { Break, Flex, FlexColumn } from "components/shared/containers"
import { primaryColor, promiseColors } from "data/theme"

interface PromisesPieChartProps {
    data: {
        broken: number
        delivered: number
        pending: number
        inProgress: number
    }
    height: number
}

export function PromiseStats({ data, height }: PromisesPieChartProps) {
    const total = data.delivered + data.broken + data.inProgress + data.pending
    const chartData: { name: string; value: number; color: string }[] = [
        { name: "Promises Delivered", value: data.delivered, color: promiseColors.delivered },
        { name: "Promises In Progress", value: data.inProgress, color: promiseColors.inProgress },
        { name: "Promises Pending", value: data.pending, color: promiseColors.pending },
        { name: "Promises Broken", value: data.broken, color: promiseColors.broken },
    ]

    return (
        <StyledPromiseContainer breakAt={600}>
            <Flex justify="center">
                <PieChart width={height} height={height}>
                    <Pie data={chartData} dataKey="value" outerRadius="100%" labelLine={false} label={renderCustomizedLabel}>
                        {chartData.map((item) => (
                            <Cell key={item.name} fill={item.color} />
                        ))}
                    </Pie>
                    <Tooltip content={renderTooltip} />
                </PieChart>
            </Flex>
            <Break />
            <FlexColumn autoGrow justify="space-around">
                <PromiseStat color={primaryColor} percentage={100}>
                    1078 Known Promises
                </PromiseStat>
                {chartData.map((item) => (
                    <PromiseStat key={item.name} percentage={(item.value / total) * 100} color={item.color}>
                        <strong>{item.value}</strong>&nbsp;{item.name}
                    </PromiseStat>
                ))}
            </FlexColumn>
        </StyledPromiseContainer>
    )
}

const StyledPromiseContainer = styled(Flex)`
    padding: 0.5em 0.5em;
    margin: 0.5em;
    background-color: #fafafa;
    border-radius: 0.2em;
    width: 100%;
`

interface PromiseStatProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    color: string
    percentage: number
}

const PromiseStat = styled.div<PromiseStatProps>`
    position: relative;
    border-left: 4px solid ${({ color }) => color};
    border-bottom: 1px solid ${({ color }) => color};
    padding: 0.3em 0.5em;
    margin-bottom: 0.1em;
    z-index: 2;
    &::before {
        content: " ";
        left: 0;
        top: 0;
        height: 100%;
        width: ${({ percentage }) => percentage}%;
        background-color: ${({ color }) => color}44;
        position: absolute;
        z-index: 1;
    }
`

const renderTooltip = (props: any) => {
    if (props.active && props.payload && props.payload.length) {
        const item = props.payload[0].payload as { name: string; value: number; color: string }
        return (
            <StyledToolTip style={{ color: item.color }}>
                <strong>{item.value}</strong>&nbsp;{item.name}
            </StyledToolTip>
        )
    }

    return null
}

const StyledToolTip = styled.div`
    background-color: #eeeeee;
    padding: 0.5em 1em;
    border-radius: 0.5em;
`

const RADIAN = Math.PI / 180
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? "start" : "end"} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    )
}