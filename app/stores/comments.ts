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
    
    async loadComments(slug:string, user_token:string) {
        if (!slug) return;
        try {
            this.comments.update( c => ({ ...c, loading: true }));
            let res =  await client.sendRequest<CommentsResponse>(`/articles/${slug}/comments`, 'GET', user_token)
            this.comments.set({ items: res.comments, loading: false });
        } catch (e) {
            alert("Error loading comments: " + e.message)
        }
    }

    async addComment(slug:string, text:string, user_token:string) {
        try {
            let res =  await client.sendRequest<CommentResponse>(`/articles/${slug}/comments`, 'POST', user_token, { comment: { body: text }});
            this.loadComments(slug, user_token);    
        } catch (e) {
            alert("Error saving comment: " + e.message)
        }
    }

    async deleteComment(slug:string, comment_id:number, user_token:string) {
        try {
            await client.sendRequest(`/articles/${slug}/comments/${comment_id}`, 'DELETE', user_token);
            this.comments.update(c => ({ ...c, items: c.items.filter((x:Comment) => x.id != comment_id) })) 
        } catch (e) {
            alert("Error deleting comment: " + e.message)
        }
    }
}