export function epoch(date?: Date | null): number {
    if (!date) return 0
    return Math.round(date.getTime() / 1000)
}

export function epoch_to_date(epoch_ts: number): Date | undefined {
    if (!epoch_ts) return undefined
    return new Date(epoch_ts * 1000)
}
