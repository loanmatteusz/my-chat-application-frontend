import { useContext } from "react";
import { AuthContext } from "../contexts/auth/AuthContext";
import { useNavigate } from "react-router-dom";

interface NavbarProps {
    username: string;
}

export const Navbar = (props: NavbarProps) => {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    function handleLogout() {
        auth.signout();
        navigate('/');
    }

    return (
        <div className="flex text-white items-center justify-between bg-slate-800 h-16 p-3">
            <div className="flex gap-3 items-center p-2">
                <img className="bg-white w-12 h-12 rounded-[50%] object-cover" src="https://e1.pxfuel.com/desktop-wallpaper/261/725/desktop-wallpaper-anime-icon-giyuu-giyuu-tomioka-aesthetic.jpg" alt="" />
                <span className="font-bold">{props.username}</span>
            </div>
            <button className="p-1 rounded-sm text-white text-sm font-semibold cursor-pointer underline"
                onClick={handleLogout}
            >
                Logout
            </button>
        </div>
    );
}
