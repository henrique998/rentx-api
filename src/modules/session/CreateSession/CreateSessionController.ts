import { Request, Response } from "express"
import { container } from "tsyringe"

import { CreateSessionUseCase } from "./CreateSessionUseCase"

class CreateSessionController {
    async handle(req: Request, res: Response): Promise<Response> {
        const { email, password } = req.body

        const createSessionUseCase = container.resolve(CreateSessionUseCase)

        const result = await createSessionUseCase.execute({
            email,
            password
        })

        return res.json(result)
    }
}

export { CreateSessionController }
