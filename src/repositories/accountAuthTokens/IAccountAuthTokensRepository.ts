import { AccountAuthTokenDataDTO } from "../../dtos/accountAuthToken/AccountAuthTokenDataDTO"
import { ICreateAccountAuthTokenDTO } from "../../dtos/accountAuthToken/ICreateAccountAuthTokenDTO"

interface IAccountAuthTokensRepository {
    create(data: ICreateAccountAuthTokenDTO): Promise<void>
    findByAccountIdAndRefreshToken(accountId: string, refreshToken: string): Promise<AccountAuthTokenDataDTO>
    findByToken(token: string): Promise<AccountAuthTokenDataDTO>
    deleteById(id: string): Promise<void>
}

export { IAccountAuthTokensRepository }