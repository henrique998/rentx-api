import nodemailer, { Transporter } from "nodemailer"
import handlebars from "handlebars"
import fs from "fs"

import { ISendMailDTO } from "../../../dtos/email/ISendMailDTO";
import { IMailProvider } from "../IMailProvider";

class MailtrapMailProvider implements IMailProvider {
    private client: Transporter

    constructor() {
        this.client = nodemailer.createTransport({
            host: process.env.MAILTRAP_API_HOST,
            port: process.env.MAILTRAP_API_PORT,
            auth: {
                user: process.env.MAILTRAP_API_USER,
                pass: process.env.MAILTRAP_API_PASS
            }
        });
    }

    send({ to, subject, variables, path }: ISendMailDTO): void {
        const templateFileContent = fs.readFileSync(path, "utf-8")

        const templateParse = handlebars.compile(templateFileContent)

        const templateHTML = templateParse(variables)

        this.client.sendMail({
            from: {
                address: "Rentx <noreplay@rentx.com.br>",
                name: "henrique monteiro"
            },
            to,
            subject,
            html: templateHTML
        })
    }
}

export { MailtrapMailProvider }