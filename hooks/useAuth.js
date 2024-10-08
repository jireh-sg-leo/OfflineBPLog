import React from 'react';
import axios from 'axios';
import RNSecureStorage from 'rn-secure-storage';

import {BASE_URL} from '../config';
import {createAction} from '../utils/createAction';
import {sleep} from '../utils/sleep';

export function useAuth() {
    const [state, dispatch] = React.useReducer(
        (state, action) => {
            switch (action.type) {
                case 'SET_USER':
                    return {
                        ...state,
                        user: {...action.payload},
                    };
                case 'REMOVE_USER':
                    return {
                        ...state,
                        user: undefined,
                    };
                case 'SET_LOADING':
                    return {
                        ...state,
                        loading: action.payload,
                    };
                default:
                    return state;
            }
        },
        {
            user: undefined,
            loading: true,
        },
    );
    const auth = React.useMemo(
        () => ({
            login: async (email, password) => {
                const {data} = await axios.post(`${BASE_URL}/method/getdoc_rpm.api.user.get_apikey`, {
                    usr: email,
                    pw: password,
                });
                const user = {
                    email: email,
                    token: data.apikey,
                };
                await RNSecureStorage.setItem('user', JSON.stringify(user));
                dispatch(createAction('SET_USER', user));
            },
            logout: async () => {
                console.log('logout');
                await RNSecureStorage.removeItem('user');
                dispatch(createAction('REMOVE_USER'));
            },
            register: async (email, password) => {
                await sleep(2000);
                await axios.post(`${BASE_URL}/auth/local/register`, {
                    username: email,
                    email,
                    password,
                });
            },
        }),
        [],
    );
    React.useEffect(() => {
        sleep(2000).then(() => {
            RNSecureStorage.getItem('user').then(user => {
                if (user) {
                    dispatch(createAction('SET_USER', JSON.parse(user)));
                }
                dispatch(createAction('SET_LOADING', false));
            }).catch(err=>console.log(err));
        });
    }, []);
    return {auth, state};
}