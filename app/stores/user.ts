import { writable, derived, get } from 'svelte/store';
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
            if (value) {
                appSettings.setString('user_token', value); 
            } else {
                appSettings.remove('user_token');
            }
            user_token.set(value);
        }
    }
}

export const user_token = buildUserTokenStore();


function buildUserProfileStore() {
    const user_profile = writable(null)

    const user_profile_with_defaults = derived(user_profile, profile => {
        if (profile && !profile.image) {
            profile.image = "https://static.productionready.io/images/smiley-cyrus.jpg"
        }
        return profile;
    });

    return {
        subscribe: user_profile_with_defaults.subscribe,

        loadUserFromToken(user_token) {
            if (!user_token) return Promise.resolve(null);
            return client.sendRequest<UserResponse>('/user', 'GET', user_token)
                .then(userResponse => user_profile.set(userResponse.user))
        },

        set: user_profile.set
    }
}

export const user_profile = buildUserProfileStore();

export function logout() {
    user_profile.set(null);
    user_token.set(null);
}

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

interface ProfileUpdate {
    avatar_url: string
    bio: string
    email: string
    username: string
    new_password: string
}

export function update(update: ProfileUpdate):Promise<User> {
    let payload:any = {
        image: update.avatar_url,
        bio: update.bio,
        username: update.username,
        email: update.email,
    }
    if (update.new_password) {
        payload.new_password = update.new_password;
    }

    return client.sendRequest<UserResponse>('/user', 'PUT', get(user_token), {
        user: payload
    }).then(userResponse => {
        let user = userResponse.user;
        user_token.set(user.token);
        user_profile.set(user);
        return user;
    })
}


export function register(username: string, email: string, password: string):Promise<User> {
    return client.sendRequest<UserResponse>('/users', 'POST', null, {
        user: {
            username: username,
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

