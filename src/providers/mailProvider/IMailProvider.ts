import { ISendMailDTO } from "../../dtos/email/ISendMailDTO"

interface IMailProvider {
    send(data: ISendMailDTO): void
}

export { IMailProvider }