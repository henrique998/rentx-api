import fs from "fs"

class DeleteFile {
    static async run(filename: string) {
        try {
            await fs.promises.stat(filename)
        } catch {
            return
        }

        await fs.promises.unlink(filename)
    }
}

export { DeleteFile }