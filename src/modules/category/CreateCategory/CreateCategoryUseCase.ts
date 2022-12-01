import { inject, injectable } from "tsyringe";

import { AppError } from "../../../errors/AppError";
import { ICategoriesRepository } from "../../../repositories/categories/ICategoriesRepository";

interface IRequest {
    name: string;
    description: string;
}

@injectable()
class CreateCategoryUseCase {
    constructor(
        @inject("PrismaCategoriesRepository")
        private categoriesRepository: ICategoriesRepository
    ) { }

    async execute({ name, description }: IRequest): Promise<void> {
        if (!name) {
            throw new AppError("name is required!");
        }

        if (!description) {
            throw new AppError("description is required!");
        }

        const categoryAlreadyExists = await this.categoriesRepository.findByName(name)

        if (categoryAlreadyExists) {
            throw new AppError({ error: "Category already exists!" })
        }

        await this.categoriesRepository.create({
            name,
            description
        });
    }
}

export { CreateCategoryUseCase };
