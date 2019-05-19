<page actionBarHidden="true">
    <gridLayout class="layout page"  rows="auto, *, auto" >
        <label row="0" text="{icons.close}" class="icon close-button" horizontalAlignment="right" on:tap={closeModal} />
        <stackLayout row="1" class="form" verticalAlignment="center" >
            <label text="Svelte-Native RealWorld" class="title" horizontalAlignment="center" />

            <stackLayout class="input-field m-t-10">
                <textField class="input" hint="Username" autocapitalizationType="none"
                    bind:text="{username}" returnKeyType="next" on:returnPress="{() => email_edit.nativeView.focus()}"
                    editable="{!isLoading}"/>
                <stackLayout class="hr-light"/>
            </stackLayout>

            <stackLayout class="input-field m-t-10">
                <textField class="input" hint="Email" keyboardType="email" autocorrect="false" autocapitalizationType="none"
                    bind:text="{email}" bind:this="{email_edit}" returnKeyType="next" on:returnPress="{() => password_edit.nativeView.focus()}"
                    editable="{!isLoading}"/>
                <stackLayout class="hr-light"/>
            </stackLayout>

            <stackLayout class="input-field">
                <textField bind:text="{password}" bind:this={password_edit} class="input" hint="Password" secure="true" returnKeyType="done" on:returnPress="{doRegister}" editable="{!isLoading}" />
                <stackLayout class="hr-light"/>
            </stackLayout>

            <button text="Register" on:tap="{doRegister}" class="btn m-t-20" isEnabled="{!isLoading}"/>

            <activityIndicator busy="{isLoading}" horizontalAlignment="center" verticalAlignment="center" class="activity-indicator" />
        </stackLayout>

        <label row="2" class="login-label" on:tap="{login}" horizontalAlignment="center">
            <formattedString>
                <span text="Already have an account?"/>
                <span text=" Login" class="bold"/>
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

    .login-label {
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
    import { user_token, user_profile, register } from '../stores/user'
    import Login from './Login'

    let email, email_edit, password, password_edit, username;
    let isLoading = false;

    onMount(()=> {
        if ($user_profile) {
            closeModal($user_profile);
        }
    })

    function login() {
       navigate({ page: Login, clearHistory: true });
    }

    function doRegister() {
        register(username, email, password).then(
            user => closeModal(user),
            err => {
                if (err.errorCode == 422) {
                    if (!err.errors || !err.errors.errors) {
                        alert("Invalid username/email/password")
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
        )
    }
</script>