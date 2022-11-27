import { ICategoryDataDTO } from "../../../dtos/category/ICategoryDataDTO";
import { ICreateCategoryDTO } from "../../../dtos/category/ICreateCategoryDTO";
import { ICategoriesRepository } from "../ICategoriesRepository";

class PrismaCategoriesRepository implements ICategoriesRepository {
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

export { PrismaCategoriesRepository }