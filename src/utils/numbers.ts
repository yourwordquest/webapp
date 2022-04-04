export function toNearest(value: number, nearest: number): number {
    return Math.floor(value / nearest) * nearest
}
