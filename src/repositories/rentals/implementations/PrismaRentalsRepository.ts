import { prisma } from "../../../config/prisma";
import { ICreateRentalDTO } from "../../../dtos/rental/ICreateRentalDTO";
import { IUpdateRentalDTO } from "../../../dtos/rental/IUpdateRentalDTO";
import { RentalDataDTO } from "../../../dtos/rental/RentalDataDTO";
import { IRentalsRepository } from "../IRentalsRepository";

class PrismaRentalsRepository implements IRentalsRepository {
    async create(data: ICreateRentalDTO): Promise<void> {
        await prisma.rental.create({
            data: {
                car_id: data.car_id,
                account_id: data.account_id,
                expected_return_date: data.expected_return_date
            }
        })
    }

    async findByCarId(car_id: string): Promise<RentalDataDTO> {
        const rental = await prisma.rental.findFirst({
            where: {
                car_id,
                end_date: null
            }
        })

        return rental
    }

    async findByAccountId(account_id: string): Promise<RentalDataDTO> {
        const rental = await prisma.rental.findFirst({
            where: {
                account_id,
                end_date: null
            }
        })

        return rental
    }

    async listByAccountId(account_id: string): Promise<RentalDataDTO[]> {
        const rentals = await prisma.rental.findMany({
            where: {
                account_id
            },
            include: {
                car: true
            }
        })

        return rentals
    }

    async findById(rental_id: string): Promise<RentalDataDTO> {
        const rental = await prisma.rental.findUnique({
            where: {
                id: rental_id
            }
        })

        return rental
    }

    async update(data: IUpdateRentalDTO): Promise<void> {
        await prisma.rental.update({
            where: {
                id: data.rental_id,
            },
            data: {
                end_date: data.end_date,
                total: data.total
            }
        })
    }
}

export { PrismaRentalsRepository }