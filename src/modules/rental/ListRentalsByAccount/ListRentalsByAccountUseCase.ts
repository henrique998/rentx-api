import { inject, injectable } from "tsyringe"
import { RentalDataDTO } from "../../../dtos/rental/RentalDataDTO"
import { IRentalsRepository } from "../../../repositories/rentals/IRentalsRepository"

@injectable()
class ListRentalsByAccountUseCase {
    constructor(
        @inject("PrismaRentalsRepository")
        private rentalsRepository: IRentalsRepository
    ) { }

    async execute(account_id: string): Promise<RentalDataDTO[]> {
        const rentals = await this.rentalsRepository.listByAccountId(account_id)

        return rentals
    }
}

export { ListRentalsByAccountUseCase }