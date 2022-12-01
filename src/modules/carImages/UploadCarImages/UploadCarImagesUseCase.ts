import { inject, injectable } from "tsyringe"
import { AppError } from "../../../errors/AppError"
import { ICarImagesRepository } from "../../../repositories/carImages/ICarImagesRepository"
import { ICarsRepository } from "../../../repositories/cars/ICarsRepository"

interface IRequest {
    car_id: string
    images_urls: string[]
}

@injectable()
class UploadCarImagesUseCase {
    constructor(
        @inject("PrismaCarsRepository")
        private carsRepository: ICarsRepository,
        @inject("PrismaCarImagesRepository")
        private carImagesRepository: ICarImagesRepository
    ) { }

    async execute({ car_id, images_urls }: IRequest): Promise<void> {
        if (!car_id) {
            throw new AppError("car id is required!")
        }

        if (!images_urls) {
            throw new AppError("send at least one image!")
        }

        const carExists = await this.carsRepository.findById(car_id)

        if (!carExists) {
            throw new AppError("Car not found!", 404)
        }

        images_urls.forEach(async image_url => {
            await this.carImagesRepository.create({
                car_id,
                image_url
            })
        })
    }
}

export { UploadCarImagesUseCase }