export interface Person {
	id: string
	name: string
	email: string
	phone: string
	address: Place
	imageUrl?: string
	createdAt: Date
}

export interface Individual extends Person {
	bornIn: Date
	cpf: string
}

export interface Company extends Person {
	manager: Individual
	corporateName: string
	cnpj: string
}

export interface MyCompany extends Company {
	documents: AppDocument[]
}

export interface Permissions {
	id: string
	addUser: boolean
	modifyUser: boolean
	deleteUser: boolean
	changeUserPermissions: boolean
	seeOldReports: boolean
	reopenFinishedServices: boolean
	createCheckpoint: boolean
	modifyCheckpoint: boolean
	deleteCheckpoint: boolean
	createdAt: Date
}

export interface User extends Individual {
	passwordHash: string
	permissions: Permissions
	level: number
}

export interface LotKeeper extends Individual {
	company: Company
}

export interface Driver extends Individual {
	company?: Company
	license: DriverLicense
}

export interface Brand {
	id: string
	name: string
	imageUrl?: string
}

export interface Vehicle {
	id: string
	imageUrl?: string
	brand: Brand
	model: string
	modelOf: Date
	madeIn: Date
	plate: string
	chassis: string
	document: AppDocument
	owner: Person
	createdAt: Date
}

export interface AppDocument {
	id: string
	name?: string
	code: string
	imagesUrl?: string[]
	filesUrl?: string[]
	issuedIn: Date
	expiresIn?: Date
	createdAt: Date
}

export interface DriverLicense extends AppDocument {
	category: string
}

export interface Contract extends AppDocument {
	id: string
	digitalSignatureUrl?: string
	signatureDate: Date
	generatedBy: User
	client: Person
	services: Service[]
	payments?: Payment[]
}

export interface Bill extends AppDocument {
	number: number
	taxCouponAccessKey?: string
	services: Service[]
	payments: Payment[]
}

export interface Invoice {
	payments: Payment[]
}

// export interface BillsToPay {
//     id: string
// 	payments: Payment[]
//     createdAt: Date
// }

export interface Address {
	id: string
	zipCode: string
	street: string
	complement?: string
	neighbourhood: string
	city: string
	state: string
	createdAt: Date
}

export interface Place extends Address {
	number?: string
	name?: string
	landmark?: string
}

export interface Lot extends Place {
	owner: Person
	maxCapacity?: number
}

export interface DetailedPrice {
	id: string
	name: string
	description?: string
	valueInAmount?: number
	valueInPercentage?: number
	createdAt: Date
}
export interface Voucher extends DetailedPrice {
	code: string
	allowedClients?: Person[]
	expiresIn?: Date
}

enum ServiceStatus {
	'notStarted',
	'started',
	'paused',
	'cancelled',
	'finished'
}

export interface Inspection {
	inCharge: LotKeeper | Driver
	imagesUrl: string[]
	documentation: string
	kilometersDriven: number
	color: string
	breakdowns: string
	windows: string
	seats: string
	locks: string
	oilLevel: string
	lights: string
	tires: string
	suspension: string
	alignment: string
	balancing: string
	createdAt: Date
}

export interface Storage extends Service {
	lot: Lot
	amountOfDays?: number
}

export interface Transport extends Service {
	driver: Driver
	originPoint: Place
	destinyPoint: Place
	checkpoints: Checkpoint[]
}
export interface Collect extends Transport {
	collectPoint: Place
}

export interface Service {
	id: string
	deadline?: Date
	forecast: Date
	priority: boolean
	inspections: Inspection[]
	basePrice: number
	additions: DetailedPrice[]
	discounts: DetailedPrice[]
	vehicle: Vehicle
	getFinalPrice: () => number
	status: ServiceStatus
	createdAt: Date
}

export interface Checkpoint {
	id: string
	description?: string
	address: Place
	createdBy: Driver | User
	checkedBy: User
	createdAt: Date
}

export interface Charge {
	id: string
	stork: Vehicle
	originPoint: Place
	destinyPoint: Place
	deadline: Date
	vehicles: Vehicle[]
	maxVehicles: number
	createdAt: Date
}

export interface AppNotification {
	id: string
	shortName: string
	fullName: string
	description: string
	viewedBy: User[]
	imgUrl?: string
	type: AppNotificationType
	url: string
	createdAt: Date
}

export interface AppNotificationType {
	id: string
	name: string
	readonly icon: string
	createdAt: Date
}

export interface Payment {
	id: string
	payer: Person
	paymentAmount: number
	receiptOn?: Date
	checkedBy: User
	deadline?: Date
	status: PaymentStatus
	proofUrl?: string
	icon: string
	createdAt: Date
}

export interface BankPayment extends Payment {
	receiver: BankAccount
}

enum PaymentStatus {
	'notReceived',
	'waitingApprovement',
	'received'
}

export interface CardPayment extends BankPayment {
	paymentProvider: PaymentProvider
	mode: 'physical' | 'online'
	machineSerialNumber?: string
}

export interface CashPayment extends Payment {
	receiptAmount: number
}

export interface CreditPayment extends CardPayment {
	installments: number
}

export interface DebitPayment extends CardPayment {}

export interface PIXPayment extends BankPayment {
	token: string
	qrCode: string
	expiresIn: Date
}

export interface SlipPayment extends BankPayment {
	barCode: string
	qrCode?: string
}

export interface PaymentProvider extends Brand {
	cardFees: CardFees
}

export interface CardFees {
	debitFee: number
	demandCreditFee: number
	termCreditFee: number
	termCreditInterest: number
}

export interface BankAccount {
	id: string
	owner: Person
	bank: Bank
	branchNumber: string
	accountNumber: string
	accountType: string
	createdAt: Date
}

export interface Bank {
	id: string
	name: string
	code: string
	createdAt: Date
}
