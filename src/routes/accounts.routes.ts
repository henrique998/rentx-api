import { Router } from "express";
import multer from "multer";
import { Upload } from "../config/multer";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

import { CreateAccountController } from "../modules/account/CreateAccount/CreateAccountController";
import { FindAllAccountsController } from "../modules/account/FindAllAccounts/FindAllAccountsController";
import { UpdateAccountAvatarController } from "../modules/account/UpdateAccountAvatar/UpdateAccountAvatarController";

const accountRoute = Router();

const upload = multer(Upload.run("./uploads/avatar"))

const createAccountController = new CreateAccountController();
const findAllAccountsController = new FindAllAccountsController();
const updateAccountAvatarController = new UpdateAccountAvatarController();

accountRoute.get("/", findAllAccountsController.handle);

accountRoute.post(
    "/",
    upload.single("avatar"),
    createAccountController.handle
)

accountRoute.patch(
    "/update-avatar",
    ensureAuthenticated,
    upload.single("avatar"),
    updateAccountAvatarController.handle
)

export { accountRoute as accountRoutes };
