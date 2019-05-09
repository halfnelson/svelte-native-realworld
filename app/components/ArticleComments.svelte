<stackLayout padding="10 0" >
 <label text="Comments:" />
{#if $comments.loading}
    <activityIndicator  busy="{true}"  color="black"/>
{:else}
    {#each $comments.items as comment}
        <stackLayout class="comment">
            <stackLayout class="comment-content">
                <label text="{comment.body}" />
            </stackLayout>
            <stackLayout class="comment-footer">
                <Author author={comment.author}  date="{comment.createdAt}" height="{28}" />
            </stackLayout>
        </stackLayout>
    {:else}
         <label text="No comments yet." class="no-comments" horizontalAlignment="center"/>
    {/each}
{/if}
</stackLayout>

<style> 
activityIndicator {
    color: black;
}
.comment {
    background-color: white;
    border-width: 1;
    border-color: #F3F3F3;
    margin: 10 0;
}
.comment-footer {
    background-color: #F3F3F3;
    width: 100%;
    padding: 5;
}
.comment-content {
    padding: 10;
}
.no-comments {
    font-size: 15;
    padding: 20;
}
</style>

<script>
    
    import { CommentStore } from '../stores/comments'
    import { alert } from 'tns-core-modules/ui/dialogs'
    import Author from './Author'

    export let slug;

    let comments = new CommentStore()
    $: comments.loadComments(slug).catch(err => alert("Error loading comments"))
 
    
</script>