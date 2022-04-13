import React from "react"
import { Promise } from "data/promise"
import { observer } from "mobx-react"
import { ContributionItem } from "./common"
import { DatePicker, Dropdown, IDropdownOption, TextField } from "@fluentui/react"
import { Editor } from "components/shared/input"
import { set_observable } from "utils/object"
import { Break, Flex } from "components/shared/containers"
import { MobileBreakPoint } from "data/theme"
import { epoch, epoch_to_date } from "utils/time"

interface PromiseProps {
    promise: Promise
}

export const PromiseContribution = observer(({ promise }: PromiseProps) => {
    const statusOptions: IDropdownOption[] = [
        { key: "Tentative", text: "Tentative - only effective if the person is elected to office" },
        { key: "Promised", text: "Promised - made by someone in position to deliver the promise" },
        { key: "InProgress", text: "In Progress - Work already started towards the delivery of this promise" },
        { key: "Delivered", text: "Delivered" },
        { key: "Broken", text: "Broken - Past delivery date with no delivery" },
        { key: "Invalidated", text: "Invalidated - A tentative promise is invalidated if the person did not get the office" },
    ]

    return (
        <ContributionItem title="Promise Details">
            <TextField label="Promise Summary" onChange={(evt, value) => set_observable(promise, "Summary", value)} />

            <Flex className="dual-input" breakAt={MobileBreakPoint}>
                <DatePicker
                    label="Promise made on"
                    value={epoch_to_date(promise.PromisedOn)}
                    onSelectDate={(date) => set_observable(promise, "PromisedOn", epoch(date))}
                    maxDate={new Date()}
                    placeholder="Select date..."
                />
                <Break />
                <DatePicker
                    label="Expected delivery date"
                    value={epoch_to_date(promise.ExpectedDelivery)}
                    onSelectDate={(date) => set_observable(promise, "ExpectedDelivery", epoch(date))}
                    minDate={epoch_to_date(promise.PromisedOn)}
                    disabled={!promise.PromisedOn}
                    placeholder="Select date..."
                />
            </Flex>

            <Editor
                label="Details"
                placeholder="Give a more detailed description of the location here..."
                value={promise.Detail}
                onChange={(value) => set_observable(promise, "Detail", value)}
            />

            <Flex className="dual-input" breakAt={MobileBreakPoint}>
                <Dropdown
                    label="Promise Status"
                    selectedKey={promise.Status}
                    options={statusOptions}
                    onChange={(evt, option) => set_observable(promise, "Status", option?.key)}
                />
                <Break />
                <DatePicker
                    label="Delivered On"
                    value={epoch_to_date(promise.DeliveredOn)}
                    onSelectDate={(date) => set_observable(promise, "DeliveredOn", epoch(date))}
                    minDate={epoch_to_date(promise.DeliveredOn)}
                    disabled={promise.Status !== "Delivered" || !promise.PromisedOn}
                    placeholder="Select date..."
                />
            </Flex>
        </ContributionItem>
    )
})
