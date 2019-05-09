<stackLayout>
{#if list_items.length}
<listView items="{list_items}" height="100%" width="100%" on:loadMoreItems={()=> items.loadNextPage()}
	on:itemTap={openArticle}>
	<Template let:item>
		<stackLayout orientation="vertical" class="article-item">
			<label text="{item.title}" class="article-title" textWrap="true" />
			<label text="{item.description}" class="article-desc" textWrap="true" />
			{#if item.tagList && item.tagList.length > 0}
			<wrapLayout orientation="horizontal" class="tags" horizontalAlignment="left">
				{#each item.tagList as tag, i}
				<label text="{tag}" class="article-tag" />
				{/each}
			</wrapLayout>
			{/if}
			<gridLayout columns="*,auto,auto" class="article-footer">
				<Author col="0" author="{item.author}" date="{item.createdAt}" />
				<label col="1" text="{item.favoritesCount}" class="favorites-count" verticalAlignment="center" />
				<label col="2" text="{item.favorited ? icons['favorite'] : icons['favorite-outline']}" class="icon {item.favorited > 0 ? 'favorited' : ''}"
				 verticalAlignment="center" on:tap={()=>toggleFavorite(item)} />
			</gridLayout>

		</stackLayout>
	</Template>
</listView>
{:else}
  <label horizontalAlignment="center" class="no-articles">No articles are here... yet.</label>
{/if}

</stackLayout>
<style>
  .no-articles {
    font-size: 15;
    padding: 20;
  }
  .article-item {
    padding: 15;
  }
  .article-title {
    font-size: 20;
    font-weight: bold;
    color: black;
  }
  .article-desc {
    font-size: 17;
  }
  .article-footer {
    margin-top: 10;
  }
  .tags {
    margin-bottom: 0;
    margin-top: 15;
  }
  .article-tag {
    color: #aaa;
    font-size: 11;
    padding: 1 7;
    margin-right: 2;
    border-radius: 10;
    border-color: #ccc;
    border-width: 1;
  }
  .icon {
    font-size: 15;
    margin-left: 5;
  }

  .icon.favorited {
    color: black;
  }
</style>
<script>
    import { Template } from "svelte-native/components";
    import { navigate } from "svelte-native";
    import { onMount } from "svelte";

    import Author from "./Author";
    import Article from "./Article";
    import { icons } from "../utils/icons";
    import { ArticleStore, ArticleFilterType } from "../stores/articles";

    export let filtertype = ArticleFilterType.Global;
    export let filterparam = null;
    export let usertoken = null;
    let loading = false;

    let items = new ArticleStore();
    $: {
      items.loadArticles(filtertype, filterparam, usertoken);
      loading = true;
    }

    let list_items = []
    $: { 
      list_items = $items;
      loading = false;
    }

    function toggleFavorite(article) {
        if (!usertoken) return;
        if (!article.favorited) {
           items.favoriteArticle(article, usertoken)
        } else {
           items.unFavoriteArticle(article, usertoken)
        }
    }
    
    function openArticle(e) {
        let article = list_items[e.index];
        navigate({ page: Article, props: { article: article, articles: items }});
    }
</script>