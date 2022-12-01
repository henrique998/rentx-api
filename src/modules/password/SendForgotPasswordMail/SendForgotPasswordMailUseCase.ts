import { resolve } from "path"
import { inject, injectable } from "tsyringe"
import { v4 as uuid } from "uuid"

import { AppError } from "../../../errors/AppError"

import { IDateProvider } from "../../../providers/dateProvider/IDateProvider"
import { IMailProvider } from "../../../providers/mailProvider/IMailProvider"

import { IAccountAuthTokensRepository } from "../../../repositories/accountAuthTokens/IAccountAuthTokensRepository"
import { IAccountsRepository } from "../../../repositories/accounts/IAccountsRepository"

@injectable()
class SendForgotPasswordMailUseCase {
    constructor(
        @inject("PrismaAccountsRepository")
        private accountsRepository: IAccountsRepository,
        @inject("PrismaAccountAuthTokensRepository")
        private accountAuthTokensRepository: IAccountAuthTokensRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider,
        @inject("MailtrapMailProvider")
        private mailProvider: IMailProvider
    ) { }

    async execute(email: string): Promise<void> {
        if (!email) {
            throw new AppError("email is required!")
        }

        const accountExists = await this.accountsRepository.findByEmail(email)

        if (!accountExists) {
            throw new AppError("Account not found!")
        }

        const token = uuid()

        await this.accountAuthTokensRepository.create({
            refresh_token: token,
            account_id: accountExists.id,
            expires_date: this.dateProvider.addHours(3)
        })

        const templatePath = resolve(__dirname, "..", "..", "..", "views", "emails", "forgotPassword.hbs")

        this.mailProvider.send({
            to: email,
            subject: "Reset de senha",
            path: templatePath,
            variables: {
                name: accountExists.name,
                link: `${process.env.FORGOT_MAIL_URL}${token}`
            }
        })
    }
}

export { SendForgotPasswordMailUseCase }