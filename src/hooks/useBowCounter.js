import { useState, useRef } from 'react';
import nosleep from 'nosleep.js';

function useBowCounter(){

	const noSleep = useRef(new nosleep());
	const [isBowing, setIsBowing] = useState(false);

	function enable(){
		noSleep.current.enable();
		setIsBowing(true);
	}
	function disable(){
		noSleep.current.disable();
		setIsBowing(false);
	}
	function toggle(){
		isBowing ?
			noSleep.current.disable() :
			noSleep.current.enable();
		setIsBowing(!isBowing);
	}

	return { isBowing, enable, disable, toggle }
}

export default useBowCounter;