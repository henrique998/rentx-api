import { Request, Response } from "express"
import { container } from "tsyringe"

import { ListRentalsByAccountUseCase } from "./ListRentalsByAccountUseCase"

class ListRentalsByAccountController {
    async handle(req: Request, res: Response): Promise<Response> {
        const { id: account_id } = req.account

        const listRentalsByAccountUseCase = container.resolve(ListRentalsByAccountUseCase)

        const result = await listRentalsByAccountUseCase.execute(account_id)

        return res.json(result)
    }
}

export { ListRentalsByAccountController }
