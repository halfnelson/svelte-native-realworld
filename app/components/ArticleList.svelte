<listView items="{$items}" height="100%" width="100%">
	<Template let:item>
		<stackLayout orientation="vertical" class="article-item">
      {#if item.tagList && item.tagList.length > 0}
      <wrapLayout orientation="horizontal" class="tags" horizontalAlignment="right">
				{#each item.tagList as tag, i}
				<label text="{tag}" class="article-tag" />
				{/each}
			</wrapLayout>
      {/if}
      <label text="{item.title}" class="article-title" textWrap="true"/>
      <label text="{item.description}" class="article-desc" textWrap="true"/>
    
      <gridLayout columns="*,auto,auto" class="article-footer">
			  <Author col="0" author="{item.author}" date="{item.createdAt}" />
        <label col="1" text="{item.favoritesCount > 0 ? icons['favorite'] : icons['favorite-outline']}" class="icon {item.favoritesCount > 0 ? 'favorited' : ''}" verticalAlignment="center" />
        <label col="2" text="{item.favoritesCount}" class="favorites-count" verticalAlignment="center" />
      </gridLayout>
		</stackLayout>
	</Template>
</listView>

<style>
  .article-item {
    padding: 15
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
    margin-top: 15;
  }
  .tags {
    margin-bottom: 0;
  }
  .article-tag {
    color: #AAA;
    font-size: 11;
    padding: 1 7; 
    margin-right: 2;
    border-radius: 10;
    border-color: #CCC;
    border-width: 1; 
  }
  .icon {
    font-size: 15;
    margin-right: 5;
  }

  .icon.favorited {
    color: black;
  }
</style>
<script>
    import { Template } from "svelte-native/components";
    import { onMount } from "svelte";

    import Author from "./Author";
    import { icons } from "../utils/icons"
    import { ArticleStore, ArticleFilterType } from "../stores/articles";

    export let filtertype = ArticleFilterType.Global;
    export let filterparam = null;
    export let usertoken = null;
    let items = new ArticleStore();
    $: items.loadArticles(filtertype, filterparam, usertoken);
</script>