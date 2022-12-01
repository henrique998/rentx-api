import { Router } from "express"

import { accountRoutes } from "./accounts.routes"
import { carsRoutes } from "./cars.routes"
import { categoriesRoutes } from "./categories.routes"
import { passwordRoutes } from "./password.routes"
import { rentalsRoutes } from "./rentals.routes"
import { sessionRoutes } from "./session.routes"
import { specificationsRoutes } from "./specifications.routes"

const router = Router()

router.use("/accounts", accountRoutes)
router.use("/categories", categoriesRoutes)
router.use("/specifications", specificationsRoutes)
router.use("/session", sessionRoutes)
router.use("/cars", carsRoutes)
router.use("/rentals", rentalsRoutes)
router.use("/password", passwordRoutes)

export { router as routes }
