import { hash } from "bcrypt"
import { inject, injectable } from "tsyringe"

import { AppError } from "../../../errors/AppError"
import { IAccountsRepository } from "../../../repositories/accounts/IAccountsRepository"

interface IRequest {
    name: string
    email: string
    password: string
    driver_license: string
    avatar?: string
}

@injectable()
class CreateAccountUseCase {
    constructor(
        @inject("PrismaAccountsRepository")
        private accountsRepository: IAccountsRepository
    ) { }

    async execute({ name, email, password, driver_license, avatar }: IRequest): Promise<void> {
        if (!name) {
            throw new AppError("name is required!")
        }

        if (!email) {
            throw new AppError("email is required!")
        }

        if (!password) {
            throw new AppError("password is required!")
        }

        if (!driver_license) {
            throw new AppError("password is required!")
        }

        const accountAlreadyExists = await this.accountsRepository.findByEmail(email)

        if (accountAlreadyExists) {
            throw new AppError({ error: "Account already exists!" })
        }

        const hashedPassword = await hash(password, 8)

        await this.accountsRepository.create({
            name,
            email,
            password: hashedPassword,
            driver_license,
            avatar
        })
    }
}

export { CreateAccountUseCase }
