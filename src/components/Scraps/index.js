import Box from '../Box'
import { Fragment } from 'react'
import React from 'react'


export function Scraps () {

    const [scraps, setScraps] = React.useState([])

    const handleSubmitScraps = (e) => {
        e.preventDefault()
        const dadosDoForm = new FormData(e.target)
        const recado = {
            title: dadosDoForm.get('title'),
            message: dadosDoForm.get('message')
        }
        fetch('/api/scraps', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(recado)
          })
            .then(async (response) => {
              const dados = await response.json()
              const scrap = dados.registroCriado
              const scrapsAtualizados = [scrap, ...scraps]
              setScraps(scrapsAtualizados)
            })
    }

    return (
        <Fragment>
            <Box>
                <h2 className='subTitle'>Deixe seu recado</h2>
                <form onSubmit={handleSubmitScraps}>
                    <input 
                    placeholder='Assunto' 
                    type='text' 
                    name='title'/>
                    <textarea 
                    placeholder='Mensagem' 
                    type='text' 
                    name='message'/>
                    <button>Enviar</button>
                </form>

            </Box>
            <Box>
                <h2 className='subTitle'>Recados</h2>
                <ul>
                    {
                        scraps.map((itemAtual) => {
                            return (
                            <li>
                                <h2>{itemAtual.title}</h2>
                                <p>{itemAtual.message}</p>
                            </li>
                            )
                        })
                    }
                </ul>
            </Box>
        </Fragment>
    )
}