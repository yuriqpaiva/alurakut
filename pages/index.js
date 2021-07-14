import React from 'react'
import styled from 'styled-components'
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons'
import { Fragment } from 'react'
import { ProfileSidebar } from '../src/components/ProfileSidebar'
import { FormularioComunidade } from '../src/components/FormularioComunidade'
import { Listagem } from '../src/components/Listagem'

export default function Home() {
  const githubUser = 'yuriqpaiva'
  const [comunidades, setComunidades] = React.useState([{
    id: '21312872734728387492',
    title: 'Eu odeio acordar cedo',
    image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg'
  }])
  console.log(comunidades)
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

  return (
    <Fragment>
      <AlurakutMenu githubUser={githubUser}/>
      <MainGrid >
        <div className='profileArea' style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={githubUser} as="aside" />
        </div>
        <div className='welcomeArea' style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className='title'>
              Bem vindo(a)
            </h1>
            <OrkutNostalgicIconSet />
          </Box>
          <Box>
            <h2 className='subTitle'>O que você deseja fazer?</h2>
            <form onSubmit={function handleCriarComunidade(e) {
              let random = Math.floor(Math.random() * (200 - 10)) + 10
              const dadosDoForm = new FormData(e.target) // Dados do Form
              if (dadosDoForm.get('image') === '') {
                dadosDoForm.set('image', `https://picsum.photos/id/${random}/200/300`) 
              }
              const comunidade = {
                id: new Date().toISOString(),
                title: dadosDoForm.get('title'),
                image: dadosDoForm.get('image'),
                link: dadosDoForm.get('link')
              }
              e.preventDefault()
              const comunidadesAtualizadas = [...comunidades, comunidade]
              setComunidades(comunidadesAtualizadas)
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
                  placeholder='Insira uma URL para usarmos de capa'
                  name='image'
                  aria-label='Insira uma URL para usarmos de capa'
                />
              </div>
              <div>
                <input
                  placeholder='Insira a URL da sua comunidade'
                  name='linkComunidade'
                  aria-label='Insira a URL da sua comunidade'
                />
              </div>
              <button>
                Criar comunidade
              </button>
            </form>
          </Box>
        </div>
        <div className='profileRelationsArea' style={{ gridArea: 'profileRelationsArea' }}>
          <Listagem title={'Comunidades'} array={comunidades}/>
          <Listagem title={'Pessoas da Comunidade'} array={pessoasFavoritas}/>
        </div>
      </MainGrid>
    </Fragment>
  )
}
