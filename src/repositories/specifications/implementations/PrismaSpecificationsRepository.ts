import { ICategoryDataDTO } from "../../../dtos/category/ICategoryDataDTO";
import { ICreateCategoryDTO } from "../../../dtos/category/ICreateCategoryDTO";
import { ISpecificationsRepository } from "../ISpecificationsRepository";

class PrismaSpecificationsRepository implements ISpecificationsRepository {
    async create(data: ICreateCategoryDTO): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async list(): Promise<ICategoryDataDTO[]> {
        throw new Error("Method not implemented.");
    }

    async findByName(name: string): Promise<ICategoryDataDTO> {
        throw new Error("Method not implemented.");
    }
}

export { PrismaSpecificationsRepository }