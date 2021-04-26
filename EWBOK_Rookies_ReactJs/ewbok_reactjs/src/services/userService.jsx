import { UserManager } from 'oidc-client';
import { storeUserError, storeUser } from '../actions/authActions';

const config = {
	authority: 'https://localhost:44363',
	client_id: 'react_code_client',
	redirect_uri: 'http://localhost:3000/signin-oidc',
	response_type: 'code',
	scope: 'ewbokrookies.api openid profile',
	post_logout_redirect_uri: 'http://localhost:3000/signout-oidc',
};

const userManager = new UserManager(config);

export async function loadUserFromStorage(store) {
	try {
		let user = await userManager.getUser();
		if (!user) {
			return store.dispatch(storeUserError());
		}
		store.dispatch(storeUser(user));
	} catch (e) {
		console.error(`User not found: ${e}`);
		store.dispatch(storeUserError());
	}
}

export function signinRedirect() {
	return userManager.signinRedirect();
}

export function signinRedirectCallback() {
	return userManager.signinRedirectCallback();
}

export function signoutRedirect() {
	userManager.clearStaleState();
	userManager.removeUser();
	return userManager.signoutRedirect();
}

export function signoutRedirectCallback() {
	userManager.clearStaleState();
	userManager.removeUser();
	return userManager.signoutRedirectCallback();
}

export default userManager;
