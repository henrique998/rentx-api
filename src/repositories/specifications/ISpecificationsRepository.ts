import { ISpecificationDataDTO } from "../../dtos/specification/ISpecificationDataDTO"
import { ICreateSpecificationDTO } from "../../dtos/specification/ICreateSpecificationDTO"

interface ISpecificationsRepository {
    create(data: ICreateSpecificationDTO): Promise<void>
    list(): Promise<ISpecificationDataDTO[]>
    findByName(name: string): Promise<ISpecificationDataDTO>
}

export { ISpecificationsRepository }