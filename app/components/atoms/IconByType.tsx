import { BiSolidCarGarage } from 'react-icons/bi'
import {
	FaCarSide,
	FaFileContract,
	FaHands,
	FaMapMarkedAlt,
	FaPercentage,
	FaQuestion,
	FaRoute
} from 'react-icons/fa'
import { GiCarKey, GiHandTruck, GiTowTruck } from 'react-icons/gi'
import {
	MdDoneAll,
	MdOutlineCurrencyExchange,
	MdSupervisedUserCircle
} from 'react-icons/md'
import {
	BsCalendarEventFill,
	BsFillBuildingsFill,
	BsFillCartCheckFill,
	BsPeopleFill
} from 'react-icons/bs'
import { RiPassExpiredFill } from 'react-icons/ri'
import { PiFolderOpenLight } from 'react-icons/pi'
import { CgTimelapse } from 'react-icons/cg'
import { TbBrandVolkswagen, TbTruckReturn, TbZoomMoney } from 'react-icons/tb'
import { FaLocationDot, FaTruckArrowRight } from 'react-icons/fa6'
import { AiFillCalculator } from 'react-icons/ai'
import { IcoArrived, IcoBuildingTruck, IcoTripDeadline } from './icons'
import { IoDocumentsSharp } from 'react-icons/io5'
import { SiNubank } from 'react-icons/si'
import { IconType } from 'react-icons'
import { ComponentWithAs, IconProps } from '@chakra-ui/react'

/**
 *
 * @param type  'transport' | 'collect' | 'storage' | 'charge' | 'movement'
 * @returns
 */

export const iconByType = (
	type: string
): IconType | ComponentWithAs<'svg', IconProps> => {
	switch (type) {
		case 'clients':
			return BsPeopleFill
		case 'addresses':
			return FaMapMarkedAlt
		case 'drivers':
			return GiCarKey
		case 'vehicles':
			return FaCarSide
		case 'users':
			return MdSupervisedUserCircle
		case 'documents':
			return IoDocumentsSharp
		case 'bankaccounts':
			return SiNubank
		case 'company':
			return BsFillBuildingsFill
		case 'percent':
			return FaPercentage
		case 'brands':
			return TbBrandVolkswagen
		case 'budget':
			return AiFillCalculator
		case 'contract':
			return FaFileContract
		case 'transport':
			return GiTowTruck
		case 'collect':
			return FaHands
		case 'transporting':
			return GiTowTruck
		case 'collecting':
			return FaHands
		case 'storage':
			return BiSolidCarGarage
		case 'charge':
			return GiHandTruck
		case 'route':
			return FaRoute
		case 'movement':
			return MdOutlineCurrencyExchange
		case 'arrived':
			return IcoArrived
		case 'building':
			return IcoBuildingTruck
		case 'created':
			return PiFolderOpenLight
		case 'finished':
			return MdDoneAll
		case 'ready':
			return BsFillCartCheckFill
		case 'returning':
			return TbTruckReturn
		case 'traveling':
			return FaTruckArrowRight
		case 'tripCheckpoint':
			return FaLocationDot
		case 'tripArrived':
			return IcoArrived
		case 'closeTripDeadline':
			return IcoTripDeadline
		case 'closeServiceDeadline':
			return CgTimelapse
		case 'closeDeadline':
			return BsCalendarEventFill
		case 'closeExpiration':
			return RiPassExpiredFill
		case 'requestedBudget':
			return TbZoomMoney
		default:
			return FaQuestion
	}
}
