import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {userData} from './mockData';
import userReducer, {userState} from "../userReducer.ts";
import {getCookie} from "../../../../utils/cookie.ts";
import {NORMA_API} from "../../../../utils/burger-api.ts";
import {LOGOUT_USER_SUCCESS, USER_PROFILE_SUCCESS, USER_REQUEST} from "../../types/userTypes.ts";
import {logoutUser, userProfileThunk} from "../../actions/userActions.ts";

describe('User reducers', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('should return the initial state', () => {
        expect(userReducer(undefined, {payload: undefined})).toEqual(
            userState
        );
    });

    it('get profile reducer', async () => {
        // eslint-disable-next-line no-undef
        const mockFetch = jest.spyOn(global, 'fetch').mockResolvedValueOnce({
            json: jest.fn().mockResolvedValueOnce(userData),
            ok: true,
        });
        const middlewares = [thunk];
        const mockStore = configureMockStore(middlewares);
        const store = mockStore();

        await store.dispatch(userProfileThunk());
        const actions = store.getActions();

        expect(actions[0]).toMatchObject({
            type: USER_REQUEST,
        });

        expect(actions[1]).toEqual(
            expect.objectContaining({
                type: USER_PROFILE_SUCCESS,
                payload: {success: true, user: {email: 'maslovichas1985@gmail.com', name: 'Алексей'}},
            })
        );

        expect(mockFetch).toHaveBeenCalledWith(`${NORMA_API}/auth/user`, {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                Authorization: getCookie('accessToken')
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer'
        });
    });

    it('user logout reducer', async () => {
        // eslint-disable-next-line no-undef
        const mockFetch = jest.spyOn(global, 'fetch').mockResolvedValueOnce({
            json: jest.fn().mockResolvedValueOnce(userData),
            ok: true,
        });
        const middlewares = [thunk];
        const mockStore = configureMockStore(middlewares);
        const store = mockStore();

        await store.dispatch(logoutUser());
        const actions = store.getActions();

        expect(actions[0]).toMatchObject({
            type: USER_REQUEST,
        });

        expect(actions[1]).toEqual(
            expect.objectContaining({
                type: LOGOUT_USER_SUCCESS,
            })
        );

        expect(mockFetch).toHaveBeenCalledWith(`${NORMA_API}/auth/logout`, {
            body: '{}',
            headers: {'Content-Type': 'application/json;charset=utf-8'},
            method: 'POST',
        });
    });
});