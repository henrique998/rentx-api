import { Request, Response } from "express"
import { container } from "tsyringe"

import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase"

class CreateCarSpecificationController {
    async handle(req: Request, res: Response): Promise<Response> {
        const { car_id } = req.params
        const { specifications_ids } = req.body

        const createCarSpecificationsUseCase = container.resolve(CreateCarSpecificationUseCase)

        await createCarSpecificationsUseCase.execute({
            car_id,
            specifications_ids
        })

        return res
            .status(201)
            .json({ message: "Specifications addedd to car!" })
    }
}

export { CreateCarSpecificationController }
