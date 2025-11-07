import React, { useState } from 'react';
import '../auth.css'
import useLogin from '../hooks/useLogin';
import useSignup from '../hooks/useSignup';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { checkAuth } from '../utils/checkAuth';
import { useAuthContext } from '../context/authContext';


const Login = () => {
    const navigate=useNavigate();
    const { loading, loginUser } = useLogin();
    const { signupUser } = useSignup();
    const {authUser, setAuthUser}= useAuthContext();

    const [isSignUpMode, setIsSignUpMode] = useState(false);
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const [usernameSignup, setUsernameSignup] = useState("")
    const [emailSignup, setEmailSignup] = useState("")
    const [passwordSignup, setPasswordSignup] = useState("")

    useEffect(() => {
        const init = async () => {
            const user = await checkAuth();            
            if (user) {
                setTimeout(() => {
                    navigate("/");
                }, 1000);
                setAuthUser(user)
            }
        };
        init();
    }, []);

    
    const toggleMode = () => {
        setIsSignUpMode(!isSignUpMode);
    };

    const handleSubmitLogin = async (e) => {
        e.preventDefault();
        if (!username || !password) {
            toast.error("Please fill in all fields");
            return;
        }
        try {
            await loginUser(username, password)
            setUsername("");
            setPassword("");
            navigate("/")
        } catch (error) {
            toast.error(error.message)
        }

    }

    const handleSignInByGoogle = async()=>{
        window.location.href="/api/auth/google";
    }

    const handleSubmitSignup = async (e) => {
        e.preventDefault();
        if (!usernameSignup || !emailSignup || !passwordSignup) {
            toast.error("Please fill in all fields");
            return;
        }
        try {
            await signupUser(usernameSignup, emailSignup, passwordSignup)
            setUsernameSignup("");
            setEmailSignup("");
            setPasswordSignup("");
            navigate("/")
        } catch (error) {
            toast.error(error.message)
        }

    }

    return (
        <div className={`container ${isSignUpMode ? 'sign-up-mode' : ''}`}>
            <div className="forms-container">
                <div className="signin-signup">
                    {/* Sign In Form */}
                    <form onSubmit={(e) => handleSubmitLogin(e)} className="sign-in-form">
                        <h2 className="title">Sign In</h2>
                        <div className="input-field">
                            <i className="fas fa-user"></i>
                            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" name='username' />
                        </div>
                        <div className="input-field">
                            <i className="fas fa-lock"></i>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" name='password' />
                        </div>
                        <input type="submit" value="Login" className="btn solid" />
                    </form>
                    <button onClick={handleSignInByGoogle}>Sign In with Google</button>

                    {/* Sign Up Form */}
                    <form className="sign-up-form" onSubmit={(e) => handleSubmitSignup(e)}>
                        <h2 className="title">Sign Up</h2>
                        <div className="input-field">
                            <i className="fas fa-user"></i>
                            <input type="text" value={usernameSignup} onChange={(e) => setUsernameSignup(e.target.value)} placeholder="Username" name='usernameSignup' />
                        </div>
                        <div className="input-field">
                            <i className="fas fa-envelope"></i>
                            <input type="email" value={emailSignup} onChange={(e) => setEmailSignup(e.target.value)} placeholder="Email" name='emailSignup' />
                        </div>
                        <div className="input-field">
                            <i className="fas fa-lock"></i>
                            <input type="password" value={passwordSignup} onChange={(e) => setPasswordSignup(e.target.value)} placeholder="Password" name='passwordSignup' />
                        </div>
                        <input type="submit" value="Sign Up" className="btn solid" />
                    </form>
                </div>
            </div>

            <div className="panels-container">
                <div className="panel left-panel">
                    <div className="content">
                        <h3>New here?</h3>
                        <p>Join us and start applying for the jobs!</p>
                        <button className="btn transparent" onClick={toggleMode}>Sign Up</button>
                    </div>
                </div>

                <div className="panel right-panel">
                    <div className="content">
                        <h3>One of us?</h3>
                        <p>Sign in and continue your journey with us!</p>
                        <button className="btn transparent" onClick={toggleMode}>Sign In</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
