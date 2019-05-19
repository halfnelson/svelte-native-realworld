<page  actionBarHidden="true">
    <gridLayout class="layout page"  rows="auto, *, auto" >
        <label row="0" text="{icons.close}" class="icon close-button" horizontalAlignment="right" on:tap={closeModal} />
        <stackLayout row="1" class="form" verticalAlignment="center" >
            <label text="Svelte-Native RealWorld" class="title" horizontalAlignment="center" />
            <stackLayout class="input-field m-t-10">
                <textField class="input" hint="Email" keyboardType="email" autocorrect="false" autocapitalizationType="none"
                    bind:text="{email}" returnKeyType="next" on:returnPress="{() => password_edit.nativeView.focus()}"
                    editable="{!isLoading}"/>
                <stackLayout class="hr-light"/>
            </stackLayout>

            <stackLayout class="input-field">
                <textField bind:text="{password}" bind:this={password_edit} class="input" hint="Password" secure="true" returnKeyType="done" on:returnPress="{doLogin}" editable="{!isLoading}" />
                <stackLayout class="hr-light"/>
            </stackLayout>

            <button text="Login" on:tap="{login}" class="btn m-t-20" isEnabled="{!isLoading}"/>

            <activityIndicator busy="{isLoading}" horizontalAlignment="center" verticalAlignment="center" class="activity-indicator" />
        </stackLayout>

        <label row="2" class="login-label sign-up-label" on:tap="{register}" horizontalAlignment="center">
            <formattedString>
                <span text="Don't have an account?"/>
                <span text=" Register" class="bold"/>
            </formattedString>
        </label>
    </gridLayout>
</page>
<style>
    .close-button {
        font-size: 25;
        padding: 10;
    }

    .btn {
        background-color: black;
        color: white;
    }

    .title {
        font-weight: bold;
        font-size: 20;
        margin-top: 20;
        margin-bottom: 20;
        color: black;
    }

    .form {
        padding: 20;
    }

    .sign-up-label {
        font-size: 15;
        padding: 10;
    }

    .bold {
        font-weight: bold;
        color: black;
    }

</style>

<script>
    import { icons } from '../utils/icons'
    import { alert } from 'tns-core-modules/ui/dialogs'
    import { closeModal, navigate } from 'svelte-native'
    import { onMount } from 'svelte'
    import { user_token, user_profile, login } from '../stores/user'
    import Register from './Register'

    let email, password, password_edit;
    let isLoading = false;

    onMount(()=> {
        if ($user_profile) {
            closeModal($user_profile);
        }
    })

    function doLogin() {
        login(email, password).then(
            user => closeModal(user),
            err => {
                if (err.errorCode == 422) {
                    alert("Invalid username/password")
                } else {
                    alert(err.message);
                }
            }
        )
    }

    function register() {
        navigate(
            { page: Register, clearHistory: true }
        );
    }
</script>