import { useState } from "react"
import { useCookies } from "react-cookie"
import OauthPopup from "react-oauth-popup"
import spotifyApi from "../helpers/spotifyApi"

const Index = () => {
	const [cookies, setCookie, removeCookie] = useCookies()
	const [spotifyPlaylists, setSpotifyPlaylists] = useState()
	const [spotifyTracks, setSpotifyTracks] = useState()

	const onAuthorizeSpotify = async (code: any, params: any) => {
		const state = params.get("state")

		if (spotifyApi.validateState(state)) {
			const spotifyToken = await spotifyApi.requestToken(code)
			setCookie("spotifyToken", spotifyToken)
		} else {
			console.error("State does not match. Is someone trying to perform a CSRF attack?")
		}
	}

	const onGetSpotifyPlaylists = async () => {
		const playlists = await spotifyApi.getPlaylists(cookies.spotifyToken)

		setSpotifyPlaylists(
			playlists.map((p: any) => (
				<button onClick={() => onGetPlaylistTracks(p?.tracks?.href)} key={p?.id}>
					{p?.name}
				</button>
			))
		)
	}

	const onGetPlaylistTracks = async (href: string) => {
		const tracks = await spotifyApi.getPlaylistTracks(cookies.spotifyToken, href)
		console.log(tracks)
		setSpotifyTracks(
			tracks.map((t: any) => (
				<li key={t?.track?.id}>
					Track: {t?.track?.name}, Album: {t?.track?.album?.name}, Artist: {t?.track?.artists[0]?.name}
				</li>
			))
		)
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
			{spotifyPlaylists
				? spotifyPlaylists
				: cookies?.spotifyToken && <button onClick={onGetSpotifyPlaylists}>Get Spotify Playlists</button>}
			<ol>{spotifyTracks}</ol>
		</>
	)
}

export default Index
