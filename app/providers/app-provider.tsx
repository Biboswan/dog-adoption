'use client'

import { createContext, useCallback, useState  } from "react";
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
    setDogsFavourite: (favourites: string[]) => void;
}

const defaultState: AppContextType = {
    user: null,
    setUser: () => {}, // Placeholder function
    dogsFavourite: [],
    favouriteDog: () => {},
    unfavouriteDog: () => {},
    logout: () => {},
    setDogsFavourite: () => {}
};

export const AppContext = createContext<AppContextType>(defaultState);

type Props = {
    children: React.JSX.Element
};

const initializeUser = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
};

export const AppProvider = ({ children }: Props) => {
    const [user, setUser] = useState<User | null>(initializeUser());
    const [dogsFavourite, setDogsFavourite] = useState<string[]>(JSON.parse(localStorage.getItem('favouriteDogIds') ?? '[]'));
    const router = useRouter();

    // Function to favorite a dog
    const favouriteDog = useCallback((id: string) => {
        setDogsFavourite((prevFavourites) => {
            // Add dog ID if not already in favorites
            if (!prevFavourites.includes(id)) {
                const newFavouriteDogs = [...prevFavourites, id];

                localStorage.setItem('favouriteDogIds',JSON.stringify(newFavouriteDogs));
                return newFavouriteDogs;
            }
            return prevFavourites; // If already favorited, do nothing
        });
    },[]);

    // Function to unfavorite a dog
    const unfavouriteDog = useCallback((id: string) => {
        setDogsFavourite((prevFavourites) => {
            // Remove dog ID from favorites
            const newFavouriteDogs = prevFavourites.filter((dogId) => dogId !== id);
            localStorage.setItem('favouriteDogIds',JSON.stringify(newFavouriteDogs));
            return newFavouriteDogs;
        });
    },[]);

    const resetAll = useCallback(() => {
        setUser(null);
        setDogsFavourite([]);
    },[]);

    const handleLogout = useCallback(async () => {
        await logout();
        resetAll();
        router.push('/login');
    },[]);

    return <AppContext value={{user, logout: handleLogout, setDogsFavourite, setUser, dogsFavourite, favouriteDog, unfavouriteDog}}>{children}</AppContext>;
};
