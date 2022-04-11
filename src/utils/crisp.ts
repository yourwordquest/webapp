// https://docs.crisp.chat/guides/chatbox-sdks/web-sdk/dollar-crisp/
const crisp_methods = (window as any).$crisp

export const crisp = {
    open_chat: () => {
        if (!crisp_methods || crisp_methods.is("chat:opened")) {
            return
        }
        crisp_methods.push(["do", "chat:open"])
    },
    setup_profile: (name: string, email: string, avatar: string) => {
        if (!crisp_methods) {
            return
        }
        if (avatar) crisp_methods.push(["set", "user:avatar", [avatar]])
        crisp_methods.push(["set", "user:nickname", [name]])
        crisp_methods.push(["set", "user:email", [email]])
    },
}
