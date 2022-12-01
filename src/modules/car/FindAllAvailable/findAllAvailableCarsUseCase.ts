import { inject, injectable } from "tsyringe"
import { CarDataDTO } from "../../../dtos/car/CarDataDTO"
import { ICarsRepository } from "../../../repositories/cars/ICarsRepository"

interface IRequest {
    category_id?: string
    brand?: string
    name?: string
}

@injectable()
class FindAllAvailableCarsUseCase {
    constructor(
        @inject("PrismaCarsRepository")
        private carsRepository: ICarsRepository
    ) { }

    async execute({ category_id, brand, name }: IRequest): Promise<CarDataDTO[]> {
        const availableCars = await this.carsRepository.findAllAvailable({
            category_id,
            brand,
            name
        })

        return availableCars
    }
}

export { FindAllAvailableCarsUseCase }