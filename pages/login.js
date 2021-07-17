import React from 'react';
// Hook do NextJS:
import { useRouter } from 'next/router'
import nookies from 'nookies'

export default function LoginScreen(props) {
    const router = useRouter()
    const [githubUser, setGithubUser] = React.useState([])
    const menssagem = false
    return (
        <main style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <div className="loginScreen">
                <section className="logoArea">
                    <img src="https://alurakut.vercel.app/logo.svg" />

                    <p><strong>Conecte-se</strong> aos seus amigos e familiares usando recados e mensagens instantâneas</p>
                    <p><strong>Conheça</strong> novas pessoas através de amigos de seus amigos e comunidades</p>
                    <p><strong>Compartilhe</strong> seus vídeos, fotos e paixões em um só lugar</p>
                </section>

                <section className="formArea">
                    <form className="box" onSubmit={async (infosDoEvento) => {
                        var token
                        infosDoEvento.preventDefault() // Tirar o comportamento padrão do navegador de atualizar a página ao clicar para submeter, garantindo o comportamento de SPA. 
                        console.log('Usuário: ', githubUser)

                        const algo = await fetch('https://alurakut.vercel.app/api/login', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ githubUser: githubUser })
                        })
                            .then(async (response) => {
                                const dadosResponse = await response.json()
                                token = dadosResponse.token
                                nookies.set(null, 'USER_TOKEN', token, {
                                    path: '/',
                                    maxAge: 86400 * 7
                                })
                                router.push('/')
                            })
                    }
                    }>
                        <p>
                            Acesse agora mesmo com seu usuário do <strong>GitHub</strong>!
                        </p>
                        <input
                            placeholder="Usuário"
                            value={githubUser}
                            onChange={(evento) => {
                                // console.log(evento.target.value)
                                setGithubUser(evento.target.value)
                            }}
                        />
                        <p className='avisoPreencher'>
                            {
                                githubUser.length === 0
                                    ? 'Preencha o campo acima'
                                    : ''
                            }
                        </p>
                        
                        <button type="submit">
                            Login
                        </button>
                    </form>

                    <footer className="box">
                        <p>
                            Ainda não é membro? <br />
                            <a href="/login">
                                <strong>
                                    ENTRAR JÁ
                                </strong>
                            </a>
                        </p>
                    </footer>
                </section>

                <footer className="footerArea">
                    <p>
                        © 2021 alura.com.br - <a href="/">Sobre o Orkut.br</a> - <a href="/">Centro de segurança</a> - <a href="/">Privacidade</a> - <a href="/">Termos</a> - <a href="/">Contato</a>
                    </p>
                </footer>
            </div>
        </main>
    )
}