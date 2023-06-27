import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/auth/AuthContext";

export const Login = () => {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    async function handleLogin() {
        if (email && password) {
            const isLogged = await auth.signin(email, password);
            if (isLogged) {
                navigate('/chat');
            } else {
                console.log('Login não deu certo!');
                // navigate('/');
            }
        }
    }

    return (
        <div className="flex w-full justify-center items-center bg-slate-800 h-[100vh]">
            <div className="flex flex-col items-center gap-3 bg-white py-10 px-14 rounded-md">
                <span className="text-gray-800 font-bold text-2xl">MyChat</span>
                <span className="text-gray-800 text-md">Login</span>
                <div className="flex flex-col gap-4">
                    <input className="w-72 p-2 text-black border-b-2 border-gray-400 outline-none" type="email" placeholder="Email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                    <input className="w-72 p-2 text-black border-b-2 border-gray-400 outline-none" type="password" placeholder="Password"
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                    />
                    <button className="bg-gray-800 p-3 text-white font-bold border-none cursor-pointer"
                        onClick={handleLogin}
                    >
                        Sign In
                    </button>
                </div>
                <p className="text-gray-800 text-sm mt-3">You don't have an account? <Link to='/register'>Register</Link></p>
            </div>
        </div>
    );
}
