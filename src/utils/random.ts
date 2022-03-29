export const uniqueId = () => (Date.now().toString(36) + Math.random().toString(36).substring(2, 12)).toLowerCase()

export function randBetween(min: number, max?: number): number {
    if (!max) {
        max = min
        min = 0
    }

    return min + Math.round(Math.random() * (max - min))
}
