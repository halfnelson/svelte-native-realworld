import { readable } from 'svelte/store';
import { client } from '../lib/client'

interface TagResponse {
    tags: string[]
} 

export  const tags = readable([], async set => {
    let res = await client.sendRequest<TagResponse>('/tags', 'get', null);
    set(res.tags);
});

