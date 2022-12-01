import { prisma } from "../../../config/prisma";
import { ICategoryDataDTO } from "../../../dtos/category/ICategoryDataDTO";
import { ICreateCategoryDTO } from "../../../dtos/category/ICreateCategoryDTO";
import { ICategoriesRepository } from "../ICategoriesRepository";

class PrismaCategoriesRepository implements ICategoriesRepository {
    async create(data: ICreateCategoryDTO): Promise<void> {
        await prisma.category.create({
            data: {
                name: data.name,
                description: data.description,
            }
        })
    }

    async list(): Promise<ICategoryDataDTO[]> {
        const categories = await prisma.category.findMany()

        return categories
    }

    async findByName(name: string): Promise<ICategoryDataDTO> {
        const category = await prisma.category.findUnique({
            where: {
                name
            }
        })

        return category
    }
}

export { PrismaCategoriesRepository }