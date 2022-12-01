import { Router } from "express"

import { CreateSessionController } from "../modules/session/CreateSession/CreateSessionController"
import { RefreshTokenController } from "../modules/session/RefreshToken/RefreshTokenController"

const sessionRoute = Router()

const createSessionController = new CreateSessionController()
const refreshTokenController = new RefreshTokenController()

sessionRoute.post("/", createSessionController.handle)
sessionRoute.post("/refresh-token", refreshTokenController.handle)

export { sessionRoute as sessionRoutes }
