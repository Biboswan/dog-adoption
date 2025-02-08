'use client'

import { createContext, useCallback, useEffect, useState  } from "react";
import { logout } from "@/app/lib/api/auth";
import { useRouter } from "next/navigation";

interface User {
    name: string;
    email: string;
}

interface AppContextType {
    user: User | null;
    setUser: (user: User | null) => void;
    dogsFavourite: string[];
    favouriteDog: (id: string) => void;
    unfavouriteDog: (id: string) => void;
    logout: () => void;
}

const defaultState: AppContextType = {
    user: null,
    setUser: () => {}, // Placeholder function
    dogsFavourite: [],
    favouriteDog: () => {},
    unfavouriteDog: () => {},
    logout: () => {}
};

export const AppContext = createContext<AppContextType>(defaultState);

type Props = {
    children: React.JSX.Element
};

export const AppProvider = ({ children }: Props) => {
    const [user, setUser] = useState<User | null>(null);
    const [dogsFavourite, setDogsFavourite] = useState<string[]>([]);
    const router = useRouter();

    useEffect(() => {
        const now = new Date();
        const expiryTime = localStorage.getItem('expiryTime');
        if (!expiryTime || (now>new Date(expiryTime))) {
            router.push('/login');
            //return redirect('/login');
        } else {
            const userCredentials = localStorage.getItem('user');
            userCredentials && setUser(JSON.parse(userCredentials));
        }
    },[]);

    // Function to favorite a dog
    const favouriteDog = useCallback((id: string) => {
        setDogsFavourite((prevFavourites) => {
            // Add dog ID if not already in favorites
            if (!prevFavourites.includes(id)) {
                return [...prevFavourites, id];
            }
            return prevFavourites; // If already favorited, do nothing
        });
    },[]);

    // Function to unfavorite a dog
    const unfavouriteDog = useCallback((id: string) => {
        setDogsFavourite((prevFavourites) => {
            // Remove dog ID from favorites
            return prevFavourites.filter((dogId) => dogId !== id);
        });
    },[]);

    const handleLogout = useCallback(async () => {
        await logout();
        setUser(null);
        setDogsFavourite([]);
    },[])

    return <AppContext value={{user, logout: handleLogout, setUser, dogsFavourite, favouriteDog, unfavouriteDog}}>{children}</AppContext>;
};
