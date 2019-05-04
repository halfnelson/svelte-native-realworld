<stackLayout class="drawerContent">
	<User />
  <label text="Popular Tags" class="tag-heading" />
	<wrapLayout orientation="horizontal" class="tags">
		{#each $tags as tag}
		<label text="{tag}" class="tag" />
		{/each}
	</wrapLayout>
</stackLayout>

<script>
  import User from "./User.svelte";
  import { tags } from "../stores/tags";
</script>

<style>
  .drawerContent {
    background-color: #eeeeee;
  }
  .tag-heading {
    font-size: 15;
    margin-top: 15;
    margin-bottom: 5;
    margin-left: 20;
  }
  .tags {
    padding: 0 10;
  }
  .tag {
    color: white;
    font-size: 12;
    background-color: #555;
    border-radius: 12;
    padding: 5 10;
    margin: 2;
  }
</style>