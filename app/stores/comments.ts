import { writable } from 'svelte/store'
import { client } from '../lib/client'
import { Comment } from '../models/comment'

interface CommentResponse {
    comments: Comment[]
}


export class CommentStore {
    comments: any;
    
    constructor() {
        this.comments = writable({
            loading: true,
            items: []
        });
    }

    subscribe = (action) => {
        return this.comments.subscribe(action);
    };
    
    async loadComments(slug) {
        if (!slug) return;
        try {
            this.comments.update( c => ({ ...c, loading: true }));
            let res =  await client.sendRequest<CommentResponse>(`/articles/${slug}/comments`, 'GET')
            this.comments.set({ items: res.comments, loading: false });
        } catch (e) {
            alert("Error loading comments: " + e.message)
        }
    }
}