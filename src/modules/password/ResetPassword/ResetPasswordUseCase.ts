import { hash } from "bcrypt"
import { inject, injectable } from "tsyringe"
import { AppError } from "../../../errors/AppError"
import { IDateProvider } from "../../../providers/dateProvider/IDateProvider"
import { IAccountAuthTokensRepository } from "../../../repositories/accountAuthTokens/IAccountAuthTokensRepository"
import { IAccountsRepository } from "../../../repositories/accounts/IAccountsRepository"

interface IRequest {
    token: string
    new_password: string
}

@injectable()
class ResetPasswordUseCase {
    constructor(
        @inject("PrismaAccountsRepository")
        private accountsRepository: IAccountsRepository,
        @inject("PrismaAccountAuthTokensRepository")
        private accountAuthTokensRepository: IAccountAuthTokensRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider
    ) { }

    async execute({ token, new_password }: IRequest): Promise<void> {
        if (!token) {
            throw new AppError("token is required!")
        }

        if (!new_password) {
            throw new AppError("new password is required!")
        }

        const accountToken = await this.accountAuthTokensRepository.findByToken(token)

        if (!accountToken) {
            throw new AppError("invalid token!")
        }

        const isTokenExpired = this.dateProvider.compareIfBefore(accountToken.expires_date, this.dateProvider.currentDate())

        if (isTokenExpired) {
            throw new AppError("Token expired!")
        }

        const hashedNewPassword = await hash(new_password, 8)

        await this.accountsRepository.updatePassword({
            account_id: accountToken.account_id,
            new_password: hashedNewPassword
        })

        await this.accountAuthTokensRepository.deleteById(accountToken.id)
    }
}

export { ResetPasswordUseCase }