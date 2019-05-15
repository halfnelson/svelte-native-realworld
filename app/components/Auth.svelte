<frame defaultPage={ auth_type == 'login' ? Login : Register } />

<script>
    import Login from './Login'
    import Register from './Register'
    export let auth_type = 'login'
</script>