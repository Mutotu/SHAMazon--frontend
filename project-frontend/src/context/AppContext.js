import { useState, userEffect, createContext } from 'react';

const AppContext = createContext();

function AppProvider({ children }) {

    const [user, setUser] = useState({});
    const [cart, setCart] = useState([]);

    const state = {
        userState: [user, setUser],
        cartState: [cart, setCart]
    }

    return (
        <AppContext.Provider value={state}>
            {children}
        </AppContext.Provider>
    )
}

export { AppContext, AppProvider };