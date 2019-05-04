<stackLayout orientation="horizontal">
    <image class="author-image" src="{avatar_url}" stretch="aspectFill" />
    <stackLayout orientation="vertical">
        <label text="{avatar_name}" class="author-name"/>
        <label text="{article_date}" class="date"/>
    </stackLayout>
</stackLayout>

<style>
    .author-image {
        width: 32;
        height: 32;
        border-radius: 50%;
        margin-right: 10;
    }
    .author-name {
        font-size: 12;
        color: black;
    }
    .date {
        font-size: 10;
        color: #555;
    }
</style>
<script>

    import { format } from 'timeago.js'
    export let author;
    export let date;

    let avatar_url, avatar_name, article_date;
    $: avatar_url = (author && author.image) ? author.image : "https://static.productionready.io/images/smiley-cyrus.jpg";
    $: avatar_name = author ? author.username : "Anonymous";
    $: article_date = date ? format(date, 'en_US') : ""
</script>