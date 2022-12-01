
import { inject, injectable } from "tsyringe"
import { AppError } from "../../../errors/AppError"
import { IDateProvider } from "../../../providers/dateProvider/IDateProvider"
import { ICarsRepository } from "../../../repositories/cars/ICarsRepository"
import { IRentalsRepository } from "../../../repositories/rentals/IRentalsRepository"



interface IRequest {
    car_id: string
    account_id: string
    expected_return_date: Date
}

@injectable()
class CreateRentalUseCase {
    constructor(
        @inject("PrismaRentalsRepository")
        private rentalsRepository: IRentalsRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider,
        @inject("PrismaCarsRepository")
        private carsRepository: ICarsRepository
    ) { }

    async execute({ car_id, account_id, expected_return_date }: IRequest): Promise<void> {
        const minimumHours = 24

        if (!car_id) {
            throw new AppError("car id is required!")
        }

        if (!account_id) {
            throw new AppError("account id is required!")
        }

        if (!expected_return_date) {
            throw new AppError("expected return date is required!")
        }

        const carUnavailable = await this.rentalsRepository.findByCarId(car_id)

        if (carUnavailable) {
            throw new AppError("Car is unavailable")
        }

        const accountAlreadyRented = await this.rentalsRepository.findByAccountId(account_id)

        if (accountAlreadyRented) {
            throw new AppError("there is already a lease in progress for this account")
        }

        const currentDateFormat = this.dateProvider.currentDate()

        const comparedTime = this.dateProvider.compareInHours(currentDateFormat, expected_return_date)

        if (comparedTime < minimumHours) {
            throw new AppError("Rental must be at least 24 hours long!")
        }

        await this.rentalsRepository.create({
            car_id,
            account_id,
            expected_return_date
        })

        await this.carsRepository.updateStatusAvailable({
            car_id,
            status: false
        })
    }
}

export { CreateRentalUseCase }