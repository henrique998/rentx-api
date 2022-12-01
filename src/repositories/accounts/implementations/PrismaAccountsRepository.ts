import { prisma } from "../../../config/prisma";
import { AccountDataDTO } from "../../../dtos/account/AccountDataDTO";
import { ICreateAccountDTO } from "../../../dtos/account/ICreateAccountDTO";
import { IUpdateAvatarDTO } from "../../../dtos/account/IUpdateAvatarDTO";
import { IUpdatePasswordDTO } from "../../../dtos/account/IUpdatePasswordDTO";
import { IAccountsRepository } from "../IAccountsRepository";

class PrismaAccountsRepository implements IAccountsRepository {
    async create(data: ICreateAccountDTO): Promise<void> {
        await prisma.account.create({
            data,
        })
    }

    async findAll(): Promise<void> {
        // return this.accounts;
    }

    async findByEmail(email: string): Promise<AccountDataDTO> {
        const account = await prisma.account.findUnique({
            where: {
                email
            }
        })

        return account
    }

    async findById(account_id: string): Promise<AccountDataDTO> {
        const account = await prisma.account.findUnique({
            where: {
                id: account_id
            }
        })

        return account
    }

    async updateAvatar(data: IUpdateAvatarDTO): Promise<void> {
        await prisma.account.update({
            data: {
                avatar: data.avatar_url
            },
            where: {
                id: data.account_id
            }
        })
    }

    async updatePassword({ account_id, new_password }: IUpdatePasswordDTO): Promise<void> {
        await prisma.account.update({
            where: {
                id: account_id
            },
            data: {
                password: new_password
            }
        })
    }
}

export { PrismaAccountsRepository };
