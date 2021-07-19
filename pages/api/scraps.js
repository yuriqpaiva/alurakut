import { SiteClient } from 'datocms-client'

export default async function recebedorDeRequests(req, res) {
    if (req.method === 'POST') {
        const TOKEN = '1e3c968c1d1c25d649255192fc63ba'
        const client = new SiteClient(TOKEN);

        // Validar os dados, antes de sair cadastrando
        const registroCriado = await client.items.create({
            itemType: '976889', // O id de communities é criado pelo Dato
            ...req.body,
        })
        console.log(registroCriado)
        res.json({
            registroCriado: registroCriado
        })
        return
    }
    res.status(404).json({
        message: 'Ainda não temos nada no GET, mas no POST tem!'
    })
}