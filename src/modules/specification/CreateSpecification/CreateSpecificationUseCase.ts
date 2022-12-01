import { inject, injectable } from "tsyringe";

import { AppError } from "../../../errors/AppError";
import { ISpecificationsRepository } from "../../../repositories/specifications/ISpecificationsRepository";

interface IRequest {
    name: string;
    description: string;
}

@injectable()
class CreateSpecificationUseCase {
    constructor(
        @inject("PrismaSpecificationsRepository")
        private specificationsRepository: ISpecificationsRepository
    ) { }

    async execute({ name, description }: IRequest): Promise<void> {
        if (!name) {
            throw new AppError("name is required!");
        }

        if (!description) {
            throw new AppError("description is required!");
        }

        const specificationAlreadyExists = await this.specificationsRepository.findByName(name)

        if (specificationAlreadyExists) {
            throw new AppError({ error: "Category already exists!" })
        }

        await this.specificationsRepository.create({
            name,
            description
        });
    }
}

export { CreateSpecificationUseCase };
