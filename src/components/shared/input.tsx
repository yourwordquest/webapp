import React from "react"
import styled from "styled-components"
import ReactQuill from "react-quill"
import { FlexColumn } from "./containers"
import "react-quill/dist/quill.snow.css"

interface EditorProps {
    onChange?: (value: string) => void
    value?: string
    placeholder?: string
    label?: string
}

export function Editor(props: EditorProps) {
    const modules: any = {
        toolbar: [
            [{ header: [1, 2, false] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
            ["link", "image"],
        ],
    }

    return (
        <StyledEditor>
            <label>{props.label}</label>
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
        font-weight: 600;
        line-height: 1.5em;
    }
    .quill {
        background-color: #ffffff;
    }
`
