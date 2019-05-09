<stackLayout padding="10 0" >
 <label text="Comments:" />
{#if $comments.loading}
    <activityIndicator  busy="{true}"  color="black"/>
{:else}
    {#if $user_profile}
        <gridLayout  rows="auto, auto, auto" columns="auto, *" class="m-t-10 add-comment" horizontalAlignment="left"
            position="left">
            <image row="0" col="0" rowspan="3" src="{$user_profile.image}" class="m-r-10" height="32" stretch="aspectFill"/>
            <label row="1" col="1" text="Leave a comment" on:tap="{onWriteComment}" class="font-italic"/>
        </gridLayout>
    {/if}
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
.add-comment image {
    border-radius: 50%;
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
    import { showModal } from 'svelte-native'
    import { CommentStore } from '../stores/comments'
    import { user_profile } from '../stores/user'
    import { alert } from 'tns-core-modules/ui/dialogs'
    import Author from './Author'
    import EditComment from './EditComment'

    export let article;
      
    let comments = new CommentStore()
    $: comments.loadComments(article.slug, $user_profile.token).catch(err => alert("Error loading comments"))
 
    function onWriteComment() {
        showModal({
            page: EditComment,
            fullscreen: true,
            props: {
                article: article,
                comments: comments,
                user_profile: $user_profile
            }
        })
    }
    
</script>