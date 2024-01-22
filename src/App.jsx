import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import nosleep from 'nosleep.js'

function App() {

	const noSleep = new nosleep();
	const [count, setCount] = useState(0);
	const [wakeLock, setWakeLock] = useState(false);

	const btnLabel = wakeLock ?
		'Stop bowing' : 'Start bowing';

	function toggleWake() {
		setWakeLock(prev => {
			if (prev) {
				noSleep.disable();
			} else {
				noSleep.enable();
			}
			return !prev;
		});
	}

	return (
		<div className="App">
			<h1>Bow Counter</h1>
			<h1>{count}</h1>
			<button onMouseDown={toggleWake}>{btnLabel}</button>
			<button onMouseDown={() => setCount(prev => prev + 1)}>Bow</button>
			{!wakeLock && <button>Reset</button>}
		</div>
	)
}

export default App
