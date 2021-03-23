import { Writable, writable } from 'svelte/store'

type Item = {
    id: number,
    name: string
}

export const autocomplete: Writable<Array<Item>> = writable([])
export const item: Writable<any> = writable({})
export const results: Writable<Array<any>> = writable([])
