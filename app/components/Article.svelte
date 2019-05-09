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
    <scrollView>
        <stackLayout class="article-content">
            <label text="{article.title}" class="article-title" textWrap="true"/>
            <htmlView bind:this={html_view} class="article-body" />
            <stackLayout class="hr-light"/>
            {#if $user_profile}
                <gridLayout  rows="auto, auto, auto" columns="auto, *" class="m-t-10 add-comment" horizontalAlignment="left"
                    position="left">
                    <image row="0" col="0" rowspan="3" src="{$user_profile.image}" class="m-r-10" height="32" stretch="aspectFill"/>
                    <label row="1" col="1" text="Leave a comment" on:tap="{onWriteComment}" class="font-italic"/>
                </gridLayout>
            {/if}

            <ArticleComments slug="{article.slug}" />
        </stackLayout>
        
    </scrollView>
</page>

<style>
    .add-comment image {
        border-radius: 50%;
    }
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
    .article-body {
        margin-bottom: 20;
    }

</style>

<script>
    import { goBack, showModal } from 'svelte-native'
    import EditComment from './EditComment'
    import * as marked from 'marked'
    import { icons } from '../utils/icons'
    import { user_token, user_profile } from '../stores/user'
    import { format } from 'timeago.js'
    import ArticleComments from './ArticleComments'

    let html_view;
    export let article

    let avatar_url, avatar_name, article_date, article_html
    $: avatar_url = (article.author && article.author.image) ? article.author.image : "https://static.productionready.io/images/smiley-cyrus.jpg";
    $: avatar_name = article.author ? article.author.username : "Anonymous";
    $: article_date = article.createdAt ? format(article.createdAt, 'en_US') : ""
    $: if (html_view) html_view.setAttribute('html', marked(article.body))
   
    function onWriteComment() {
        showModal({
            page: EditComment,
            fullscreen: true,
            props: {
                article: article
            }
        })
    }
</script>