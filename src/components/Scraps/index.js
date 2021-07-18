import Box from '../Box'
import { Fragment } from 'react'
import React from 'react'
import { Top, Comment, InsertRecado } from './comment'

export function Scraps(props) {

    const [scraps, setScraps] = React.useState([])

    React.useEffect(() => {
        fetch(`https://graphql.datocms.com/`, {
            method: 'POST',
            headers: {
                'Authorization': '1dd555e102993f65efed1f903a2744',
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                "query": `query { 
                allScraps {
                id
                title
                message
                creatorSlug
            } 
         } `})
        })
            .then((response) => response.json())
            .then((respostaCompleta) => {
                const scrapsVindasDoDato = respostaCompleta.data.allScraps
                // console.log(respostaCompleta)
                setScraps(scrapsVindasDoDato)
         })
    })


    const handleSubmitScraps = (e) => {
        e.preventDefault()
        const dadosDoForm = new FormData(e.target)
        const recado = {
            title: dadosDoForm.get('title'),
            message: dadosDoForm.get('message'),
            creatorSlug: props.githubUser
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
                <InsertRecado>
                    <h2 className='subTitle'>Deixe seu recado, <a href="">@{props.githubUser}</a></h2>
                    <img src={`https://github.com/${props.githubUser}.png`}></img>
                </InsertRecado>

                <form onSubmit={handleSubmitScraps}>
                    <input
                        placeholder='Assunto'
                        type='text'
                        name='title' />
                    <textarea
                        placeholder='Mensagem'
                        type='text'
                        name='message' />
                    <button>Enviar</button>
                </form>

            </Box>
            <Box>
                <h2 className='subTitle'>Mural de Recados</h2>
                <ul>
                    {
                        scraps.map((itemAtual) => {
                            return (
                                <li className='comments'>
                                    <Top>
                                        <img src={`https://github.com/${itemAtual.creatorSlug}.png`} />
                                        <a>@{itemAtual.creatorSlug}</a>
                                    </Top>
                                    <Comment>
                                        <h4>{itemAtual.title}</h4>
                                        <p>{itemAtual.message}</p>
                                    </Comment>
                                </li>
                            )
                        })
                    }
                </ul>
            </Box>
        </Fragment>
    )
}