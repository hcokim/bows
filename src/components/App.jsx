import styles from "../style/app.module.css";
import "../style/app.css";

import Cover from './Cover.jsx';

import { useStates, useStatesDispatch } from '../lib/statesProvider.jsx'
import useKeyboard from '../hooks/useKeyboard.js';

function App() {

	useKeyboard();

	return (
		<div id="app">
			<Cover />
			<Counter />
		</div>
	)
}

function Counter(){

	const { count } = useStates();
	const dispatch = useStatesDispatch();

	return (
		<div
			className={styles.button}
			onPointerDown={() => dispatch("increase")}>
				<div><p>{count}</p></div>
				<div><p>+</p></div>
		</div>
	)
}

export default App
