import { Request, Response } from "express"
import { container } from "tsyringe"

import { CreateRentalUseCase } from "./CreateRentalUseCase"

class CreateRentalController {
    async handle(req: Request, res: Response): Promise<Response> {
        const { car_id, expected_return_date } = req.body
        const { id: account_id } = req.account

        const createRentalUseCase = container.resolve(CreateRentalUseCase)

        await createRentalUseCase.execute({
            car_id,
            expected_return_date,
            account_id
        })

        return res
            .status(201)
            .json({ message: "Rental created successfuly!" })
    }
}

export { CreateRentalController }
