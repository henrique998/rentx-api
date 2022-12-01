import { Router } from "express"
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated"

import { CreateRentalController } from "../modules/rental/CreateRental/CreateRentalController"
import { DevolutionRentalController } from "../modules/rental/DevolutionRental/DevolutionRentalController"
import { ListRentalsByAccountController } from "../modules/rental/ListRentalsByAccount/ListRentalsByAccountController"

const rentalRoute = Router()

const createRentalController = new CreateRentalController()
const devolutionRentalController = new DevolutionRentalController()
const listRentalsByAccountController = new ListRentalsByAccountController()

rentalRoute.use(ensureAuthenticated)

rentalRoute.post("/", ensureAuthenticated, createRentalController.handle)

rentalRoute.post(
    "/devolution/:rental_id",
    ensureAuthenticated,
    devolutionRentalController.handle
)

rentalRoute.get(
    "/account",
    ensureAuthenticated,
    listRentalsByAccountController.handle
)

export { rentalRoute as rentalsRoutes }
