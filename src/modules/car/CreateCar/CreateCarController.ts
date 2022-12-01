import { Request, Response } from "express"
import { container } from "tsyringe"

import { CreateCarUseCase } from "./CreateCarUseCase"

class CreateCarController {
    async handle(req: Request, res: Response): Promise<Response> {
        const {
            name,
            brand,
            daily_rate,
            description,
            fine_amount,
            license_plate,
            category_id
        } = req.body

        const createCarUseCase = container.resolve(CreateCarUseCase)

        await createCarUseCase.execute({
            name,
            brand,
            daily_rate,
            description,
            fine_amount,
            license_plate,
            category_id
        })

        return res
            .status(201)
            .json({ message: "Car created successfuly!" })
    }
}

export { CreateCarController }
