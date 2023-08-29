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
}

export interface AppDocument {
	id: string
	name?: string
	code: string
	imagesUrl?: string[]
	filesUrl?: string[]
	issueDate: Date
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
	client: Person
	services: Service[]
	payments: Payment[]
}

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

export interface Service {
	id: string
	deadline?: Date
	forecast: Date
	priority: boolean
	partnerCompany?: Company
	destinyPoint: Place
	checkpoints: Checkpoint[]
	inspections: Inspection[]
	controlUrl: string
	basePrice: number
	vehicle: Vehicle
	additions: DetailedPrice[]
	discounts: DetailedPrice[]
	getFinalPrice: () => number
	status: ServiceStatus
	createdAt: Date
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
	originPoint: Place
	collectPoint: Place
	driver: Driver
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
	icon: string
	createdAt: Date
}

export interface Payment {
	id: string
	payer: Person
	paymentAmount: number
	receiptOn?: Date
	checkedBy: User
	status: PaymentStatus
	voucherUrl?: string
	icon: string
	createdAt: Date
}

export interface BankPayment {
	receiver: BankAccount
}

enum PaymentStatus {
	'notReceived',
	'waitingApprovement',
	'Received'
}

export interface CashPayment extends Payment {
	receiptAmount: number
}

export interface CreditPayment extends BankPayment {
	machine?: CardMachine
	installments: number
}

export interface DebitPayment extends BankPayment {
	machine?: CardMachine
}

export interface PIXPayment extends BankPayment {
	token: string
	qrCode: string
	expiresIn: Date
}

export interface SlipPayment extends BankPayment {
	barCode: string
	qrCode?: string
	expiresIn: Date
}

export interface CardMachine {
	id: string
	brand: Brand
	serialNumber: string
	debitFee: number
	demandCreditFee: number
	termCreditFee: number
	termCreditInterest: number
	createdAt: Date
}

export interface BankAccount {
	owner: Person
	bank: Bank
	branchNumber: string
	accountNumber: string
	accountType: string
}

export interface Bank {
	name: string
	code: string
}
