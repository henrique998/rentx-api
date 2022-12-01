import { Router } from "express"
import multer from "multer"
import { Upload } from "../config/multer"
import { ensureAdmin } from "../middlewares/ensureAdmin"
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated"

import { CreateCarController } from "../modules/car/CreateCar/CreateCarController"
import { FindAllAvailableCarsController } from "../modules/car/FindAllAvailable/FindAllAvailableCarsController"
import { UploadCarImagesController } from "../modules/carImages/UploadCarImages/UploadCarImagesController"
import { CreateCarSpecificationController } from "../modules/carSpecification/CreateCarSpecification/CreateCarSpecificationController"

const carRoute = Router()

const upload = multer(Upload.run("./uploads/car-images"))

const createCarController = new CreateCarController()
const createCarSpecificationController = new CreateCarSpecificationController()
const uploadCarImagesController = new UploadCarImagesController()
const findAllAvailableCarsController = new FindAllAvailableCarsController()

carRoute.use(ensureAuthenticated)

carRoute.post(
    "/",
    ensureAdmin,
    createCarController.handle
)

carRoute.post(
    "/specifications/:car_id",
    ensureAdmin,
    createCarSpecificationController.handle
)

carRoute.post(
    "/:car_id/images",
    ensureAdmin,
    upload.array("images"),
    uploadCarImagesController.handle
)

carRoute.get(
    "/",
    findAllAvailableCarsController.handle
)

export { carRoute as carsRoutes }
