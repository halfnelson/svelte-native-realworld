<page>
    <actionBar>
        <gridLayout columns="auto, *" rows="*" style="width: 100%;" horizontalAlignment="left">
            <label text="{icons.menu}" row="0" col="0" class="icon" horizontalAlignment="left"
                verticalAlignment="center"></label>
            <label text="Home" row="0" col="1" class="title" horizontalAlignment="left"
                verticalAlignment="center"></label>
        </gridLayout>
    </actionBar>
    <radSideDrawer>
        <radSideDrawer.drawerContent>
            <stackLayout class="drawerContent">
                <label text="Drawer" class="h1 text-center" />
            </stackLayout>
        </radSideDrawer.drawerContent>
        <radSideDrawer.mainContent>
            <stackLayout class="p-20">
                <label text="Main" class="h1 text-center" />
            </stackLayout>
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

</script>