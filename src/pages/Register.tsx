import { Link } from 'react-router-dom';
import AddAvatar from '../assets/addAvatar.png';


export const Register = () => {
    return (
        <div className="flex w-full justify-center items-center bg-slate-800 h-[100vh]">
            <div className="flex flex-col items-center gap-3 bg-white py-5 px-14 rounded-md">
                <span className="text-gray-800 font-bold text-2xl">MyChat</span>
                <span className="text-gray-800 text-md">Register</span>
                <form className="flex flex-col gap-4">
                    <input className="w-72 p-2 text-black border-b-2 border-gray-400 outline-none" type="text" placeholder="Display name" />
                    <input className="w-72 p-2 text-black border-b-2 border-gray-400 outline-none" type="email" placeholder="Email" />
                    <input className="w-72 p-2 text-black border-b-2 border-gray-400 outline-none" type="password" placeholder="Password" />
                    <input className="hidden" type="file" id="file" />
                    <label className='flex items-center gap-3 text-gray-400 cursor-pointer' htmlFor="file">
                        <img className='w-8' src={AddAvatar} alt=""  />
                        <span>Add an avatar</span>
                    </label>
                    <button className="bg-gray-800 p-3 text-white font-bold border-none cursor-pointer">
                        Sign Up
                    </button>
                </form>
                <p className="text-gray-800 text-sm mt-3">You do have an account? <Link to='/signin'>Login</Link></p>
            </div>
        </div>
    );
}
