import { Request, Response } from "express"
import { container } from "tsyringe"

import { FindAllAvailableCarsUseCase } from "./findAllAvailableCarsUseCase"

class FindAllAvailableCarsController {
    async handle(req: Request, res: Response): Promise<Response> {
        const { category_id, brand, name } = req.query

        const findAllAvailableCarsUseCase = container.resolve(FindAllAvailableCarsUseCase)

        const result = await findAllAvailableCarsUseCase.execute({
            category_id: String(category_id),
            brand: String(brand),
            name: String(name)
        })

        return res.json(result)
    }
}

export { FindAllAvailableCarsController }
