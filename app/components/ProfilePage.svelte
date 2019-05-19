<page actionBarHidden="true">
    <gridLayout rows="auto, *">
        <stackLayout row="0">
            <Profile profile={profile} biolimit={80} />
        </stackLayout>
        <label row="0" text="{icons['arrow-left']}" class="icon action-icon back-button" horizontalAlignment="left" on:tap={goBack} />
        {#if $user_profile && profile.username == $user_profile.username}
        <label row="0" text="{icons.edit}" class="icon action-icon" horizontalAlignment="right" />
        {/if}
        <tabView row="1"> 
            <tabViewItem title="Posts" >
                <ArticleList filtertype="author" filterparam="{profile.username}"  usertoken="{ $user_profile ? $user_profile.token : null }" />
            </tabViewItem>
            <tabViewItem title="Favorites">
                <ArticleList filtertype="favorited" filterparam="{profile.username}" usertoken="{ $user_profile ? $user_profile.token : null }" />
            </tabViewItem>
        </tabView>
	</gridLayout>
</page>
<style>
    .action-icon {
        font-size: 22;
        padding: 10 15;
    }
</style>
<script>
    import { user_profile } from '../stores/user'
    import { icons } from '../utils/icons'
    import Profile from './Profile'
    import ArticleList from './ArticleList'
    import { goBack } from 'svelte-native'
    export let profile
  
</script>