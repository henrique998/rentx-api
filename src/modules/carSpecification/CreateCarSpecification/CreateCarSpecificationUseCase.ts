import { inject, injectable } from "tsyringe"
import { AppError } from "../../../errors/AppError"
import { ICarsRepository } from "../../../repositories/cars/ICarsRepository"
import { ICarSpecificationsRepository } from "../../../repositories/carSpecification/ICarSpecificationsRepository"
import { ISpecificationsRepository } from "../../../repositories/specifications/ISpecificationsRepository"

interface IRequest {
    car_id: string
    specifications_ids: string[]
}

@injectable()
class CreateCarSpecificationUseCase {
    constructor(
        @inject("PrismaCarSpecificationsRepository")
        private carSpecificationRepository: ICarSpecificationsRepository,
        @inject("PrismaCarsRepository")
        private carsRepository: ICarsRepository,
        @inject("PrismaSpecificationsRepository")
        private specificationsRepository: ISpecificationsRepository
    ) { }

    async execute({ car_id, specifications_ids }: IRequest): Promise<void> {
        if (!car_id) {
            throw new AppError({ error: "car id is required!" })
        }

        if (!specifications_ids) {
            throw new AppError({ error: "specifications are required!" })
        }

        const carExists = await this.carsRepository.findById(car_id)

        if (!carExists) {
            throw new AppError({ error: "Car does not exists!" }, 404)
        }

        const specifications = await this.specificationsRepository.list()

        const someSpecificationDoesNotExists = specifications.some(specification => !specifications_ids.includes(specification.id))

        if (someSpecificationDoesNotExists) {
            throw new AppError({ message: "Some specification does not exists!" })
        }

        specifications_ids.forEach(async specification_id => {
            await this.carSpecificationRepository.create({
                car_id,
                specification_id
            })
        })
    }
}

export { CreateCarSpecificationUseCase }