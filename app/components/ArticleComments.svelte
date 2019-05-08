<stackLayout padding="10 0" >
 <label text="Comments:" />
{#if loading}
    <activityIndicator  busy="{loading}"  color="black"/>
{:else}
    
   
    {#each comments as comment}
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
    import { onMount } from 'svelte'
    import { client } from '../lib/client'
    import { alert } from 'tns-core-modules/ui/dialogs'
    import Author from './Author'

    let loading = true;
    let comments = [];
    export let slug;
    async function loadComments(slug) {
        if (!slug) return;
        try {
            loading = true;
            let res =  await client.sendRequest(`/articles/${slug}/comments`)
            comments = res.comments;
            loading = false;
        } catch (e) {
            alert("Error loading comments: " + e.message)
        }
    }

    $: loadComments(slug);
 
    
</script>