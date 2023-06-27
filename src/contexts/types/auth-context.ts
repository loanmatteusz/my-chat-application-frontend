import { User } from "../../interfaces/User";

export type AuthContextType = {
    user: User;
    signin: (email: string, password: string) => Promise<boolean>;
    signout: () => void;
}
