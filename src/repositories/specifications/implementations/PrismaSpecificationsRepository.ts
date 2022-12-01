import { prisma } from "../../../config/prisma";
import { ICreateSpecificationDTO } from "../../../dtos/specification/ICreateSpecificationDTO";
import { ISpecificationDataDTO } from "../../../dtos/specification/ISpecificationDataDTO";
import { ISpecificationsRepository } from "../ISpecificationsRepository";

class PrismaSpecificationsRepository implements ISpecificationsRepository {
    async create(data: ICreateSpecificationDTO): Promise<void> {
        await prisma.specification.create({
            data: {
                name: data.name,
                description: data.description,
            }
        })
    }

    async list(): Promise<ISpecificationDataDTO[]> {
        const specifications = await prisma.specification.findMany()

        return specifications
    }

    async findByName(name: string): Promise<ISpecificationDataDTO> {
        const specification = await prisma.specification.findUnique({
            where: {
                name
            }
        })

        return specification
    }
}

export { PrismaSpecificationsRepository }