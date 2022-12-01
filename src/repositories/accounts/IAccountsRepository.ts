import { AccountDataDTO } from "../../dtos/account/AccountDataDTO"
import { ICreateAccountDTO } from "../../dtos/account/ICreateAccountDTO"
import { IUpdateAvatarDTO } from "../../dtos/account/IUpdateAvatarDTO"
import { IUpdatePasswordDTO } from "../../dtos/account/IUpdatePasswordDTO"

interface IAccountsRepository {
    create(data: ICreateAccountDTO): Promise<void>
    findAll(): Promise<void>
    findByEmail(email: string): Promise<AccountDataDTO>
    findById(account_id: string): Promise<AccountDataDTO>
    updateAvatar(data: IUpdateAvatarDTO): Promise<void>
    updatePassword(data: IUpdatePasswordDTO): Promise<void>
}

export { IAccountsRepository }
