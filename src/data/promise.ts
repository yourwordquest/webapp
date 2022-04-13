import { uniqueId } from "utils/random"
import { OtherData, SupportingContent } from "./common"

export interface Promise {
    PromiseId: string
    Summary: string
    Detail: string
    PromisedOn: number
    ExpectedDelivery: number
    DeliveredOn: number
    SupportingContent: SupportingContent[]
    Status: "Tentative" | "Promised" | "InProgress" | "Delivered" | "Broken" | "Invalidated"
    OtherData: OtherData
}

export function NewPromise(): Promise {
    return {
        PromiseId: uniqueId(),
        Summary: "",
        Detail: "",
        PromisedOn: 0,
        ExpectedDelivery: 0,
        DeliveredOn: 0,
        SupportingContent: [],
        Status: "Tentative",
        OtherData: {},
    }
}
