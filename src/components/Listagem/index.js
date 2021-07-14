import { ProfileRelationsBoxWrapper } from '../ProfileRelations'

export function Listagem(props) {
    return (
        <ProfileRelationsBoxWrapper>
            <h2 className='smallTitle'>{`${props.title}(${props.array.length})`}</h2>
            {/* Map retorna itens! Por isso não pode ser usado forEach */}
            <ul>
                {props.array.map((itemAtual) => {
                    if (typeof itemAtual === 'object') {
                        return (
                            <li key={itemAtual.id}>
                                <a href={`/users/${itemAtual.title}`}>
                                    <img src={itemAtual.image}></img>
                                    <span>{itemAtual.title}</span>
                                </a>
                            </li>
                        )
                    } else {
                        return (
                        <li key={itemAtual}>
                            <a href={`/users/${itemAtual}`} key={itemAtual}>
                                <img src={`http://github.com/${itemAtual}.png`}></img>
                                <span>{itemAtual}</span>
                            </a>
                        </li>
                        )
                    }

                })}
            </ul>
        </ProfileRelationsBoxWrapper>
    )
}