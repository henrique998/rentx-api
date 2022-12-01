import { Request, Response } from "express"
import { container } from "tsyringe"

import { ResetPasswordUseCase } from "./ResetPasswordUseCase"

class ResetPasswordController {
    async handle(req: Request, res: Response): Promise<Response> {
        const { token } = req.query
        const { new_password } = req.body

        const resetPasswordUseCase = container.resolve(ResetPasswordUseCase)

        await resetPasswordUseCase.execute({
            token: String(token),
            new_password
        })

        return res.json({ message: "Password updated successfuly!" })
    }
}

export { ResetPasswordController }
