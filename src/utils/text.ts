export function plural(word: string): string {
    if (word.endsWith("s")) {
        return word
    }
    if (word.endsWith("y")) {
        let characters = word.split("")
        characters.pop()
        return `${characters.join("")}ies`
    }

    return `${word}s`
}
