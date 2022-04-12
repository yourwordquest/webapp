export interface SupportingContent {
    type: string // news-article, academic-paper, other e.t.c
    payload: string
    description: string
    metadata: object
}

export type OtherData = { [key: string]: { type: string; payload: any } }
