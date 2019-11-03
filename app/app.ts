/*
In NativeScript, the app.ts file is the entry point to your application.
You can use this file to perform app-level initialization, but the primary
purpose of the file is to pass control to the app’s first module.
*/

import { svelteNative } from "svelte-native";
import  Sidedrawer from 'svelte-native-nativescript-ui/sidedrawer'
import App from "./App.svelte";


// register plugins
Sidedrawer.register();

//enable trace
//import { DomTraceCategory } from "svelte-native";
//import * as trace from "tns-core-modules/trace"
//trace.enable();
//trace.addCategories(DomTraceCategory)

svelteNative(App, {});

