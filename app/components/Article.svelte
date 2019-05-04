<page>
    <actionBar title="">
        <stackLayout orientation="horizontal" horizontalAlignment="left" position="left">
            <label text="{icons['arrow-left']}" class="icon back-button" verticalAlignment="center" on:tap={goBack}/>
            <image class="author-image" src="{avatar_url}" stretch="aspectFill" />
            <stackLayout orientation="vertical">
                <label text="{avatar_name}" class="author-name"/>
                <label text="{article_date}" class="date"/>
            </stackLayout>
        </stackLayout>

        <actionItem ios.position="right" android.position="actionBar">
            <stackLayout orientation="horizontal" class="favorited">
                <label text="{article.favoritesCount}" class="favorites-count" verticalAlignment="center"  />
                <label text="{article.favorited ? icons['favorite'] : icons['favorite-outline']}" class="icon {article.favorited > 0 ? 'favorited' : ''}" verticalAlignment="center" />
            </stackLayout>
        </actionItem>

        <actionItem ios.position="right">
           <label text="{icons.share}" class="icon action-icon" />
        </actionItem>
        {#if $user_profile && $user_profile.username == article.author.username }
            <actionItem ios.position="right">
                <label text="{icons.edit}" class="icon action-icon" />
            </actionItem>
        {/if}
    </actionBar>
    <stackLayout class="article-content">
        <label text="{article.title}" class="article-title" textWrap="true"/>
        <htmlView html="{article.body}" class="article-body" />
    </stackLayout>
</page>

<style>
    .author-image {
        width: 32;
        height: 32;
        margin-right: 10;
        border-radius: 50%;
    }
    .author-name {
        font-size: 12;
    }
    .date {
        font-size: 10;
    }
    .back-button {
        margin-right: 15;
    }
    .action-icon {
        font-size: 20;
        padding: 5 15;
    }
    .favorites-count {
        margin-right: 5;
    }

    .article-content {
        padding: 20 10;
    }

    .article-title {
        font-size: 30;
        color: black;
        font-weight: bold;
        margin-bottom: 20;
    }

</style>

<script>
    import { goBack } from 'svelte-native'

    import { icons } from '../utils/icons'
    import { user_token, user_profile } from '../stores/user'
    import { format } from 'timeago.js'

    export let article

    let avatar_url, avatar_name, article_date;
    $: avatar_url = (article.author && article.author.image) ? article.author.image : "https://static.productionready.io/images/smiley-cyrus.jpg";
    $: avatar_name = article.author ? article.author.username : "Anonymous";
    $: article_date = article.createdAt ? format(article.createdAt, 'en_US') : ""
</script>