<stackLayout>
    <gridLayout rows="auto" columns="auto,*,auto" class="action-bar p-10" style="background-color: white; border-bottom-color: lightgray; border-bottom-width: 1;">
        <button text="{icons.close}" class="icon text-left action-item" row="0" col="0" on:tap={onClose}/>
        {#if !loading}
        <button text="Publish" class="text-right action-item" row="0" col="2" on:tap={onPublish} />
        {:else}
        <activityIndicator busy={true} width="32" row="0" col="2" />
        {/if}
    </gridLayout>

    <stackLayout>
        <stackLayout class="m-10 p-10 comment-reply-box">
            <label text="Commenting on:" class="font-italic"/>
            <stackLayout orientation="horizontal">
                <image src="{article.author.image || "https://static.productionready.io/images/smiley-cyrus.jpg"}" stretch="aspectFill" />
                <stackLayout>
                    <label text="{article.title}" class="font-weight-bold" />
                    <label text="by {article.author.username}" class="font-italic" />
                </stackLayout>
            </stackLayout>
        </stackLayout>

        <textView hint="Your Comment" bind:text={new_comment} class="m-10 input input-border" editable={!loading}/>
    </stackLayout>
</stackLayout>
<style>
image {
    border-radius: 50%;
    height: 28;
    width: 28;
    margin-right: 10;
}
</style>

<script>
    import { icons } from '../utils/icons';
    import { closeModal } from 'svelte-native';
    
    export let article;
    export let comments;
    export let user_profile;
    let loading = false;
    let new_comment;

    function onClose() {
        closeModal(null)
    }

    function onPublish() {
        if (new_comment) {
            loading = true;
            comments.addComment(article.slug, new_comment, user_profile.token).then(()=>closeModal(true)).catch(()=> loading = false)
        } else {
            alert("Blank comments are boring")
        }
        
    }

</script>