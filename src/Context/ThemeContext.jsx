import { createContext, useState } from "react";

export const ThemeContext = createContext()

// Context : where we declared state and functions 
export const ThemeProvider = ({children}) => {
    const [theme, setTheme] = useState("light")

    const toggleTheme = () => {
        setTheme((prev)=>(prev =='light'? 'dark': 'light'))
    }

    const Value = { theme, toggleTheme }
    
    // Declare provider which will pass state and functions in to components
    return (
        <ThemeContext.Provider value={Value}>
            <div className={theme}>{children}</div>
        </ThemeContext.Provider>
    )
}