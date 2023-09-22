import { BiSolidCarGarage } from 'react-icons/bi'
import { FaFileContract, FaHands, FaQuestion, FaRoute } from 'react-icons/fa'
import { GiHandTruck, GiTowTruck } from 'react-icons/gi'
import { MdDoneAll, MdOutlineCurrencyExchange } from 'react-icons/md'
import { BsCalendarEventFill, BsFillCartCheckFill } from 'react-icons/bs'
import { RiPassExpiredFill } from 'react-icons/ri'
import { PiFolderOpenLight } from 'react-icons/pi'
import { CgTimelapse } from 'react-icons/cg'
import { TbTruckReturn, TbZoomMoney } from 'react-icons/tb'
import { FaLocationDot, FaTruckArrowRight } from 'react-icons/fa6'
import { AiFillCalculator } from 'react-icons/ai'
import { IcoArrived, IcoBuildingTruck, IcoTripDeadline } from './icons'

/**
 *
 * @param type  'transport' | 'collect' | 'storage' | 'charge' | 'movement'
 * @returns
 */
export const IconByType = ({ type }: { type: string }) => {
	switch (type) {
		case 'budget':
			return <AiFillCalculator />
		case 'contract':
			return <FaFileContract />
		case 'transport':
			return <GiTowTruck />
		case 'collect':
			return <FaHands />
		case 'transporting':
			return <GiTowTruck />
		case 'collecting':
			return <FaHands />
		case 'storage':
			return <BiSolidCarGarage />
		case 'charge':
			return <GiHandTruck />
		case 'route':
			return <FaRoute />
		case 'movement':
			return <MdOutlineCurrencyExchange />
		case 'arrived':
			return <IcoArrived />
		case 'building':
			return <IcoBuildingTruck />
		case 'created':
			return <PiFolderOpenLight />
		case 'finished':
			return <MdDoneAll />
		case 'ready':
			return <BsFillCartCheckFill />
		case 'returning':
			return <TbTruckReturn />
		case 'traveling':
			return <FaTruckArrowRight />
		case 'tripCheckpoint':
			return <FaLocationDot />
		case 'tripArrived':
			return <IcoArrived />
		case 'closeTripDeadline':
			return <IcoTripDeadline />
		case 'closeServiceDeadline':
			return <CgTimelapse />
		case 'closeDeadline':
			return <BsCalendarEventFill />
		case 'closeExpiration':
			return <RiPassExpiredFill />
		case 'requestedBudget':
			return <TbZoomMoney />
		default:
			return <FaQuestion />
	}
}
