import cors from "cors"
import "dotenv/config"
import express, { NextFunction, Request, Response } from "express"

import "express-async-errors"
// import { resolve } from "path"

import "reflect-metadata"
import swaggerFile from "./swagger.json"
import "./container"
import swaggerUi from "swagger-ui-express"
import { AppError } from "./errors/AppError"
import { routes } from "./routes"
import { resolve } from "path"

const app = express()

app.use(express.json())
app.use("/images", express.static(resolve(__dirname, "..", "uploads")))

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile))
app.use(cors())
app.use(routes)

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({
            message: err.message,
        })
    }

    return response.status(500).json({
        status: "error",
        message: `Internal server error - ${err.message}`,
    })
})

export { app }
