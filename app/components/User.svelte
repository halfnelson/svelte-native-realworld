<gridLayout rows="auto" class="user-profile">
	{#if loading}
	<stackLayout row="0" horizontalAlignment="left">
		<activityIndicator busy="{true}" />
		<label text="Loading..." class="profile-name" />
	</stackLayout>
	{:else}
	<stackLayout row="0" horizontalAlignment="left" >
		<image src="{display_profile.image}" class="profile-image" horizontalAlignment="left" />
		<label text="{display_profile.username}" class="profile-name" />
		<stackLayout orientation="horizontal" class="profile-actions">
			{#if $user_profile}
			<label text="See profile" class="profile-action" />
			{:else}
			<label text="Login" class="profile-action" on:tap={login} />
			<label text="Sign Up" class="profile-action" />
			{/if}
		</stackLayout>
	</stackLayout>
	{/if}
</gridLayout>

<style>
    .user-profile {
        background-color: white;
        padding: 30 20 20 20;
    }
    .profile-image {
        height: 64;
        width: 64;
        border-radius: 50%;
    }
    .profile-name {
        margin: 10 0;
        font-weight: bold;
        color: black;
    }
    
    .profile-actions .profile-action {
        margin-right: 20;
    }
</style>

<script>
    import { showModal } from 'svelte-native';
    import LoginPage from './Login.svelte';
    import { user_token, user_profile } from "../stores/user";
    let loading, display_profile
    let anonymous_profile = {
        image: "https://static.productionready.io/images/smiley-cyrus.jpg",
        username: "Anonymous"
    }

    $: loading = $user_token && !$user_profile;
    $: display_profile = $user_profile || anonymous_profile

    function login() {
        showModal({ page: LoginPage, fullscreen: true });
    }
</script>