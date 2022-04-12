import { uniqueId } from "utils/random"
import { OtherData, SupportingContent } from "./common"

export interface Promise {
    PromiseId: string
    Summary: string
    Detail: string
    PromisedOn: string
    ExpectedDelivery: string
    DeliveredOn: string
    SupportingContent: SupportingContent[]
    Status: "Tentative" | "Promised" | "InProgress" | "Delivered" | "Broken"
    OtherData: OtherData
}

export function NewPromise(): Promise {
    return {
        PromiseId: uniqueId(),
        Summary: "",
        Detail: "",
        PromisedOn: "",
        ExpectedDelivery: "",
        DeliveredOn: "",
        SupportingContent: [],
        Status: "Tentative",
        OtherData: {},
    }
}
