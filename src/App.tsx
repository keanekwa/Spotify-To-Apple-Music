import React from "react"
import "./App.css"
import spotify_api from "./helpers/spotify_api"

function App() {
	// spotify_api.get("/playlists/308eHf9B38Tz63gBViRal8").then((res) => {
	// 	console.log(res)
	// })

	return (
		<div className="App">
			<header className="App-header">
				<a href={spotify_api.authorize}>
					<button>Authorize</button>
				</a>
			</header>
		</div>
	)
}

export default App
