import { SiteClient } from 'datocms-client'
// Import da biblioteca do Dato que permite nosso Backend rodar as 
// informações (escondendo do usuário algumas requisições importantes
// como as tokens)

export default async function recebedorDeRequests(request, response) {
    if (request.method === 'POST') {
        const TOKEN = '1e3c968c1d1c25d649255192fc63ba'
        const client = new SiteClient(TOKEN);

        // Validar os dados, antes de sair cadastrando
        const registroCriado = await client.items.create({
            itemType: '968070', // O id de communities é criado pelo Dato
            ...request.body,
        })
        console.log(registroCriado)
        response.json({
            dados: 'Algum dado qualquer',
            registroCriado: registroCriado
        })
        return
    }
    response.status(404).json({
        message: 'Ainda não temos nada no GET, mas no POST tem!'
    })
}