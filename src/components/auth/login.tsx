import React, { useContext } from "react"
import { observer } from "mobx-react"
import styled from "styled-components"
import { Dialog, DialogType, IconButton, IDialogContentProps } from "@fluentui/react"
import { GlobalContext } from "data/state"
import { TextFonts } from "data/theme"
import { FirebaseAuth, Props } from "react-firebaseui"
import { getAuth, EmailAuthProvider, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth"

export const AuthDialog = observer(() => {
    const state = useContext(GlobalContext)
    if (state === null) return null

    const smallView = state.appWidth <= 600

    const props: Props = {
        uiConfig: {
            signInOptions: [
                {
                    provider: EmailAuthProvider.PROVIDER_ID,
                    requireDisplayName: true,
                    signInMethod: EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD,
                },
                GoogleAuthProvider.PROVIDER_ID,
                GithubAuthProvider.PROVIDER_ID,
            ],
            signInFlow: "popup",
            callbacks: {
                signInSuccessWithAuthResult: () => {
                    state.toggleAuthView()
                    return true
                },
            },
        },
        firebaseAuth: getAuth(),
    }

    const dialog_content_props: IDialogContentProps = {
        type: DialogType.largeHeader,
        title: (
            <Title>
                Please sign in <IconButton onClick={state.toggleAuthView} iconProps={{ iconName: "Cancel" }} />
            </Title>
        ),
    }

    return (
        <Dialog
            hidden={!state.authShowing}
            onDismiss={state.toggleAuthView}
            dialogContentProps={dialog_content_props}
            modalProps={{ isBlocking: true }}
            minWidth={smallView ? "90vw" : "500px"}
        >
            <StyledFirebaseAuth {...props} />
        </Dialog>
    )
})

const StyledFirebaseAuth = styled(FirebaseAuth)`
    .mdl-shadow--2dp {
        box-shadow: none;
    }
    .mdl-shadow--3dp {
        box-shadow: none;
    }
    .mdl-shadow--4dp {
        box-shadow: none;
    }
    .mdl-shadow--6dp {
        box-shadow: none;
    }
    .mdl-shadow--8dp {
        box-shadow: none;
    }
    .mdl-shadow--16dp {
        box-shadow: none;
    }
    .mdl-shadow--24dp {
        box-shadow: none;
    }

    .mdl-spinner__layer-1 {
        border-color: #03a9f4;
    }
    .mdl-spinner--single-color .mdl-spinner__layer-1 {
        border-color: #03a9f4;
    }
    .mdl-spinner--single-color .mdl-spinner__layer-2 {
        border-color: #03a9f4;
    }
    .mdl-spinner--single-color .mdl-spinner__layer-3 {
        border-color: #03a9f4;
    }
    .mdl-spinner--single-color .mdl-spinner__layer-4 {
        border-color: #03a9f4;
    }
    .mdl-button.mdl-button--colored {
        color: #03a9f4;
    }
    .mdl-button--raised.mdl-button--colored {
        background: #03a9f4;
        color: #fff;
    }
    .mdl-button--raised.mdl-button--colored:hover {
        background-color: #03a9f4;
    }
    .mdl-button--raised.mdl-button--colored:active {
        background-color: #03a9f4;
    }
    .mdl-button--raised.mdl-button--colored:focus:not(:active) {
        background-color: #03a9f4;
    }

    .mdl-button--primary.mdl-button--primary {
        color: #03a9f4;
    }
    .mdl-button--primary.mdl-button--primary .mdl-ripple {
        background: #fff;
    }
    .mdl-button--primary.mdl-button--primary.mdl-button--fab,
    .mdl-button--primary.mdl-button--primary.mdl-button--raised {
        color: #fff;
        background-color: #03a9f4;
    }

    .mdl-progress > .progressbar {
        background-color: #03a9f4;
    }
    .mdl-progress > .bufferbar {
        background-image: linear-gradient(to right, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7)),
            linear-gradient(to right, #03a9f4, #03a9f4);
    }
    @supports (-webkit-appearance: none) {
        .mdl-progress:not(.mdl-progress--indeterminate):not(.mdl-progress--indeterminate) > .auxbar,
        .mdl-progress:not(.mdl-progress__indeterminate):not(.mdl-progress__indeterminate) > .auxbar {
            background-image: linear-gradient(to right, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7)),
                linear-gradient(to right, #03a9f4, #03a9f4);
            mask: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIj8+Cjxzdmcgd2lkdGg9IjEyIiBoZWlnaHQ9IjQiIHZpZXdQb3J0PSIwIDAgMTIgNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogIDxlbGxpcHNlIGN4PSIyIiBjeT0iMiIgcng9IjIiIHJ5PSIyIj4KICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9ImN4IiBmcm9tPSIyIiB0bz0iLTEwIiBkdXI9IjAuNnMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiAvPgogIDwvZWxsaXBzZT4KICA8ZWxsaXBzZSBjeD0iMTQiIGN5PSIyIiByeD0iMiIgcnk9IjIiIGNsYXNzPSJsb2FkZXIiPgogICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0iY3giIGZyb209IjE0IiB0bz0iMiIgZHVyPSIwLjZzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgLz4KICA8L2VsbGlwc2U+Cjwvc3ZnPgo=);
        }
    }
    .mdl-progress:not(.mdl-progress--indeterminate) > .auxbar,
    .mdl-progress:not(.mdl-progress__indeterminate) > .auxbar {
        background-image: linear-gradient(to right, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)),
            linear-gradient(to right, #03a9f4, #03a9f4);
    }
    .mdl-progress.mdl-progress--indeterminate > .bar1,
    .mdl-progress.mdl-progress__indeterminate > .bar1 {
        background-color: #03a9f4;
        animation-name: indeterminate1;
        animation-duration: 2s;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
    }
    .mdl-progress.mdl-progress--indeterminate > .bar3,
    .mdl-progress.mdl-progress__indeterminate > .bar3 {
        background-image: none;
        background-color: #03a9f4;
        animation-name: indeterminate2;
        animation-duration: 2s;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
    }

    .mdl-textfield--floating-label.has-placeholder .mdl-textfield__label,
    .mdl-textfield--floating-label.is-dirty .mdl-textfield__label,
    .mdl-textfield--floating-label.is-focused .mdl-textfield__label {
        color: #03a9f4;
        font-size: 14px;
    }

    .mdl-textfield__label:after {
        background-color: #03a9f4;
    }

    .firebaseui-textfield.mdl-textfield .firebaseui-label::after {
        background-color: #03a9f4;
    }

    .firebaseui-link {
        color: #03a9f4;
        text-decoration: none;
    }
`

const Title = styled.div`
    font-size: 1.2em;
    font-family: ${TextFonts};
    color: #444444;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-right: -26px;
    .ms-Button {
        border-radius: 50%;
    }
    .ms-Button:hover {
        color: #ff0000;
    }
`
