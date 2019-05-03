<listView items="{$items}" height="100%" width="100%">
  <Template let:item>
	<!-- Shows the list item label in the default color and style. -->
	<label text="{item.title}" />
  </Template>
</listView>

<script>
    import { Template } from 'svelte-native/components'
    import { onMount } from 'svelte'
    import { ArticleStore, ArticleFilterType } from '../stores/articles'
    
    export let filtertype = ArticleFilterType.Global
    export let filterparam = null
    export let usertoken = null
    let items = new ArticleStore();
    $: items.loadArticles(filtertype, filterparam, usertoken)
	
</script>