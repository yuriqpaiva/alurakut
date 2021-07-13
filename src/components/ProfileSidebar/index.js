import Box from "../Box"

export function ProfileSidebar(props) {
    return (
        <Box>
            <img src={`https://github.com/${props.githubUser}.png`} style={{ borderRadius: '8px' }}></img>
        </Box>
    )
}

