import { inject, injectable } from "tsyringe"
import { AppError } from "../../../errors/AppError"
import { ICarsRepository } from "../../../repositories/cars/ICarsRepository"

interface IRequest {
    name: string
    description: string
    daily_rate: number
    license_plate: string
    fine_amount: number
    brand: string
    category_id: string
}

@injectable()
class CreateCarUseCase {
    constructor(
        @inject("PrismaCarsRepository")
        private carsRepository: ICarsRepository
    ) { }

    async execute({
        name,
        brand,
        daily_rate,
        description,
        fine_amount,
        license_plate,
        category_id
    }: IRequest): Promise<void> {
        if (!name) {
            throw new AppError("name is required!")
        }

        if (!brand) {
            throw new AppError("brand is required!")
        }

        if (!daily_rate) {
            throw new AppError("daily rate is required!")
        }

        if (!description) {
            throw new AppError("description is required!")
        }

        if (!fine_amount) {
            throw new AppError("fine amount is required!")
        }

        if (!license_plate) {
            throw new AppError("license plate is required!")
        }

        if (!category_id) {
            throw new AppError("category is required!")
        }

        const carAlreadyExists = await this.carsRepository.findByLicensePlate(license_plate)

        if (carAlreadyExists) {
            throw new AppError("Car already exists!")
        }

        await this.carsRepository.create({
            name,
            brand,
            daily_rate,
            description,
            fine_amount,
            license_plate,
            category_id
        })
    }
}


export { CreateCarUseCase }