import { compare } from "bcrypt"
import dayjs from "dayjs"
import { sign } from "jsonwebtoken"
import { inject, injectable } from "tsyringe"
import { authConfig } from "../../../config/auth"
import { AppError } from "../../../errors/AppError"
import { AccountMap } from "../../../mappers/AccountMap"
import { IAccountAuthTokensRepository } from "../../../repositories/accountAuthTokens/IAccountAuthTokensRepository"
import { IAccountsRepository } from "../../../repositories/accounts/IAccountsRepository"

interface IRequest {
    email: string
    password: string
}

@injectable()
class CreateSessionUseCase {
    constructor(
        @inject("PrismaAccountsRepository")
        private accountsRepository: IAccountsRepository,
        @inject("PrismaAccountAuthTokensRepository")
        private accountAuthTokens: IAccountAuthTokensRepository
    ) { }

    async execute({ email, password }: IRequest): Promise<AccountMap> {
        if (!email || !password) {
            throw new AppError('missing data')
        }

        const accountExists = await this.accountsRepository.findByEmail(email)

        if (!accountExists) {
            throw new AppError('account not found', 404)
        }

        if (!accountExists.password) {
            return;
        }

        const passwordMatch = await compare(password, accountExists.password)

        if (!passwordMatch) {
            throw new AppError("Email or password incorrect!")
        }

        const token = sign({}, authConfig.TOKEN_SECRET_KEY, {
            expiresIn: "15m",
            subject: accountExists.id,
        })

        const refreshToken = sign({ email }, authConfig.REFRESH_TOKEN_SECRET_KEY, {
            expiresIn: "30d",
            subject: accountExists.id
        })

        await this.accountAuthTokens.create({
            refresh_token: refreshToken,
            account_id: accountExists.id,
            expires_date: dayjs().add(30, "days").toDate(),
        })

        const userData = AccountMap.toDto(accountExists)

        const authResult = {
            userData,
            token,
            refreshToken
        }

        return authResult
    }
}

export { CreateSessionUseCase }