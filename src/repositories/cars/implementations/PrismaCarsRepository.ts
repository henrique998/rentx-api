import { prisma } from "../../../config/prisma";
import { CarDataDTO } from "../../../dtos/car/CarDataDTO";
import { ICreateCarDTO } from "../../../dtos/car/ICreateCarDTO";
import { IFindAvailableCarsDTO } from "../../../dtos/car/IFindAvailableCarsDTO";
import { IUpdateAvailableStatusDTO } from "../../../dtos/car/IUpdateAvailableStatusDTO";
import { ICarsRepository } from "../ICarsRepository";

class PrismaCarsRepository implements ICarsRepository {
    async create(data: ICreateCarDTO): Promise<void> {
        await prisma.car.create({
            data
        })
    }

    async findByLicensePlate(license_plate: string): Promise<CarDataDTO> {
        const car = await prisma.car.findUnique({
            where: {
                license_plate
            }
        })

        return car
    }

    async findById(car_id: string): Promise<CarDataDTO> {
        const car = await prisma.car.findUnique({
            where: {
                id: car_id
            }
        })

        return car
    }

    async findAllAvailable(data: IFindAvailableCarsDTO): Promise<CarDataDTO[]> {
        const cars = await prisma.car.findMany({
            where: {
                available: true,
                OR: [
                    {
                        category_id: data.category_id
                    },
                    {
                        name: data.name
                    },
                    {
                        brand: data.brand
                    }
                ]
            }
        })

        return cars
    }

    async updateStatusAvailable({ car_id, status }: IUpdateAvailableStatusDTO): Promise<void> {
        await prisma.car.update({
            where: {
                id: car_id
            },
            data: {
                available: status
            }
        })
    }
}

export { PrismaCarsRepository }