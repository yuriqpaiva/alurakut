import { Fragment } from 'react'
import { ProfileRelationsBoxWrapper } from '../ProfileRelations'

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
            {/* Map retorna itens! Por isso não pode ser usado forEach */}
            <ul>
                {props.array.map((itemAtual, index) => {
                    if (typeof itemAtual === 'object' && index < 6) {
                        return (
                            <li key={itemAtual.id}>
                                <a href={itemAtual.link} target="_blank">
                                    <img src={itemAtual.image}></img>
                                    <span>{itemAtual.title}</span>
                                </a>
                            </li>
                        )
                    } else if (index < 6) {
                        return (
                            <li key={itemAtual}>
                                <a href={`/users/${itemAtual}`} key={itemAtual}>
                                    <img src={`http://github.com/${itemAtual}.png`}></img>
                                    <span>{itemAtual}</span>
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