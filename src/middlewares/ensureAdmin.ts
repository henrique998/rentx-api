import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";
import { PrismaAccountsRepository } from "../repositories/accounts/implementations/PrismaAccountsRepository";

export async function ensureAdmin(req: Request, res: Response, next: NextFunction) {
    const { id: accountId } = req.account

    const accountsRepository = new PrismaAccountsRepository()

    const account = await accountsRepository.findById(accountId)

    if (!account.admin) {
        throw new AppError({ error: "Unauthorized action!" })
    }

    return next()
}