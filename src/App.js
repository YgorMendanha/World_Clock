import moment from 'moment'
import { useState } from 'react'
import 'moment-timezone'
import Clock from 'react-live-clock'
import './App.css'

function App() {
	const [thevalue, setThevalues] = useState({
		place: '',
	})
	const [thevalueclock, setThevaluesclock] = useState([])

	const handleInputChange = e => {
		const { name, value } = e.target
		setThevalues({ ...thevalue, [name]: value })
	}

	function filterItems(porps) {
		return moment.tz.names().filter(el => {
			return el.toLowerCase().indexOf(porps.toLowerCase()) > -1
		})
	}

	function onDelete(idx) {
		const temp = [...thevalueclock]
		temp.splice(idx, 1)
		setThevaluesclock(temp)
		console.log(idx)
	}
	function ToCheck() {
		let place = thevalue.place.replace(' ', '_')
		let filter = filterItems(place)
		if (filter.length <= 0 || filter.length >= 2) {
			alert('Localizaçao indisponivel')
		} else {
			setThevaluesclock([...thevalueclock, filter])
		}
	}
	return (
		<div className="app">
			<div className="main">
				<form className="input" onChange={handleInputChange}>
					<input
						type="text"
						name="place"
						placeholder="Digite um Local..."></input>
					<button className="btn" type="button" onClick={ToCheck}>
						Verificar
					</button>
				</form>
				<div className="clock">
					{thevalueclock.map((value, idx) => {
						return (
							<div key={idx} className="place">
								<div className="header">
									<p>{value}</p>
									<button type="button" onClick={() => onDelete(idx)}>
										X
									</button>
								</div>
								<Clock format={'HH:mm'} ticking={true} timezone={`${value}`} />
							</div>
						)
					})}
				</div>
			</div>
		</div>
	)
}

export default App
