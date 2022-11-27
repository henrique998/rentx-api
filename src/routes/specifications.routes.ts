import { Router } from "express";
import { CreateSpecificationController } from "../modules/specification/CreateSpecification/CreateSpecificationController";

const specificationRoute = Router();

const createSpecificationController = new CreateSpecificationController();

specificationRoute.post("/", createSpecificationController.handle);

export { specificationRoute as specificationsRoutes };
