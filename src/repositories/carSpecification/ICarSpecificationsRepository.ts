import { ICreateCarSpecification } from "../../dtos/carSpecification/ICreateCarSpecification"

interface ICarSpecificationsRepository {
    create(data: ICreateCarSpecification): Promise<void>
}

export { ICarSpecificationsRepository }