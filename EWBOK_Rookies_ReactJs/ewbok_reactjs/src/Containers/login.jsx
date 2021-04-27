import React from 'react';
import { signinRedirect } from '../services/userService';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Login() {
	const user = useSelector((state) => state.auth.user);

	function login() {
		signinRedirect();
	}

	return user ? (
		<Redirect to={'/'} />
	) : (
		<div class="main-content">
			<div class="container-fluid content-top-gap">
				<h1>Hello!</h1>
				<h1>Welcome to EWBOK.</h1>
				<h6>Please login before play with us.</h6>
				<h6>Start by signing in.</h6>
				<br />
				<button class="btn btn-primary btn-style " onClick={() => login()}>
					Login
				</button>
			</div>
		</div>
	);
}

export default Login;
