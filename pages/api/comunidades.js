import { SiteClient } from "datocms-client"

export default async function RequestReceiver(req, res) {
    if(req.method === "POST") {
        const TOKEN = "8f711f7c26b19910efeef3ba1bcc76"
        const client = new SiteClient(TOKEN)

        const registroCriado = await client.items.create({
            itemType: "976907",
            ...req.body
        })

        res.json({
            registroCriado: registroCriado
        })
    } else {
        res.status(404).json({
            message: "Faça requisições pelo POST, não temos nada no GET!"
        })
    }
}