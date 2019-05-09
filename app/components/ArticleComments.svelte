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
    {#each comment_items as comment}
        <stackLayout class="comment">
            <stackLayout class="comment-content">
                <label text="{comment.body}" textWrap="true" />
            </stackLayout>
            <gridLayout class="comment-footer" columns="*,auto">
                <Author author={comment.author}  date="{comment.createdAt}" height="{28}" col="0"/>
                {#if $user_profile && $user_profile.username == comment.author.username && !comment.deleting }
                    <label class="delete-button icon" text="{icons.delete}"  col="1" verticalAlignment="center" on:tap={()=>deleteComment(comment)} />
                {/if}
                {#if comment.deleting}
                    <activityIndicator height="28" busy="{true}" col="1"/>
                {/if}
            </gridLayout>
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
.delete-button {
    font-size: 20;
    padding: 2 8;
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
    import { icons } from '../utils/icons'
    import Author from './Author'
    import EditComment from './EditComment'

    export let article;
    
    let slug;
    $: slug = article.slug

    let comments = new CommentStore()
    $: comments.loadComments(slug, $user_profile.token).catch(err => alert("Error loading comments"))
    
    let comment_items;
    $: comment_items = $comments.items;


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
    
    function deleteComment(comment) {
        comment.deleting = true;
        comment_items = comment_items; //refresh the list to show progress
        comments.deleteComment(slug, comment.id , $user_profile.token)
    }
</script>