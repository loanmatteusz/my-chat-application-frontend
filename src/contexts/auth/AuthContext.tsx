import { createContext } from 'react';
import { AuthContextType } from '../types/auth-context';

export const AuthContext = createContext<AuthContextType>(null!);
