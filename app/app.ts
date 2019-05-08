/*
In NativeScript, the app.ts file is the entry point to your application.
You can use this file to perform app-level initialization, but the primary
purpose of the file is to pass control to the app’s first module.
*/

import { svelteNative, DomTraceCategory } from "svelte-native";
import { registerElement, NativeElementNode } from 'svelte-native/dom'
import { RadSideDrawer } from 'nativescript-ui-sidedrawer'

import * as trace from "tns-core-modules/trace"

// register plugins
registerElement('radSideDrawer', () => new NativeElementNode('radSideDrawer', RadSideDrawer))


//enable trace
//trace.enable();
trace.addCategories(DomTraceCategory)


import App from  "./App.svelte";
svelteNative(App, {});

