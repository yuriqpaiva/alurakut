import { Fragment } from 'react'
import { ProfileRelationsBoxWrapper } from '../ProfileRelations'
import React from 'react'
import router from 'next/router'

export function Listagem(props) {

    const mostrarMais = () => {
        if (props.array.length > 6) {
            return (
                <a>Mostrar mais</a>
            )
        }
    }
    return (
        <ProfileRelationsBoxWrapper>
            <h2 className='smallTitle'>{`${props.title} (${props.array.length})`}</h2>
            <hr/>
            {/* Map retorna itens! Por isso não pode ser usado forEach */}
            <ul>
                {props.array.map((itemAtual, index) => {
                    if (typeof itemAtual === 'object' && index < 6 && itemAtual.creatorSlug) {
                        return (
                            <li key={itemAtual.id}>
                                <a href={`/communities/${itemAtual.id}`} target="_blank">
                                    <img src={itemAtual.imageUrl}></img>
                                    <span>{itemAtual.title}</span>
                                </a>
                            </li>
                        )
                    }
                    else if (index < 6) {
                        return (
                            <li key={index}>
                                <a onClick={() => {
                                    props.setGithubUser(itemAtual.login)
                                }} target="_blank">
                                    <img src={`http://github.com/${itemAtual.login}.png`}></img>
                                    <span>{itemAtual.login}</span>
                                </a>
                            </li>
                        )
                    }
                })
                }
            </ul>
            <Fragment>{mostrarMais()}</Fragment>
        </ProfileRelationsBoxWrapper>
    )
}