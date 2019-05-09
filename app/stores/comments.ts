import { writable } from 'svelte/store'
import { client } from '../lib/client'
import { Comment } from '../models/comment'

interface CommentsResponse {
    comments: Comment[]
}
interface CommentResponse {
    comments: Comment
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
    
    async loadComments(slug, user_token) {
        if (!slug) return;
        try {
            this.comments.update( c => ({ ...c, loading: true }));
            let res =  await client.sendRequest<CommentsResponse>(`/articles/${slug}/comments`, 'GET', user_token)
            this.comments.set({ items: res.comments, loading: false });
        } catch (e) {
            alert("Error loading comments: " + e.message)
        }
    }

    async addComment(slug, text, user_token) {
        try {
            let res =  await client.sendRequest<CommentResponse>(`/articles/${slug}/comments`, 'POST', user_token, { comment: { body: text }});
            this.loadComments(slug, user_token);    
        } catch (e) {
            alert("Error saving comment: " + e.message)
        }
        
    }
}