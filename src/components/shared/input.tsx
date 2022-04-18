import React from "react"
import styled from "styled-components"
import ReactQuill from "react-quill"
import { FlexColumn } from "./containers"
import "react-quill/dist/quill.snow.css"
import { DefaultButton } from "@fluentui/react"
import { primaryColor } from "data/theme"

interface EditorProps {
    onChange?: (value: string) => void
    value?: string
    placeholder?: string
    description?: string
}

export function Editor(props: EditorProps) {
    const modules: any = {
        toolbar: [
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image"],
        ],
    }

    return (
        <StyledEditor>
            <label>{props.description}</label>
            <ReactQuill
                theme="snow"
                value={props.value}
                placeholder={props.placeholder || "Type here..."}
                onChange={(content: string) => {
                    if (props.onChange) {
                        props.onChange(content)
                    }
                }}
                modules={modules}
                preserveWhitespace
            />
        </StyledEditor>
    )
}

const StyledEditor = styled(FlexColumn)`
    label {
        color: #444444;
        font-size: 1.5em;
    }
    .quill {
        background-color: #ffffff;
    }
`

export const OutlinedPrimaryButton = styled(DefaultButton)`
    border: 1px solid ${primaryColor};
    color: ${primaryColor};
`
