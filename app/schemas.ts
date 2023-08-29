import { z } from 'zod'

const PaymentStatus = z.enum(['notReceived', 'waitingApprovement', 'Received'])

const ServiceStatus = z.enum([
	'notStarted',
	'started',
	'paused',
	'cancelled',
	'finished'
])

export const AppDocument = z.object({
	id: z.string(),
	name: z.string().optional(),
	code: z.string(),
	imagesUrl: z.array(z.string()).optional(),
	filesUrl: z.array(z.string()).optional(),
	issueDate: z.date(),
	expiresIn: z.date().optional(),
	createdAt: z.date()
})

export const Address = z.object({
	id: z.string(),
	zipCode: z.string(),
	street: z.string(),
	complement: z.string().optional(),
	neighbourhood: z.string(),
	city: z.string(),
	state: z.string(),
	createdAt: z.date()
})

export const Place = Address.extend({
	number: z.string().optional(),
	name: z.string().optional(),
	landmark: z.string().optional()
})

export const Bank = z.object({
	name: z.string(),
	code: z.string()
})

export const Person = z.object({
	id: z.string(),
	name: z.string(),
	email: z.string(),
	phone: z.string(),
	address: Place,
	imageUrl: z.string().optional(),
	createdAt: z.date()
})

export const Individual = Person.extend({
	bornIn: z.date(),
	cpf: z.string()
})

export const Company = Person.extend({
	manager: Individual,
	corporateName: z.string(),
	cnpj: z.string()
})

export const MyCompany = Company.extend({
	documents: z.array(AppDocument)
})

export const Permissions = z.object({
	id: z.string(),
	addUser: z.boolean(),
	modifyUser: z.boolean(),
	deleteUser: z.boolean(),
	changeUserPermissions: z.boolean(),
	seeOldReports: z.boolean(),
	reopenFinishedServices: z.boolean(),
	createCheckpoint: z.boolean(),
	modifyCheckpoint: z.boolean(),
	deleteCheckpoint: z.boolean(),
	createdAt: z.date()
})

export const User = Individual.extend({
	passwordHash: z.string(),
	permissions: Permissions,
	level: z.number()
})

export const LotKeeper = Individual.extend({
	company: Company
})

export const DriverLicense = AppDocument.extend({
	category: z.string()
})

export const Driver = Individual.extend({
	company: Company.optional(),
	license: DriverLicense
})
export const Brand = z.object({
	id: z.string(),
	name: z.string(),
	imageUrl: z.string().optional()
})
export const Vehicle = z.object({
	id: z.string(),
	imageUrl: z.string().optional(),
	brand: Brand,
	model: z.string(),
	modelOf: z.date(),
	madeIn: z.date(),
	plate: z.string(),
	chassis: z.string(),
	document: AppDocument,
	owner: Person
})

export const Lot = Place.extend({
	owner: Person,
	maxCapacity: z.number().optional()
})

export const Checkpoint = z.object({
	id: z.string(),
	description: z.string().optional(),
	address: Place,
	createdBy: z.union([Driver, User]),
	checkedBy: User,
	createdAt: z.date()
})

export const DetailedPrice = z.object({
	id: z.string(),
	name: z.string(),
	description: z.string().optional(),
	valueInAmount: z.number().optional(),
	valueInPercentage: z.number().optional(),
	createdAt: z.date()
})

export const Voucher = DetailedPrice.extend({
	code: z.string(),
	allowedClients: z.array(Person).optional(),
	expiresIn: z.date().optional()
})

export const Inspection = z.object({
	inCharge: z.union([LotKeeper, Driver]),
	imagesUrl: z.array(z.string()),
	documentation: z.string(),
	kilometersDriven: z.number(),
	color: z.string(),
	breakdowns: z.string(),
	windows: z.string(),
	seats: z.string(),
	locks: z.string(),
	oilLevel: z.string(),
	lights: z.string(),
	tires: z.string(),
	suspension: z.string(),
	alignment: z.string(),
	balancing: z.string(),
	createdAt: z.date()
})

export const Service = z.object({
	id: z.string(),
	vehicle: Vehicle,
	forecast: z.date(),
	deadline: z.date().optional(),
	destinyPoint: Place,
	priority: z.boolean(),
	partnerCompany: Company.optional(),
	inspections: z.array(Inspection),
	checkpoints: z.array(Checkpoint),
	basePrice: z.number(),
	controlUrl: z.string(),
	additions: z.array(DetailedPrice),
	discounts: z.array(DetailedPrice),
	getFinalPrice: z.function().returns(z.number()),
	status: ServiceStatus,
	createdAt: z.date()
})

export const Storage = Service.extend({
	lot: Lot,
	amountOfDays: z.number().optional()
})

export const Transport = Service.extend({
	originPoint: Place,
	collectPoint: Place,
	driver: Driver
})

export const Charge = z.object({
	id: z.string(),
	stork: Vehicle,
	destinyPoint: Place,
	deadline: z.date(),
	vehicles: z.array(Vehicle),
	maxVehicles: z.number(),
	createdAt: z.date()
})

export const AppNotificationType = z.object({
	id: z.string(),
	name: z.string(),
	icon: z.string(),
	createdAt: z.date()
})

export const AppNotification = z.object({
	id: z.string(),
	shortName: z.string(),
	fullName: z.string(),
	description: z.string(),
	viewedBy: z.array(User),
	imageUrl: z.string().optional(),
	type: AppNotificationType,
	url: z.string(),
	createdAt: z.date()
})

export const BankAccount = z.object({
	owner: Person,
	bank: Bank,
	branchNumber: z.string(),
	accountNumber: z.string(),
	accountType: z.string()
})

export const Payment = z.object({
	id: z.string(),
	payer: Person,
	paymentAmount: z.number(),
	receiptOn: z.date().optional(),
	checkedBy: User,
	status: PaymentStatus,
	voucherUrl: z.string().optional(),
	icon: z.string(),
	createdAt: z.date()
})

export const CardMachine = z.object({
	id: z.string(),
	brand: Brand,
	serialNumber: z.string(),
	debitFee: z.number(),
	demandCreditFee: z.number(),
	termCreditFee: z.number(),
	termCreditInterest: z.number(),
	createdAt: z.date()
})

export const BankPayment = z.object({
	receiver: BankAccount
})

export const CashPayment = Payment.extend({
	receiptAmount: z.number(),
	changeAmount: z.number()
})

export const CreditPayment = BankPayment.extend({
	machine: CardMachine.optional(),
	installments: z.number()
})

export const DebitPayment = BankPayment.extend({
	machine: CardMachine.optional()
})

export const PIXPayment = BankPayment.extend({
	token: z.string(),
	qrCode: z.string(),
	expiresIn: z.date()
})

export const SlipPayment = BankPayment.extend({
	barCode: z.string(),
	qrCode: z.string().optional(),
	expiresIn: z.date()
})

export const Contract = AppDocument.extend({
	id: z.string(),
	digitalSignatureUrl: z.string().optional(),
	signatureDate: z.date(),
	client: Person,
	services: z.array(Service),
	payments: z.array(Payment)
})
