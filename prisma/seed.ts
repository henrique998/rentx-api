import { hash } from "bcrypt"
import { prisma } from "../src/config/prisma"

async function main() {
    const hashedPassword = await hash("herozero10", 8)

    await prisma.account.create({
        data: {
            name: "admin",
            email: "admin@rentx.com.br",
            password: hashedPassword,
            admin: true,
            driver_license: "EXP-123"
        }
    })
}

main()