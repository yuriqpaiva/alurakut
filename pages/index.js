import React from 'react'
import nookies from 'nookies'
import jwt from 'jsonwebtoken'
import styled from 'styled-components'
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons'
import { Fragment } from 'react'
import { ProfileSidebar } from '../src/components/ProfileSidebar'
import { FormularioComunidade } from '../src/components/FormularioComunidade'
import { Listagem } from '../src/components/Listagem'
import { comunidadesArray } from '../src/assets/dados/comunidadesArray'
import router from 'next/router'
import { destroyCookie } from 'nookies'

export default function Home(props) {
  const [githubUser, setGithubUser] = React.useState([props.githubUser])
  const [comunidades, setComunidades] = React.useState([])
  // const comunidades = ['Alurakut']
  const pessoasFavoritas = [
    'juunegreiros',
    'omariosouto',
    'peas',
    'rafaballerini',
    'marcobrunodev',
    'felipefialho',
    'felipealves'
  ]
  const [seguindo, setSeguindo] = React.useState([])
  const [seguidores, setSeguidores] = React.useState([])
  // 0 - Pegar o array de dados do GitHub
  React.useEffect(function () {
    // GET
    fetch(`https://api.github.com/users/${githubUser}/followers`)
      .then((respostaDoServidor) => respostaDoServidor.json())
      .then((respostaCompleta) => {
        setSeguidores(respostaCompleta)
      })

    fetch(`https://api.github.com/users/${githubUser}/following`)
      .then((respostaDoServidor) => respostaDoServidor.json())
      .then((respostaCompleta) => {
        setSeguindo(respostaCompleta)
      })

    // API GraphQL
    fetch(`https://graphql.datocms.com/`, {
      method: 'POST',
      headers: {
        'Authorization': '1dd555e102993f65efed1f903a2744',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        "query": `query { 
        allCommunities {
          id
          title
          imageUrl
          creatorSlug
        } 
      }` })
    })
      .then((response) => response.json())
      .then((respostaCompleta) => {
        const comunidadesVindasDoDato = respostaCompleta.data.allCommunities
        // console.log(respostaCompleta)
        setComunidades(comunidadesVindasDoDato)
      })
  }, [])

  // 1 - Criar um box que vai ter um map, baseado nos itens do array
  // que pegamos do GitHub

  return (
    <Fragment>
      <AlurakutMenu githubUser={githubUser} />
      <MainGrid>
        <div className='profileArea' style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={githubUser} as="aside" />
        </div>
        <div className='welcomeArea' style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className='title'>
              Bem-vindo(a)
            </h1>
            <OrkutNostalgicIconSet />
          </Box>
          <Box>
            <h2 className='subTitle'>Adicionar Comunidade</h2>
            <form onSubmit={function handleCriarComunidade(e) {
              e.preventDefault()
              let random = Math.floor(Math.random() * (200 - 10)) + 10
              const dadosDoForm = new FormData(e.target) // Dados do Form
              if (dadosDoForm.get('image') === '') {
                dadosDoForm.set('image', `https://picsum.photos/id/${random}/200/300`)
              }
              const comunidade = {
                title: dadosDoForm.get('title'),
                imageUrl: dadosDoForm.get('image'),
                creatorSlug: props.githubUser
              }
              fetch('/api/comunidades', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(comunidade)
              })
                .then(async (response) => {
                  const dados = await response.json()
                  const comunidade = dados.registroCriado
                  const comunidadesAtualizadas = [comunidade, ...comunidades]
                  setComunidades(comunidadesAtualizadas)
                })
            }}>
              <div>
                <input
                  placeholder='Qual vai ser o nome da sua comunidade?'
                  name='title'
                  aria-label='Qual vai ser o nome da sua comunidade?'
                  type='text'
                />
              </div>
              <div>
                <input
                  placeholder='Insira uma URL de imagem para usarmos como capa'
                  name='image'
                  aria-label='Insira uma URL de imagem para usarmos como capa'
                />
              </div>
              {/* <div>
                <input
                  placeholder='Insira a URL da sua comunidade'
                  name='linkComunidade'
                  aria-label='Insira a URL da sua comunidade'
                />
              </div> */}
              <button>
                Criar comunidade
              </button>
            </form>
          </Box>
        </div>
        <div className='profileRelationsArea' style={{ gridArea: 'profileRelationsArea' }}>
          <Listagem title={'Seguidores'} array={seguidores} setGithubUser={setGithubUser} setSeguidores={setSeguidores}/>
          <Listagem title={'Seguindo'} array={seguindo} setGithubUser={setGithubUser} setSeguindo={setSeguindo.bind(this)}
          seguindo={seguindo}/>
          <Listagem title={'Comunidades'} array={comunidades} />
        </div>
      </MainGrid>
    </Fragment>
  )
}

export async function getServerSideProps(context) {
  
  const cookies = nookies.get(context)
  const autenticado = false
  const token = cookies.USER_TOKEN
  console.log('Token decodificado', jwt.decode(token))

  const { isAuthenticated } = await fetch('http://localhost:3000/api/auth', {
    headers: {
      Authorization: token
    }
  })
    .then((response) => response.json())
  console.log(isAuthenticated)

  if (!isAuthenticated) {
    return {
      redirect: {
        destination: '/notFound',
        permanent: false,
      }
    }
  }

  const { githubUser } = jwt.decode(token)
  return {
    props: {
      githubUser
    }, // will be passed to the page component as props
  }
}