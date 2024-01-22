import { motion } from 'framer-motion'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./style/app.css";
import styles from "./style/app.module.css";

import { useStates, useStatesDispatch } from './lib/statesProvider.jsx'
import useKeyboard from './hooks/useKeyboard.js';

function App() {

	useKeyboard();

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
					{isBowing && <button onPointerDown={() => dispatch("reset")}>Reset</button>}
					<button onClick={() => dispatch("toggle")}>{btnLabel}</button>
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
			onPointerDown={() => dispatch("increase")}>
				<div><p>{count}</p></div>
				<motion.div whileTap={{ scale: 0.95 }}>
					<p>+</p>
				</motion.div>
		</div>
	)
}

export default App
