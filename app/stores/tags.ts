import { readable } from 'svelte/store';
import { client } from '../lib/client'

interface TagResponse {
    tags: string[]
} 

export  const tags = readable([], set => {
    client.sendRequest<TagResponse>('/tags', 'get', null).then( res =>
        set(res.tags)
    )
});

