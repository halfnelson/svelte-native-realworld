{#if $user_token && !$user_profile}
    <label text="Loading..."/>
{/if}
{#if !$user_token}
    <label text="Login" />
{/if}

{#if $user_profile}
    <label text="Logged in as {$user_profile.username}" />
{/if}




<script>
    import { user_token, user_profile } from '../stores/user'


</script>