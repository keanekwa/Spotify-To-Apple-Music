import React from "react"
import spotify_api from "../helpers/spotify_api"
import { useSearchParams } from "react-router-dom"

const SpotifyCallback = () => {
	const [searchParams, setSearchParams] = useSearchParams()
	console.log(searchParams.get("code"))
	console.log(searchParams.get("state"))

	return <></>
}

export default SpotifyCallback
