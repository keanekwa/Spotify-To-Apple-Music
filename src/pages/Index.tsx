import { useCookies } from "react-cookie"
import OauthPopup from "react-oauth-popup"
import spotifyApi from "../helpers/spotifyApi"

const Index = () => {
	const [cookies, setCookie, removeCookie] = useCookies()

	const onCode = async (code: any, params: any) => {
		const state = params.get("state")

		if (spotifyApi.validateState(state)) {
			const spotifyToken = await spotifyApi.requestToken(code)
			setCookie("spotifyToken", spotifyToken)
		} else {
			console.error("State does not match. Is someone trying to perform a CSRF attack?")
		}
	}

	return (
		<div className="App">
			<header className="App-header">
				<OauthPopup
					url={spotifyApi.authorize}
					onCode={onCode}
					onClose={() => {}}
					title="Connect to Spotify"
					width={400}
					height={500}>
					<button>Authorize</button>
				</OauthPopup>
			</header>
		</div>
	)
}

export default Index
