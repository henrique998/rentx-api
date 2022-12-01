import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateAccountUseCase } from "./CreateAccountUseCase";

class CreateAccountController {
    async handle(req: Request, res: Response): Promise<Response> {
        const { name, email, password, driver_license } = req.body;
        const avatar = req.file?.filename

        const createAccountUseCase = container.resolve(CreateAccountUseCase);

        await createAccountUseCase.execute({
            name,
            email,
            password,
            driver_license,
            avatar
        });

        return res
            .status(201)
            .json({ message: "Account Created Successfuly!" });
    }
}

export { CreateAccountController };
