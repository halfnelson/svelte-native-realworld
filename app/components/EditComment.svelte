<stackLayout>
    <gridLayout rows="auto" columns="auto,*,auto" class="action-bar p-10" style="background-color: white; border-bottom-color: lightgray; border-bottom-width: 1;">
        <button text="{icons.close}" class="icon text-left action-item" row="0" col="0" />
        <button text="Publish" class="text-right action-item" row="0" col="2" />
    </gridLayout>

    <stackLayout>
        <stackLayout class="m-10 p-10 comment-reply-box">
            <label text="Commenting on:" class="font-italic"/>
            <stackLayout orientation="horizontal">
                <image src="{article.author.image}" stretch="aspectFill" />
                <stackLayout>
                    <label text="{article.title}" class="font-weight-bold" />
                    <label text="by {article.author.username}" class="font-italic" />
                </stackLayout>
            </stackLayout>
        </stackLayout>

        <textView hint="Your Comment" class="m-10 input input-border" editable="{!isLoading}"/>
    </stackLayout>

    <activityIndicator busy="{isLoading}" horizontalAlignment="center" verticalAlignment="center" class="activity-indicator" />
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
    let isLoading = false;
    export let article;
</script>