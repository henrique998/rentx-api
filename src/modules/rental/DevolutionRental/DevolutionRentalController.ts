import { Request, Response } from "express"
import { container } from "tsyringe"

import { DevolutionRentalUseCase } from "./DevolutionRentalUseCase"

class DevolutionRentalController {
    async handle(req: Request, res: Response): Promise<Response> {
        const { id: account_id } = req.account
        const { rental_id } = req.params

        const devolutionRentalUseCase = container.resolve(DevolutionRentalUseCase)

        await devolutionRentalUseCase.execute({
            account_id,
            rental_id
        })

        return res.status(204).send()
    }
}

export { DevolutionRentalController }
