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

export interface PromiseAggregation {
    tentative: number
    promised: number
    in_progress: number
    delivered: number
    broken: number
    invalidated: number
}

export interface GroupedPromises {
    tentative: Promise[]
    promised: Promise[]
    in_progress: Promise[]
    delivered: Promise[]
    broken: Promise[]
    invalidated: Promise[]
}

export interface PromiseByItem {
    id: string
    name: string
    type: "person"
}

export interface PromisesRequest {
    title: string
    description: string
    promise_ids: string[]
    other_promises: { [list_name: string]: string[] }
    promises_map: { [promise_id: string]: Promise }
    promise_by_map: { [promise_id: string]: PromiseByItem[] }
}

export class Promises {
    promise_ids: string[]
    other_promises: { [list_name: string]: string[] }
    promises_map: { [promise_id: string]: Promise }
    include: string[]
    promise_by_map: { [promise_id: string]: PromiseByItem[] }

    constructor(result: PromisesRequest, include: string[]) {
        makeAutoObservable(this)
        this.promise_ids = result.promise_ids
        this.other_promises = result.other_promises
        this.promises_map = result.promises_map
        this.include = include
        this.promise_by_map = result.promise_by_map
    }

    get promises(): Promise[] {
        const ids_to_include = this.promise_ids
        for (let i = 0; i < this.include.length; i++) {
            const ids_list = this.other_promises[this.include[i]]
            if (ids_list) ids_to_include.push(...ids_list)
        }
        return ids_to_include.map((promise_id) => {
            const promise = this.promises_map[promise_id]
            promise.PromiseId = promise_id
            return promise
        })
    }

    get aggregated_promises(): PromiseAggregation {
        const grouped = this.grouped_promises

        return {
            tentative: grouped.tentative.length,
            promised: grouped.promised.length,
            in_progress: grouped.in_progress.length,
            delivered: grouped.delivered.length,
            broken: grouped.broken.length,
            invalidated: grouped.invalidated.length,
        }
    }

    get grouped_promises(): GroupedPromises {
        const tentative = [],
            promised = [],
            in_progress = [],
            delivered = [],
            broken = [],
            invalidated = []

        const promises = this.promises

        for (let i = 0; i < promises.length; i++) {
            switch (promises[i].Status) {
                case "Tentative":
                    tentative.push(promises[i])
                    break
                case "Promised":
                    promised.push(promises[i])
                    break
                case "InProgress":
                    in_progress.push(promises[i])
                    break
                case "Delivered":
                    delivered.push(promises[i])
                    break
                case "Broken":
                    broken.push(promises[i])
                    break
                case "Invalidated":
                    invalidated.push(promises[i])
                    break
            }
        }
        return { tentative, promised, in_progress, delivered, broken, invalidated }
    }
}
