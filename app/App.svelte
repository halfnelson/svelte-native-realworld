<page>
    <actionBar>
        <gridLayout columns="auto, *" rows="*" style="width: 100%;" horizontalAlignment="left">
            <label text="{icons.menu}" row="0" col="0" class="icon" horizontalAlignment="left"
                verticalAlignment="center" on:tap="{() => side_drawer.nativeView.toggleDrawerState() }" ></label>
            <label text="Home" row="0" col="1" class="title" horizontalAlignment="left"
                verticalAlignment="center"></label>
        </gridLayout>
    </actionBar>
    <radSideDrawer bind:this="{side_drawer}">
        <radSideDrawer.drawerContent>
            <stackLayout class="drawerContent">
                <label text="Drawer" class="h1 text-center" />
            </stackLayout>
        </radSideDrawer.drawerContent>
        <radSideDrawer.mainContent>
            <ArticleList filtertype="{ $user_token ? 'feed' : 'global' }"  usertoken="{ $user_token }" />
        </radSideDrawer.mainContent>
    </radSideDrawer>
</page>

<style>
    actionBar {
        background-color: black;
        color: white;
    }

    .drawerContent {
        background-color: #eeeeee;
    }
</style>

<script>
    import { icons } from './utils/icons'
    import ArticleList from './components/ArticleList.svelte'
    import { user_token } from './stores/user'

    let side_drawer;
    
</script>