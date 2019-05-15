<page>
    <actionBar title="">
        <label text="{icons['arrow-left']}" class="icon back-button" horizontalAlignment="left" verticalAlignment="center" position="left" on:tap={goBack}/>
    </actionBar>
    <scrollView>
        <Profile profile={profile} biolimit={0}/>
    </scrollView>
</page>

<style>
 .back-button {
    margin-right: 5;
    padding: 10 10 10 0;
 }
</style>

<script>
    import Profile from './Profile'
    import { icons } from '../utils/icons'
    import { goBack } from 'svelte-native'
    export let profile;
</script>