import { ICreateCarImageDTO } from "../../dtos/carImage/ICreateCarImageDTO"

interface ICarImagesRepository {
    create(data: ICreateCarImageDTO): Promise<void>
}

export { ICarImagesRepository }