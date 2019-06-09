<page>
    <actionBar title="">
        <BackButton />
    </actionBar>
    <scrollView>
        <Profile profile={profile} biolimit={0}/>
    </scrollView>
</page>


<script>
    import BackButton from './BackButton'
    import Profile from './Profile'
    export let profile;
</script>