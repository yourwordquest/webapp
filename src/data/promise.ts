import { SupportingContent } from "./common"

export interface Promise {
    PromiseId: string
    Summary: string
    Detail: string
    PromisedOn: string
    ExpectedDelivery: string
    DeliveredOn: string
    SupportingContent: SupportingContent[]
    Status: "Tentative" | "Promised" | "InProgress" | "Delivered" | "Broken"
}
