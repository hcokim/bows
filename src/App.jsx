import { motion } from 'framer-motion'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import styles from "./style/app.module.css";

import { useStates, useStatesDispatch } from './lib/statesProvider.jsx'

function App() {

	const { count } = useStates();
	const dispatch = useStatesDispatch();

	return (
		<div className="App">
			<Cover />
			<h1>{count}</h1>
			<button onMouseDown={() => dispatch("increase")}>Bow</button>
		</div>
	)
}

function Cover(){

	const variants = {
		hidden: { y: -240 },
		visible: { y: 0 },
	};

	const { isBowing } = useStates();
	const dispatch = useStatesDispatch();

	const btnLabel = isBowing ? 'Stop' : 'Start';
	const animate = isBowing ? "hidden" : "visible";

	return (
		<motion.div
			className={styles.cover}
			variants={variants}
			initial="visible"
			animate={animate}>
				<h1>Bow Counter</h1>
				<button onMouseDown={() => dispatch("toggle")}>{btnLabel}</button>
				<button onMouseDown={() => dispatch("reset")}>Reset</button>
		</motion.div>
	)
}

export default App
