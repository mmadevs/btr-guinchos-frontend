import { useSearch } from '@/app/context/search'
import {
	IconButton,
	Input,
	InputGroup,
	InputLeftElement
} from '@chakra-ui/react'
import { FaFilter } from 'react-icons/fa'

export const SearchComponent = () => {
	const { searchString, setSearchString } = useSearch()
	return (
		<InputGroup>
			<InputLeftElement>
				<IconButton
					variant={'ghost'}
					borderRightRadius={'0'}
					color='white'
					_hover={{ bg: 'transparent', color: 'yellow' }}
					_active={{ bg: 'transparent', color: 'yellow' }}
					icon={<FaFilter />}
					aria-label='Filtros'
				></IconButton>
			</InputLeftElement>
			<Input
				value={searchString}
				variant={'filled'}
				bg={'gray.800'}
				color={'white'}
				_hover={{ bg: 'gray.700' }}
				onChange={(e) =>
					setSearchString && setSearchString(e.target.value)
				}
			/>
		</InputGroup>
	)
}
