import { Router } from "express";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { CreateSpecificationController } from "../modules/specification/CreateSpecification/CreateSpecificationController";

const specificationRoute = Router()

const createSpecificationController = new CreateSpecificationController()

specificationRoute.use(ensureAuthenticated)

specificationRoute.post(
    "/",
    ensureAdmin,
    createSpecificationController.handle
)

export { specificationRoute as specificationsRoutes }
