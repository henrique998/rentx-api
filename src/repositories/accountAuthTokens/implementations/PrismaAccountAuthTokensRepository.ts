import { prisma } from "../../../config/prisma";
import { AccountAuthTokenDataDTO } from "../../../dtos/accountAuthToken/AccountAuthTokenDataDTO";
import { ICreateAccountAuthTokenDTO } from "../../../dtos/accountAuthToken/ICreateAccountAuthTokenDTO";
import { IAccountAuthTokensRepository } from "../IAccountAuthTokensRepository";

class PrismaAccountAuthTokensRepository implements IAccountAuthTokensRepository {
    async create(data: ICreateAccountAuthTokenDTO): Promise<void> {
        await prisma.accountAuthToken.create({
            data: {
                refresh_token: data.refresh_token,
                expires_date: data.expires_date,
                account_id: data.account_id
            }
        })
    }

    async findByAccountIdAndRefreshToken(accountId: string, refreshToken: string): Promise<AccountAuthTokenDataDTO> {
        const accountAuthToken = await prisma.accountAuthToken.findFirst({
            where: {
                account_id: accountId,
                refresh_token: refreshToken
            }
        })

        return accountAuthToken
    }

    async findByToken(token: string): Promise<AccountAuthTokenDataDTO> {
        const authToken = await prisma.accountAuthToken.findFirst({
            where: {
                refresh_token: token
            }
        })

        return authToken
    }

    async deleteById(id: string): Promise<void> {
        await prisma.accountAuthToken.delete({
            where: {
                id,
            }
        })
    }
}

export { PrismaAccountAuthTokensRepository }