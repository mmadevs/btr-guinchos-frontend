import { BiSolidCarGarage } from 'react-icons/bi'
import { FaHands, FaRoute } from 'react-icons/fa'
import { GiHandTruck, GiTowTruck } from 'react-icons/gi'
import { MdDoneAll, MdOutlineCurrencyExchange } from 'react-icons/md'
import { BsFillCartCheckFill } from 'react-icons/bs'
import { PiFolderOpenLight } from 'react-icons/pi'
import { TbTruckReturn } from 'react-icons/tb'
import { FaTruckArrowRight } from 'react-icons/fa6'
import { IcoArrived, IcoBuildingTruck } from './icons'

/**
 *
 * @param type  'transport' | 'collect' | 'storage' | 'charge' | 'movement'
 * @returns
 */
export const IconByType = ({ type }: { type: string }) => {
	switch (type) {
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
		default:
			return <></>
	}
}
