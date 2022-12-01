import { inject, injectable } from "tsyringe"
import { AppError } from "../../../errors/AppError"
import { IDateProvider } from "../../../providers/dateProvider/IDateProvider"
import { ICarsRepository } from "../../../repositories/cars/ICarsRepository"
import { IRentalsRepository } from "../../../repositories/rentals/IRentalsRepository"

interface IRequest {
    rental_id: string
    account_id: string
}

@injectable()
class DevolutionRentalUseCase {
    constructor(
        @inject("PrismaRentalsRepository")
        private rentalsRepository: IRentalsRepository,
        @inject("PrismaCarsRepository")
        private carsRepository: ICarsRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider,
    ) { }

    async execute({ rental_id, account_id }: IRequest): Promise<void> {
        const minimum_daily = 1

        if (!rental_id) {
            throw new AppError({ error: "rental id is required!" })
        }

        if (!account_id) {
            throw new AppError({ error: "account id is required!" })
        }

        const rentalExists = await this.rentalsRepository.findById(rental_id)

        if (!rentalExists) {
            throw new AppError({ error: "Rental does not exists!" }, 404)
        }

        const car = await this.carsRepository.findById(rentalExists.car_id)

        const currentDate = this.dateProvider.currentDate()

        let daily = this.dateProvider.compareInDays(
            rentalExists.start_date,
            this.dateProvider.currentDate()
        )

        if (daily <= 0) {
            daily = minimum_daily
        }

        const delay = this.dateProvider.compareInDays(currentDate, rentalExists.expected_return_date)

        let total = 0

        if (delay > 0) {
            const calculate_fine = delay * car.fine_amount

            total = calculate_fine
        }

        total += daily * car.daily_rate

        await this.rentalsRepository.update({
            rental_id: rentalExists.id,
            end_date: currentDate,
            total
        })

        await this.carsRepository.updateStatusAvailable({
            car_id: car.id,
            status: true
        })
    }
}

export { DevolutionRentalUseCase }