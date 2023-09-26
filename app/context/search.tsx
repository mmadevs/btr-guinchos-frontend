'use client'
import {
	Dispatch,
	FunctionComponent,
	ReactNode,
	SetStateAction,
	createContext,
	useContext,
	useState
} from 'react'

interface ISearchFilters {
	stringValues?: { key: string; allowedValues: string[] }
	numberValues?: { key: string; allowedValues: number[] }
	numbers?: { key: string; min: number; max: number }[]
	periods?: { key: string; start: Date; end: Date }[]
}
interface ISearchContext {
	searchString: string
	setSearchString: Dispatch<SetStateAction<string>>
	searchFilters: ISearchFilters
	setSearchFilters: Dispatch<SetStateAction<ISearchFilters>>
}

const SearchContext = createContext<ISearchContext>({} as ISearchContext)

export const SearchProvider: FunctionComponent<{ children: ReactNode }> = ({
	children
}) => {
	const [searchString, setSearchString] = useState('')
	const [searchFilters, setSearchFilters] = useState({} as ISearchFilters)

	return (
		<SearchContext.Provider
			value={{
				searchString,
				setSearchString,
				searchFilters,
				setSearchFilters
			}}
		>
			{children}
		</SearchContext.Provider>
	)
}

export const useSearch = () => {
	return useContext(SearchContext)
}
