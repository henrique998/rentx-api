import { ICategoryDataDTO } from "../../dtos/category/ICategoryDataDTO"
import { ICreateCategoryDTO } from "../../dtos/category/ICreateCategoryDTO"

interface ICategoriesRepository {
    create(data: ICreateCategoryDTO): Promise<void>
    list(): Promise<ICategoryDataDTO[]>
    findByName(name: string): Promise<ICategoryDataDTO> 
}

export { ICategoriesRepository }