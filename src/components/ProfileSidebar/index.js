import Box from "../Box"
import { AlurakutProfileSidebarMenuDefault } from '../../lib/AlurakutCommons'

export function ProfileSidebar(props) {
    return (
        <Box>
            <img src={`https://github.com/${props.githubUser}.png`} style={{ borderRadius: '8px' }}></img>
            <hr />
            <p>
                <a className='boxLink' href={`https://github.com/${props.githubUser}`}>
                    @{props.githubUser}
                </a>
            </p>
            <hr />
            <AlurakutProfileSidebarMenuDefault />
        </Box>
    )
}

