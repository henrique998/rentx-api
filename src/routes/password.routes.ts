import { Router } from "express";
import { ResetPasswordController } from "../modules/password/ResetPassword/ResetPasswordController";
import { SendForgotPasswordMailController } from "../modules/password/SendForgotPasswordMail/SendForgotPasswordMailController";

const passwordRoute = Router()

const sendForgotPasswordMailController = new SendForgotPasswordMailController()
const resetPasswordController = new ResetPasswordController()

passwordRoute.post("/forgot", sendForgotPasswordMailController.handle)
passwordRoute.patch("/reset", resetPasswordController.handle)

export { passwordRoute as passwordRoutes }