import React from "react"
import spotifyApi from "../helpers/spotifyApi"

const Index = () => {
	return (
		<div className="App">
			<header className="App-header">
				<a href={spotifyApi.authorize}>
					<button>Authorize</button>
				</a>
			</header>
		</div>
	)
}

export default Index
