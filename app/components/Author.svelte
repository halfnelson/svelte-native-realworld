<stackLayout orientation="horizontal" on:tap={showProfile}>
    <image class="author-image" src="{avatar_url}" stretch="aspectFill" style="width: {height}; height: {height}" />
    <stackLayout orientation="vertical">
        <label text="{avatar_name}" class="author-name" style="font-size: {author_font_size}"/>
        <label text="{article_date}" class="date" style="font-size: {date_font_size}"/>
    </stackLayout>
</stackLayout>

<style>
    .author-image {
        border-radius: 50%;
        margin-right: 10;
    }
    .author-name {
        color: black;
    }
    .date {
        color: #555;
    }
</style>
<script>

    import { format } from 'timeago.js'
    import { navigate } from 'svelte-native'
    import ProfilePage from './ProfilePage'
    
    export let author;
    export let date;
    export let height = 32
    $: author_font_size = Math.floor((height * 3/4)  / 2);
    $: date_font_size = Math.floor(author_font_size * 5/6);

    let avatar_url, avatar_name, article_date;
    $: avatar_url = (author && author.image) ? author.image : "https://static.productionready.io/images/smiley-cyrus.jpg";
    $: avatar_name = author ? author.username : "Anonymous";
    $: article_date = date ? format(date, 'en_US') : ""

    function showProfile() {
       navigate({ page: ProfilePage, props: { profile: author }})
    }
</script>