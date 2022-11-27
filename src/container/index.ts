import { container } from "tsyringe";

import { IAccountsRepository } from "../repositories/accounts/IAccountsRepository";
import { PrismaAccountsRepository } from "../repositories/accounts/implementations/PrismaAccountsRepository";

import { ICategoriesRepository } from "../repositories/categories/ICategoriesRepository";
import { PrismaCategoriesRepository } from "../repositories/categories/implementations/PrismaCategoriesRepository";

import { PrismaSpecificationsRepository } from "../repositories/specifications/implementations/PrismaSpecificationsRepository";
import { ISpecificationsRepository } from "../repositories/specifications/ISpecificationsRepository";

container.registerSingleton<IAccountsRepository>(
    "PrismaAccountsRepository",
    PrismaAccountsRepository
);

container.registerSingleton<ICategoriesRepository>(
    "PrismaCategoriesRepository",
    PrismaCategoriesRepository
);

container.registerSingleton<ISpecificationsRepository>(
    "PrismaSpecificationsRepository",
    PrismaSpecificationsRepository
);
