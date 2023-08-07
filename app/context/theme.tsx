import { FunctionComponent, ReactNode, createContext } from 'react'

const ThemeContext = createContext<{}>({})

const ThemeProvider: FunctionComponent<{ children: ReactNode }> = ({
	children
}) => {
	return <ThemeContext.Provider value={{}}>{children}</ThemeContext.Provider>
}
