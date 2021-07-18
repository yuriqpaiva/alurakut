import Box from '../Box'
import { Fragment } from 'react'
import React from 'react'
import { Top, Comment, InsertRecado } from './comment'



export function Scraps(props) {

    const [scraps, setScraps] = React.useState([])

    const [inputAssunto, setInputAssunto] = React.useState('')
    const handleInputAssunto = (e) => {
        setInputAssunto(e.target.value)
    }

    const [inputMensagem, setInputMensagem] = React.useState('')
    const handleInputMensagem = (e) => {
        setInputMensagem(e.target.value)
    }

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
        if (dadosDoForm.get('title') === '') {
            dadosDoForm.set('title', 'Sem Assunto')
        }

        if (dadosDoForm.get('message') === '') {
            dadosDoForm.set('message', 'Mensagem Vazia')
        }
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
        setInputAssunto('')
        setInputMensagem('')
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
                        onChange={handleInputAssunto}
                        placeholder='Assunto'
                        type='text'
                        name='title'
                        value={inputAssunto}
                    />

                    <textarea
                        onChange={handleInputMensagem}
                        placeholder='Mensagem'
                        type='text'
                        name='message'
                        value={inputMensagem}
                    />
                    <button>Enviar Recado</button>
                </form>

            </Box>
            <Box>
                <h2 className='subTitle'>Mural de Recados</h2>
                <ul>
                    {
                        scraps.map((itemAtual) => {
                            return (
                                <li className='comments' key={itemAtual.id}>
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

