import { runInAction } from "mobx"
import { set } from "lodash"

export function set_observable(obj: any, path: string, value: any) {
    runInAction(() => {
        set(obj, path, value)
    })
}
