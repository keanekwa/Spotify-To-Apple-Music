import axios from "axios"
import qs from "qs"
import { v4 as uuidv4 } from "uuid"
import { createParamString } from "./utils"
import { Buffer } from "buffer"

const client_id = process.env.REACT_APP_SPOTIFY_CLIENT_ID
const client_secret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET
const axiosClient = axios.create({
	baseURL: "https://api.spotify.com/v1"
})

const authorizeBaseUrl = "https://accounts.spotify.com/authorize"
const authorizeParams = {
	client_id: client_id || "",
	response_type: "code",
	redirect_uri: "http://localhost:3000/callback",
	scope: "playlist-read-private playlist-read-collaborative",
	state: uuidv4()
}
const authorize = authorizeBaseUrl + createParamString(authorizeParams)

const validateState = (state: string) => {
	return state === authorizeParams.state
}

const requestToken = async (code: string) => {
	const res = await axios.post(
		"https://accounts.spotify.com/api/token",
		qs.stringify({
			grant_type: "authorization_code",
			code: code,
			redirect_uri: authorizeParams.redirect_uri
		}),
		{
			headers: {
				Authorization: "Basic " + Buffer.from(client_id + ":" + client_secret).toString("base64")
			}
		}
	)

	return res?.data?.access_token
}

const getPlaylists = async (token: string) => {
	const res = await axiosClient.get("/me/playlists", { headers: { Authorization: `Bearer ${token}` } })

	return res?.data?.items
}

const getPlaylistTracks = async (token: string, href: string) => {
	let tracks: object[] = []
	let next = href

	while (next) {
		const res = await axiosClient.get(next, {
			headers: { Authorization: `Bearer ${token}` },
			params: { fields: "items(track(id, album, artists, name)), next" }
		})

		next = res?.data?.next
		tracks.push(...res?.data?.items)
	}

	return tracks
}

const spotifyApi = {
	authorize: authorize,
	validateState: validateState,
	requestToken: requestToken,
	getPlaylists: getPlaylists,
	getPlaylistTracks: getPlaylistTracks
}

export default spotifyApi
