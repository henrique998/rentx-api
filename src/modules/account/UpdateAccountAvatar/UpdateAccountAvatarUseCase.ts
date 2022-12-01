import { inject, injectable } from "tsyringe"
import { AppError } from "../../../errors/AppError"
import { IAccountsRepository } from "../../../repositories/accounts/IAccountsRepository"
import { DeleteFile } from "../../../utils/deleteFile"

interface IRequest {
    avatar_url: string
    account_id: string
}

@injectable()
class UpdateAccountAvatarUseCase {
    constructor(
        @inject("PrismaAccountsRepository")
        private accountsRepository: IAccountsRepository
    ) { }

    async execute(data: IRequest): Promise<void> {
        if (!data) {
            throw new AppError({ error: "missing data!" })
        }

        const account = await this.accountsRepository.findById(data.account_id)

        if (account.avatar) {
            await DeleteFile.run(`./uploads/avatar/${account.avatar}`)
        }

        await this.accountsRepository.updateAvatar({
            account_id: data.account_id,
            avatar_url: data.avatar_url
        })
    }
}

export { UpdateAccountAvatarUseCase }