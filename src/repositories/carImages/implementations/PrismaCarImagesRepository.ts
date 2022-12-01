import { prisma } from "../../../config/prisma";
import { ICreateCarImageDTO } from "../../../dtos/carImage/ICreateCarImageDTO";
import { ICarImagesRepository } from "../ICarImagesRepository";

class PrismaCarImagesRepository implements ICarImagesRepository {
    async create(data: ICreateCarImageDTO): Promise<void> {
        await prisma.carImage.create({
            data: {
                car_id: data.car_id,
                image_url: data.image_url
            }
        })
    }
}

export { PrismaCarImagesRepository }