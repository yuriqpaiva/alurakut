import { Box } from '../Box'

export function FormularioComunidade(props) {
    return (
        <Box>
            <h2 className='subTitle'>O que você deseja fazer?</h2>
            <form onSubmit={function handleCriarComunidade(e) {
                const dadosDoForm = new FormData(e.target) // Dados do Form
                const comunidade = {
                    id: new Date().toISOString(),
                    titulo: dadosDoForm.get('title'),
                    image: dadosDoForm.get('image')
                }
                e.preventDefault()
                const comunidadesAtualizadas = [...props.comunidades, comunidade]
                props.setComunidades(comunidadesAtualizadas)
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
                        placeholder='Coloque uma URL para usarmos de capa'
                        name='image'
                        aria-label='Coloque uma URL para usarmos de capa'
                    />
                </div>
                <button>
                    Criar comunidade
                </button>
            </form>
        </Box>
    )
}