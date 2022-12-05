import axios from "axios"
import { v4 as uuidv4 } from "uuid"
import { createParamString } from "./utils"

const spotifyAxiosClient = axios.create({
	baseURL: "https://api.spotify.com/v1"
})

const authorizeBaseUrl = "https://accounts.spotify.com/authorize"
const authorizeParams = {
	client_id: process.env.REACT_APP_SPOTIFY_CLIENT_ID || "",
	response_type: "code",
	redirect_uri: "http://localhost:3000",
	scope: "playlist-read-private playlist-read-collaborative",
	state: uuidv4()
}

const authorize = authorizeBaseUrl + createParamString(authorizeParams)

const spotify_api = {
	authorize: authorize
}

export default spotify_api
