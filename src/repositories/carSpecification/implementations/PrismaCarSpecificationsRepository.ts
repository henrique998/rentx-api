import { prisma } from "../../../config/prisma";
import { ICreateCarSpecification } from "../../../dtos/carSpecification/ICreateCarSpecification";
import { ICarSpecificationsRepository } from "../ICarSpecificationsRepository";

class PrismaCarSpecificationsRepository implements ICarSpecificationsRepository {
    async create(data: ICreateCarSpecification): Promise<void> {
        await prisma.carSpecification.create({
            data: {
                car_id: data.car_id,
                specification_id: data.specification_id
            }
        })
    }
}

export { PrismaCarSpecificationsRepository }