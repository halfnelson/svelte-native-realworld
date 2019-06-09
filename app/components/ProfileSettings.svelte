<gridLayout rows="auto, *">
    <gridLayout row="0" rows="auto" columns="auto,*,auto" class="action-bar p-10" style="background-color: white; border-bottom-color: lightgray; border-bottom-width: 1;">
        <button text="{icons.close}" class="icon text-left action-item" row="0" col="0" on:tap={onClose} width="42" style="font-size: 20"/>
        <label row="0" col="1" text="Edit Settings" style="font-size: 20;" verticalAlignment="center" horizontalAlignment="left" />
        {#if !isLoading}
        <button text="Save" class="text-right action-item" row="0" col="2" on:tap={onSave} />
        {:else}
        <activityIndicator busy={true} width="32" row="0" col="2" />
        {/if}
    </gridLayout>

    <scrollView row="1">
     <stackLayout class="form" >
            <stackLayout class="input-field m-t-10">
                <textField class="input" hint="Avatar Image Url" keyboardType="url" autocorrect="false" autocapitalizationType="none"
                    bind:text="{avatar_url}" returnKeyType="next" on:returnPress="{() => username_edit.nativeView.focus()}"
                    editable="{!isLoading}"/>
                <stackLayout class="hr-light"/>
            </stackLayout>

            <stackLayout class="input-field">
                <textField class="input" bind:this={username_edit}  hint="Username" autocorrect="false" autocapitalizationType="none"
                    bind:text="{username}" returnKeyType="next" on:returnPress="{() => email_edit.nativeView.focus()}"
                    editable="{!isLoading}"/>
                <stackLayout class="hr-light"/>
            </stackLayout>

            <stackLayout class="input-field">
                <textField class="input" bind:this={email_edit}  hint="Email" keyboardType="email" autocorrect="false" autocapitalizationType="none"
                    bind:text="{email}" returnKeyType="next" on:returnPress="{() => password_edit.nativeView.focus()}"
                    editable="{!isLoading}"/>
                <stackLayout class="hr-light"/>
            </stackLayout>

            <stackLayout class="input-field">
                <textField bind:text="{password}" bind:this={password_edit} class="input" hint="New Password" secure="true" returnKeyType="next" on:returnPress="{() => bio_edit.nativeView.focus()}" editable="{!isLoading}" />
                <stackLayout class="hr-light"/>
            </stackLayout>

            <stackLayout class="input-field">
                <textView hint="Short bio about you" bind:this={bio_edit} bind:text={bio} class="m-10 input" editable={!isLoading} />
                <stackLayout class="hr-light"/>
            </stackLayout>
            <button text="Save" on:tap="{onSave}" class="btn btn-primary m-t-20"/>

            <button text="Logout" on:tap="{onLogout}" class="btn m-t-20"/>
           
       </stackLayout>
    </scrollView>
</gridLayout>

<style>
 .btn {
        background-color: white;
        color: black;
    }
 .btn.btn-primary {
     background-color: black;
     color: white;
 }

</style>
<script>
    import { icons } from '../utils/icons';
    import { closeModal } from 'svelte-native'
    import { user_profile, update, logout } from '../stores/user'
    let isLoading = false;

    let avatar_url = $user_profile.image || ""
    let email = $user_profile.email || ""
    let username = $user_profile.username || ""
    let bio = $user_profile.bio || ""
    let password = ""
    
    let username_edit, bio_edit, email_edit, password_edit

    async function onSave() {
        isLoading = true;
        try {
            let new_user = await update({
                avatar_url: avatar_url,
                bio: bio,
                email: email,
                username: username,
                new_password: password
            });
           closeModal(new_user);
        } catch (err) {
            isLoading = false;
            if (err.errorCode == 422) {
                if (!err.errors || !err.errors.errors) {
                    alert("Invalid profile")
                } else {
                    let msg =""
                    let errs = err.errors.errors;
                    for (let field of Object.keys(errs)) {
                        msg += `${field}:\n  ${errs[field][0]}\n\n`
                    }
                    alert({
                        title: "Validation Problem",
                        message: msg
                    })
                }
            } else {
                alert(err.message);
            }
        }
    }

    function onLogout() {
        logout();
        closeModal(null);
    }

    function onClose() {
        closeModal(null);
    }
</script>