import React from "react"
import styled from "styled-components"
import { Cell, Pie, PieChart, Tooltip } from "recharts"
import { Break, Flex, FlexColumn } from "components/shared/containers"
import { primaryColor, promiseColors } from "data/theme"
import { PromiseAggregation } from "data/promise"

interface PromisesPieChartProps {
    data: PromiseAggregation
    height: number
    hide_bars?: boolean
}

export function PromiseStats({ data, height, hide_bars }: PromisesPieChartProps) {
    const total = data.delivered + data.broken + data.in_progress + data.promised
    const chartData: { name: string; value: number; color: string }[] = [
        { name: "Promises Delivered", value: data.delivered, color: promiseColors.delivered },
        { name: "Promises In Progress", value: data.in_progress, color: promiseColors.inProgress },
        { name: "Promises Pending", value: data.promised, color: promiseColors.pending },
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
            {!hide_bars && (
                <FlexColumn autoGrow justify="space-around">
                    <PromiseStat color={primaryColor} percentage={100}>
                        <label>
                            <strong>{total + data.tentative + data.invalidated}</strong> Known Promises
                        </label>
                    </PromiseStat>
                    {chartData.map((item) => (
                        <PromiseStat key={item.name} percentage={(item.value / total) * 100} color={item.color}>
                            <label>
                                <strong>{item.value}</strong>
                                {item.name}
                            </label>
                        </PromiseStat>
                    ))}
                </FlexColumn>
            )}
        </StyledPromiseContainer>
    )
}

const StyledPromiseContainer = styled(Flex)`
    padding: 0.5em 0.5em;
    margin: 0.5em 0;
    background-color: #fafafa;
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
    margin-bottom: 0.3em;
    height: 32px;
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
    label {
        left: 0;
        top: 0;
        height: 100%;
        position: absolute;
        z-index: 2;
        display: flex;
        align-items: center;
        padding: 0 0.5em;
        width: calc(100% - 1em);
        strong {
            margin-right: 0.5em;
        }
    }
    .info {
        cursor: pointer;
        color: ${primaryColor};
        padding: 3px;
        border-radius: 3px;
        &:hover {
            color: #ffffff;
            background-color: ${primaryColor};
        }
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
