interface Person {
	id: string
	name: string
	email: string
	phone: string
	address: Place
	imageUrl?: string
	createdAt: Date
}

interface Individual extends Person {
	bornIn: Date
	cpf: string
}
interface MyCompany extends Company {
	documents: AppDocument[]
}
interface Company extends Person {
	manager: Individual
	corporateName: string
	cnpj: string
}

interface Permissions {
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

interface User extends Individual {
	passwordHash: string
	permissions: Permissions
	level: number
}

interface LotKeeper extends Individual {
	company?: Company
}
interface Driver extends Individual {
	company?: Company
	license: DriverLicense
}
interface Brand {
	id: string
	name: string
	imageUrl?: string
}
interface Vehicle {
	id: string
	imageUrl?: string
	brand: Brand
	model: string
	plate: string
	chassis: string
	document: AppDocument
	year: string
	owner: Person
}

interface AppDocument {
	id: string
	name?: string
	code: string
	imagesUrl?: string[]
	filesUrl?: string[]
	issueDate: Date
	expiresIn?: Date
	createdAt: Date
}

interface DriverLicense extends AppDocument {
	category: string
}

interface Contract extends AppDocument {
	id: string
	digitalSignatureUrl?: string
	signatureDate: Date
	client: Person
	services: Service[]
	payments: Payment[]
}

interface Address {
	id: string
	zipCode: string
	street: string
	complement?: string
	neighbourhood: string
	city: string
	state: string
	createdAt: Date
}

interface Place extends Address {
	number?: string
	name?: string
	landmark?: string
}

interface Lot extends Place {
	owner: Person
	maxCapacity?: number
}

interface Service {
	id: string
	priority: boolean
	partnerCompany?: Company
	checkpoints: Checkpoint[]
	basePrice: number
	controlUrl: string
	discountAmount: number
	finalPrice: number
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

interface Storage extends Service {
	lot: Lot
	imagesUrl: string[]
	inspection: Inspection
	amountOfDays: number
}

interface Inspection {
	inCharge: LotKeeper | Driver
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

interface Transport extends Service {
	deadline: Date
	originPoint: Place
	collectPoint: Place
	preInspection: Inspection
	destinyPoint: Place
	arrivalForecast: Date
	driver: Driver
	vehicleId: Vehicle
}

interface Checkpoint {
	id: string
	type: CheckpointType
	description?: string
	address: Place
	createdBy: Driver | User
	checkedBy: User
	createdAt: Date
}

enum CheckpointType {
	'started',
	'common',
	'finished'
}

interface Charge {
	id: string
	stork: Vehicle
	lot: Lot
	destinyPoint: Place
	deadline: Date
	vehicles: Vehicle[]
	maxVehicles: number
	createdAt: Date
}

interface AppNotification {
	id: string
	shortName: string
	fullName: string
	description: string
	viewedBy: User[]
	imgUrl?: string
	icon: string
	url: string
	createdAt: Date
}

interface Payment {
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

interface BankPayment {
	receiver: BankAccount
}

enum PaymentStatus {
	'notReceived',
	'waitingApprovement',
	'Received'
}

interface CashPayment extends Payment {
	receiptAmount: number
	changeAmount: number
}

interface CreditPayment extends BankPayment {
	machine?: CardMachine
	installments: number
	feesAmount: number
}

interface DebitPayment extends BankPayment {
	machine?: CardMachine
}

interface PIXPayment extends BankPayment {
	token: string
	qrCode: string
	expiresIn: Date
}

interface SlipPayment extends BankPayment {
	barCode: string
	qrCode?: string
	expiresIn: Date
}

interface CardMachine {
	id: string
	brand: Brand
	serialNumber: string
	debitFee: number
	demandCreditFee: number
	termCreditFee: number
	termCreditInterest: number
	createdAt: Date
}

interface BankAccount {
	owner: Person
	bank: Bank
	branchNumber: string
	accountNumber: string
	accountType: string
}

interface Bank {
	name: string
	code: string
}
