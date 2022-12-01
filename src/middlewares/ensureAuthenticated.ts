import { NextFunction, Request, response, Response } from "express";
import { verify } from "jsonwebtoken";
import { authConfig } from "../config/auth";
import { AppError } from "../errors/AppError";
import { PrismaAccountsRepository } from "../repositories/accounts/implementations/PrismaAccountsRepository";

interface IPayload {
  sub: string;
}

async function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError({ error: true, code: "token.missing" }, 401);
  }

  const [, token] = authHeader?.split(" ");

  try {
    const { sub: account_id } = verify(token, authConfig.TOKEN_SECRET_KEY) as IPayload;

    const accountsRepository = new PrismaAccountsRepository()

    const accountExists = await accountsRepository.findById(account_id)

    if (!accountExists) {
      throw new AppError({ error: "Account not found!" }, 404)
    }

    req.account = {
      id: account_id
    }

    next();
  } catch {
    throw new AppError({ error: true, code: "token.expired" }, 401);
  }
}

export { ensureAuthenticated };

