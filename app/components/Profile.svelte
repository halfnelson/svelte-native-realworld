<script>
    import { user_profile } from "../stores/user";
    import { navigate, showModal } from 'svelte-native';
    import ProfileBio from './ProfileBio';
    import ProfileSettings from './ProfileSettings'
    export let profile;
    export let biolimit = 80
    const preview_length = 80;
    let bio_preview;
    $: bio_preview = profile.bio  ? (biolimit ? profile.bio.substring(0, biolimit) + "..." : profile.bio) : null;
    $: avatar_url = profile.image ? profile.image : "https://static.productionready.io/images/smiley-cyrus.jpg";

    function show_bio() {
        navigate({page: ProfileBio, props: { profile: profile }})
        console.log("show bio");
    }

    async function show_settings() {
      let updated_user =  await showModal({page: ProfileSettings, fullscreen: true})
      if (updated_user) {
        profile = $user_profile
      }
    }
</script>

<style>
  .readmore {
    text-transform: uppercase;
    margin-top: 5;
    font-size: 12;
  }
  .profile-image {
    height: 64;
    width: 64;
    border-radius: 50%;
    margin-right: 10;
  }
  .profile-name {
    font-weight: bold;
    color: black;
    font-size: 18;
    margin: 0 0;
  }

  button {
    margin: 10 0 0 0;
    padding: 0;
    height: 24;
    border-radius: 50%;
  }

  .following-button {
    background-color: #777;
    color: white;
    height: 32;
  }

  .follow-button {
    color: #777;
    border-width: 1;
    border-color: #777;
    background-color: white;
    height: 32;
  }

  .user-profile {
    background-color: white;
    padding: 20 20 10 20;
  }
  .user-bio {
    margin-top: 10;
  }
</style>

<stackLayout class="user-profile">
  <stackLayout orientation="horizontal" horizontalAlignment="center">
    <image
      src={avatar_url}
      class="profile-image"
      horizontalAlignment="left"
      stretch="aspectFill" />
    <stackLayout>
      <label
        text={profile.username}
        class="profile-name"
        horizontalAlignment="left" />
        {#if $user_profile && profile.username == $user_profile.username}
          <button
              text="Settings"
              class="follow-button"
              horizontalAlignment="center"
              on:tap={show_settings} />
        {:else}
          {#if profile.following}
            <button
              text="Following"
              class="following-button"
              horizontalAlignment="center" />
          {:else}
            <button
              text="Follow"
              class="follow-button"
              horizontalAlignment="center" />
          {/if}
        {/if}
    </stackLayout>
  </stackLayout>
  {#if profile.bio}
    <stackLayout on:tap={show_bio}>
      <label
        text={bio_preview}
        textWrap="true"
        class="user-bio"
        horizontalAlignment="center" />
      {#if profile.bio && biolimit && profile.bio.length > preview_length}
        <label
          text="Read More..."
          class="readmore"
          horizontalAlignment="right" />
      {/if}
    </stackLayout>
  {/if}
</stackLayout>
