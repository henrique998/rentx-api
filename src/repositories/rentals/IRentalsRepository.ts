import { ICreateRentalDTO } from "../../dtos/rental/ICreateRentalDTO"
import { IUpdateRentalDTO } from "../../dtos/rental/IUpdateRentalDTO"
import { RentalDataDTO } from "../../dtos/rental/RentalDataDTO"

interface IRentalsRepository {
    create(data: ICreateRentalDTO): Promise<void>
    findByCarId(car_id: string): Promise<RentalDataDTO>
    findByAccountId(account_id: string): Promise<RentalDataDTO>
    listByAccountId(account_id: string): Promise<RentalDataDTO[]>
    findById(rental_id: string): Promise<RentalDataDTO>
    update(data: IUpdateRentalDTO): Promise<void>
}

export { IRentalsRepository }