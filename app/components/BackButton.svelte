  <label text="{icons['arrow-left']}" class="icon back-button" verticalAlignment="center" horizontalAlignment="left" on:tap={goBack}/>
  <style>
     .back-button {
        margin-right: 5;
        padding: 10 10 10 0;
    }
  </style>
  <script>
    import { icons } from '../utils/icons'
    import { goBack } from 'svelte-native'
  </script>