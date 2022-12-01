import { CarDataDTO } from "../../dtos/car/CarDataDTO"
import { ICreateCarDTO } from "../../dtos/car/ICreateCarDTO"
import { IFindAvailableCarsDTO } from "../../dtos/car/IFindAvailableCarsDTO"
import { IUpdateAvailableStatusDTO } from "../../dtos/car/IUpdateAvailableStatusDTO"

interface ICarsRepository {
    create(data: ICreateCarDTO): Promise<void>
    findByLicensePlate(license_plate: string): Promise<CarDataDTO>
    findById(car_id: string): Promise<CarDataDTO>
    findAllAvailable(data: IFindAvailableCarsDTO): Promise<CarDataDTO[]>
    updateStatusAvailable(data: IUpdateAvailableStatusDTO): Promise<void>
}

export { ICarsRepository }