import axios from "axios"
import qs from "qs"
import { v4 as uuidv4 } from "uuid"
import { createParamString } from "./utils"
import { Buffer } from "buffer"

const client_id = process.env.REACT_APP_SPOTIFY_CLIENT_ID
const client_secret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET
const spotifyAxiosClient = axios.create({
	baseURL: "https://api.spotify.com/v1"
})

const authorizeBaseUrl = "https://accounts.spotify.com/authorize"
const authorizeParams = {
	client_id: client_id || "",
	response_type: "code",
	redirect_uri: "http://localhost:3000/spotify-callback",
	scope: "playlist-read-private playlist-read-collaborative",
	state: uuidv4()
}
const authorize = authorizeBaseUrl + createParamString(authorizeParams)

const validateAuthorizeState = (state: string) => {
	return state === authorizeParams.state
}

const requestAccessToken = (code: string) => {
	return axios.post(
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
}

const spotifyApi = {
	authorize: authorize,
	validateAuthorizeState: validateAuthorizeState,
	requestAccessToken: requestAccessToken
}

export default spotifyApi
