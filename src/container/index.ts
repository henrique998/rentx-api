import { container } from "tsyringe";
import { IDateProvider } from "../providers/dateProvider/IDateProvider";
import { DayjsDateProvider } from "../providers/dateProvider/implementations/DayjsDateProvider";
import { IMailProvider } from "../providers/mailProvider/IMailProvider";
import { MailtrapMailProvider } from "../providers/mailProvider/implementations/MailtrapMailProvider";
import { IAccountAuthTokensRepository } from "../repositories/accountAuthTokens/IAccountAuthTokensRepository";
import { PrismaAccountAuthTokensRepository } from "../repositories/accountAuthTokens/implementations/PrismaAccountAuthTokensRepository";

import { IAccountsRepository } from "../repositories/accounts/IAccountsRepository";
import { PrismaAccountsRepository } from "../repositories/accounts/implementations/PrismaAccountsRepository";
import { ICarImagesRepository } from "../repositories/carImages/ICarImagesRepository";
import { PrismaCarImagesRepository } from "../repositories/carImages/implementations/PrismaCarImagesRepository";
import { ICarsRepository } from "../repositories/cars/ICarsRepository";
import { PrismaCarsRepository } from "../repositories/cars/implementations/PrismaCarsRepository";
import { ICarSpecificationsRepository } from "../repositories/carSpecification/ICarSpecificationsRepository";
import { PrismaCarSpecificationsRepository } from "../repositories/carSpecification/implementations/PrismaCarSpecificationsRepository";

import { ICategoriesRepository } from "../repositories/categories/ICategoriesRepository";
import { PrismaCategoriesRepository } from "../repositories/categories/implementations/PrismaCategoriesRepository";
import { PrismaRentalsRepository } from "../repositories/rentals/implementations/PrismaRentalsRepository";
import { IRentalsRepository } from "../repositories/rentals/IRentalsRepository";

import { PrismaSpecificationsRepository } from "../repositories/specifications/implementations/PrismaSpecificationsRepository";
import { ISpecificationsRepository } from "../repositories/specifications/ISpecificationsRepository";

container.registerSingleton<IAccountsRepository>(
    "PrismaAccountsRepository",
    PrismaAccountsRepository
);

container.registerSingleton<IAccountAuthTokensRepository>(
    "PrismaAccountAuthTokensRepository",
    PrismaAccountAuthTokensRepository
)

container.registerSingleton<ICategoriesRepository>(
    "PrismaCategoriesRepository",
    PrismaCategoriesRepository
);

container.registerSingleton<ISpecificationsRepository>(
    "PrismaSpecificationsRepository",
    PrismaSpecificationsRepository
);

container.registerSingleton<ICarsRepository>(
    "PrismaCarsRepository",
    PrismaCarsRepository
);

container.registerSingleton<ICarSpecificationsRepository>(
    "PrismaCarSpecificationsRepository",
    PrismaCarSpecificationsRepository
);

container.registerSingleton<ICarImagesRepository>(
    "PrismaCarImagesRepository",
    PrismaCarImagesRepository
);

container.registerSingleton<IRentalsRepository>(
    "PrismaRentalsRepository",
    PrismaRentalsRepository
);

container.registerSingleton<IDateProvider>(
    "DayjsDateProvider",
    DayjsDateProvider
);

container.registerSingleton<IMailProvider>(
    "MailtrapMailProvider",
    MailtrapMailProvider
);
