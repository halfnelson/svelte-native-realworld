import { writable } from 'svelte/store';
import { client } from '../lib/client'
import * as appSettings from 'tns-core-modules/application-settings'
import { User } from '~/models/user';

function buildUserTokenStore() {
    var stored_token = appSettings.getString('user_token', null);
    const user_token = writable(stored_token);
    return {
        subscribe: user_token.subscribe,
        set(value: string) {
            appSettings.setString('user_token', value);
            user_token.set(value);
        }
    }
}

export const user_token = buildUserTokenStore();


function buildUserProfileStore() {
    const user_profile = writable(null); 
    return {
        subscribe: user_profile.subscribe,
        loadUserFromToken(user_token) {
            if (!user_token) return Promise.resolve(null);
            return client.sendRequest<User>('/user', 'GET', user_token)
                .then(user => user_profile.set(user))
        },
        set: user_profile.set
    }
}

export const user_profile = buildUserProfileStore();



