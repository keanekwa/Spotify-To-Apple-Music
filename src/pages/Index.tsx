import React from "react"
import { useCookies } from "react-cookie"
import OauthPopup from "react-oauth-popup"
import spotifyApi from "../helpers/spotifyApi"

const Index = () => {
	const [cookies, setCookie, removeCookie] = useCookies()

	const onCode = (code: any, params: any) => {
		const state = params.get("state")

		if (spotifyApi.validateAuthorizeState(state)) {
			setCookie("spotify-access-code", code)
		} else {
			console.error("State does not match. Is someone trying to perform a CSRF attack?")
		}

		console.log(cookies)
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
