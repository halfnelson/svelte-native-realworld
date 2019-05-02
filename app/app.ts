/*
In NativeScript, the app.ts file is the entry point to your application.
You can use this file to perform app-level initialization, but the primary
purpose of the file is to pass control to the app’s first module.
*/

import { svelteNative } from "svelte-native";
import { registerElement, NativeElementNode } from 'svelte-native/dom'
import { RadSideDrawer } from 'nativescript-ui-sidedrawer'

// register plugins
registerElement('radSideDrawer', () => new NativeElementNode('radSideDrawer', RadSideDrawer))


import App from  "./App.svelte";
svelteNative(App, {});

