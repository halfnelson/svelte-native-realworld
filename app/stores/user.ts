import { writable } from 'svelte/store';
import { client } from '../lib/client'
import * as appSettings from 'tns-core-modules/application-settings'
import { User } from '~/models/user';

interface UserResponse {
    user: User;
}

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
            return client.sendRequest<UserResponse>('/user', 'GET', user_token)
                .then(userResponse => user_profile.set(userResponse.user))
        },
        set: user_profile.set
    }
}

export const user_profile = buildUserProfileStore();

export function login(email: string, password: string):Promise<User> {
    return client.sendRequest<UserResponse>('/users/login', 'POST', null, {
        user: {
            email: email,
            password: password
        }
    }).then(userResponse => {
        let user = userResponse.user;
        user_token.set(user.token);
        user_profile.set(user);
        return user;
    })
}

