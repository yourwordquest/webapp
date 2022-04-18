import { makeAutoObservable } from "mobx"
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

interface PromiseAggregation {
    tentative: number
    promised: number
    in_progress: number
    delivered: number
    broken: number
    invalidated: number
}

interface PromisesRequest {
    promise_ids: string[]
    other_promises: { [list_name: string]: string[] }
    promises_map: { [promise_id: string]: Promise }
}

export class Promises {
    promise_ids: string[]
    other_promises: { [list_name: string]: string[] }
    promises_map: { [promise_id: string]: Promise }
    include: string[]

    constructor(result: PromisesRequest, include: string[]) {
        makeAutoObservable(this)
        this.promise_ids = result.promise_ids
        this.other_promises = result.other_promises
        this.promises_map = result.promises_map
        this.include = include
    }

    get promises(): Promise[] {
        const ids_to_include = this.promise_ids
        for (let i = 0; i < this.include.length; i++) {
            const ids_list = this.other_promises[this.include[i]]
            if (ids_list) ids_to_include.push(...ids_list)
        }
        return ids_to_include.map((promise_id) => this.promises_map[promise_id])
    }

    get aggregated_promises(): PromiseAggregation {
        let tentative = 0,
            promised = 0,
            in_progress = 0,
            delivered = 0,
            broken = 0,
            invalidated = 0

        const promises = this.promises

        for (let i = 0; i < promises.length; i++) {
            switch (promises[i].Status) {
                case "Tentative":
                    tentative += 1
                    break
                case "Promised":
                    promised += 1
                    break
                case "InProgress":
                    in_progress += 1
                    break
                case "Delivered":
                    delivered += 1
                    break
                case "Broken":
                    broken += 1
                    break
                case "Invalidated":
                    invalidated += 1
                    break
            }
        }
        return { tentative, promised, in_progress, delivered, broken, invalidated }
    }
}
