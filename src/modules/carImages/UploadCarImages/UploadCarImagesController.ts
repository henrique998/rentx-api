import { Request, Response } from "express"
import { container } from "tsyringe"

import { UploadCarImagesUseCase } from "./UploadCarImagesUseCase"

interface IFile {
    filename: string
}

class UploadCarImagesController {
    async handle(req: Request, res: Response): Promise<Response> {
        const { car_id } = req.params
        const images = req.files as IFile[]

        const uploadCarImagesUseCase = container.resolve(UploadCarImagesUseCase)

        const images_urls = images.map(image => image.filename)

        await uploadCarImagesUseCase.execute({
            car_id,
            images_urls
        })

        return res
            .status(201)
            .json({ message: "images addedd to cart successfuly!" })
    }
}

export { UploadCarImagesController }
