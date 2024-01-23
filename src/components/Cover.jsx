import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useStates, useStatesDispatch } from '../lib/statesProvider';
import styles from "../style/app.module.css";
import cover from "../style/cover.module.css";
import Calendar from './Calendar';

import scrollCalendarToToday from '../helpers/scrollCalendarToToday';

function Cover(){

	const variants = {
		hidden: { y: "-85%" },
		visible: { y: 0 },
	};

	const { isBowing } = useStates();
	const [ tab, setTab ] = useState(0);
	const animate = isBowing ? "hidden" : "visible";

	function setActiveTab(e){
		const target = e.target;
		const container = e.target.closest(`.${cover.pages}`);
		const scrollLeft = target.scrollLeft;
		const containerWidth = container.offsetWidth;
		const activeTab = Math.round(scrollLeft / containerWidth);
		setTab(activeTab);
	}

	return (
		<motion.div
			className={cover.cover}
			variants={variants}
			initial="visible"
			transition={{ duration: 0.25 }}
			animate={animate}>
				<TabBar active={tab} />
				<div
					id="cover-pages"
					className={cover.pages}
					onScroll={setActiveTab}>
						<FirstTab />
						<SecondTab />
				</div>
		</motion.div>
	)
}
function TabBar({ active }){

	const bar = useRef();

	function setTab(index){
		const container = document.getElementById("cover-pages");
		const width = container.offsetWidth;
		container.scrollTo({
			left: index * width,
			behavior: "smooth",
		});
	}

	return (
		<div ref={bar} className={cover.tabBar}>
			<div data-active={active === 0} onPointerDown={() => setTab(0)}>Counter</div>
			<div
				data-active={active === 1}
				onPointerDown={() => {
					setTab(1);
					scrollCalendarToToday();
				}}>
					History
			</div>
		</div>
	)
}
function FirstTab(){

	const { isBowing } = useStates();
	const dispatch = useStatesDispatch();
	const btnLabel = isBowing ? 'Stop' : 'Start';
	
	return (
		<div className={cover.page}>
			<div className={cover.title}><h1>Bow Counter</h1></div>
			<div className={styles.buttons}>
				{isBowing && <button onPointerDown={() => dispatch("reset")}>Reset</button>}
				<button onClick={() => dispatch("toggle")}>{btnLabel}</button>
			</div>
		</div>
	)
}
function SecondTab(){

	useEffect(scrollCalendarToToday, []);

	return (
		<div id="page-calendar" className={cover.page}>
			<Calendar />
		</div>
	)
}

export default Cover;