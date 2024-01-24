import { useState, useRef } from 'react';
import nosleep from 'nosleep.js';
import dayjs from 'dayjs';

function useBowCounter(){

	const noSleep = useRef(new nosleep());
	const [isBowing, setIsBowing] = useState(false);
	const dayKey = dayjs().format('YYYYMMDD');

	function enable(){
		setIsBowing(true);
		noSleep.current.enable();
	}
	function disable(){
		setIsBowing(false);
		noSleep.current.disable();
	}
	function toggle(){
		isBowing ?
			noSleep.current.disable() :
			noSleep.current.enable();
		setIsBowing(prev => !prev);
		// toggleFullScreen();
	}
	function increase({ data, setCount, updateData }){
		setCount(prev => prev + 1);
		const count = data[dayKey] ? data[dayKey].count + 1 : 1;
		const newData = {...data, [dayKey]: { count }};
		updateData(newData);
	}
	function resetDate({ date, data, updateData }){
		const updated = {...data};
		delete updated[date];
		updateData(updated);
	}
	function toggleFullScreen() {
		if (!document.fullscreenElement) {
			document.documentElement.requestFullscreen();
		} else if (document.exitFullscreen) {
			document.exitFullscreen();
		}
	}

	return { isBowing, enable, disable, increase, toggle, resetDate }
}

export default useBowCounter;