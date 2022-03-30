import styled from "styled-components"

interface ScalableImageProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLImageElement>, HTMLImageElement> {
    minHeight: number
    maxHeight: number
    // e.g. 10vw
    relativeHeight: string
}

export const ScalableImage = styled.img<ScalableImageProps>`
    width: auto;

    min-height: ${(props) => props.minHeight}px !important;
    max-height: ${(props) => props.maxHeight}px !important;
    height: ${(props) => props.relativeHeight};
`
