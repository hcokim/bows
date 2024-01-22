import { motion } from 'framer-motion'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./style/app.css";
import styles from "./style/app.module.css";

import { useStates, useStatesDispatch } from './lib/statesProvider.jsx'

function App() {

	return (
		<div id="app">
			<Cover />
			<Counter />
		</div>
	)
}

function Cover(){

	const variants = {
		hidden: { y: "-85%" },
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
			transition={{ duration: 0.25 }}
			animate={animate}>
				<h1>Bow Counter</h1>
				<div className={styles.buttons}>
					<button onMouseDown={() => dispatch("reset")}>Reset</button>
					<button onMouseDown={() => dispatch("toggle")}>{btnLabel}</button>
				</div>
		</motion.div>
	)
}

function Counter(){

	const { count } = useStates();
	const dispatch = useStatesDispatch();

	return (
		<div
			className={styles.button}
			onMouseDown={() => dispatch("increase")}>
				<h1>{count}</h1>
				<div className={styles.increment}>+</div>
		</div>
	)
}

export default App
