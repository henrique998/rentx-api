import { Request, Response } from "express"
import { container } from "tsyringe"

import { UpdateAccountAvatarUseCase } from "./UpdateAccountAvatarUseCase"

class UpdateAccountAvatarController {
    async handle(req: Request, res: Response): Promise<Response> {
        const avatar_url = req.file?.filename
        const account_id = req.account.id

        const updateAccountAvatarUseCase = container.resolve(UpdateAccountAvatarUseCase)

        await updateAccountAvatarUseCase.execute({
            avatar_url,
            account_id
        })

        return res
            .status(200)
            .json({ message: "Avatar updated successfuly!" })
    }
}

export { UpdateAccountAvatarController }
