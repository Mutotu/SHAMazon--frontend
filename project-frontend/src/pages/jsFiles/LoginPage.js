import '../cssFiles/LoginPage.css';

import axios from 'axios';
import env from 'react-dotenv';
import { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';

function LoginPage(props) {

    const defaultLoginInfo = {
        email: "",
        password: ""
    }

    const defaultSignupInfo = {
        username: "",
        email: "",
        password: ""
    }

    const { userState } = useContext(AppContext);
    const [user, setUser] = userState;
    const [loginInfo, setLoginInfo] = useState(defaultLoginInfo);
    const [signupInfo, setSignupInfo] = useState(defaultSignupInfo);

    function handleSignUpFormChange(e) {
        const { name, value } = e.target;
        setSignupInfo({
            ...signupInfo,
            [name]: value
        });
    }

    function handleLoginFormChange(e) {
        const { name, value } = e.target;
        setLoginInfo({
            ...loginInfo,
            [name]: value
        });
    }

    async function submitLogin(e) {
        e.preventDefault();
        const response = await axios.post(`${env.BACKEND_URL}/user/login`, { email: loginInfo.email, password: loginInfo.password });
        console.log(response);
        const { password, createdAt, updatedAt, ...userRest } = response.data.foundUser;
        setUser(userRest);
        localStorage.setItem('userId', userRest.id);
    }

    async function submitSignup(e) {
        e.preventDefault();
        const response = await axios.post(`${env.BACKEND_URL}/user/signup`, { username: signupInfo.username, email: signupInfo.email, password: signupInfo.password });
        console.log(response);
        const { password, createdAt, updatedAt, ...userRest } = response.data.user;
        setUser(userRest);
        localStorage.setItem('userId', userRest.id);
    }

    return (
        <div className='LoginPage'>
            <div>
                <h2>Login</h2>
                <form className='LoginForm' onSubmit={submitLogin}>
                    <div>
                        <label htmlFor='email'>Email: </label>
                        <input name="email" type="email" placeholder="Enter an email address" value={loginInfo.email} onChange={handleLoginFormChange} />
                    </div>
                    <div>
                        <label htmlFor='password'>Password: </label>
                        <input name="password" type="password" placeholder="Enter a password" value={loginInfo.password} onChange={handleLoginFormChange} />
                    </div>
                    <input type='submit' value="Login" />
                </form>
            </div>
            <div>
                <h2>Signup</h2>
                <form className='SignupForm' onSubmit={submitSignup}>
                    <div>
                        <label htmlFor='username'>Username: </label>
                        <input name="username" type="text" placeholder="Enter a username" value={signupInfo.username} onChange={handleSignUpFormChange} />
                    </div>
                    <div>
                        <label htmlFor='email'>Email: </label>
                        <input name="email" type="email" placeholder="Enter an email address" value={signupInfo.email} onChange={handleSignUpFormChange} />
                    </div>
                    <div>
                        <label htmlFor='password'>Password: </label>
                        <input name="password" type="password" placeholder="Enter a password" value={signupInfo.password} onChange={handleSignUpFormChange} />
                    </div>
                    <input type='submit' value="Signup" />
                </form>
            </div>
        </div>
    )
}

export default LoginPage;