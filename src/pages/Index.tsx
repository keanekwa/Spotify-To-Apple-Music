import { useCookies } from "react-cookie"
import OauthPopup from "react-oauth-popup"
import spotifyApi from "../helpers/spotifyApi"

const Index = () => {
	const [cookies, setCookie, removeCookie] = useCookies()

	const onAuthorizeSpotify = async (code: any, params: any) => {
		const state = params.get("state")

		if (spotifyApi.validateState(state)) {
			const spotifyToken = await spotifyApi.requestToken(code)
			setCookie("spotifyToken", spotifyToken)
		} else {
			console.error("State does not match. Is someone trying to perform a CSRF attack?")
		}
	}

	const onGetSpotifyPlaylists = () => {
		spotifyApi.getPlaylists(cookies.spotifyToken)
	}

	return (
		<>
			<OauthPopup
				url={spotifyApi.authorize}
				onCode={onAuthorizeSpotify}
				onClose={() => {}}
				title="Connect to Spotify"
				width={400}
				height={500}>
				<button>Connect to Spotify</button>
			</OauthPopup>
			{cookies?.spotifyToken && <button onClick={onGetSpotifyPlaylists}>Get Spotify Playlists</button>}
		</>
	)
}

export default Index
