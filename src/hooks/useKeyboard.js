import { useEffect } from "react";
import { useStates, useStatesDispatch } from "../lib/statesProvider";
import resetCover from "../helpers/resetCover";

function useKeyboard(){

	const dispatch = useStatesDispatch();
	const { isBowing } = useStates();

	useEffect(() => {
		window.addEventListener('keydown', keydown);
		return () => window.removeEventListener('keydown', keydown);
	}, [isBowing]);

	function keydown(event){
		if (event.key === " "){
			if (isBowing){
				dispatch("increase");
			} else {
				dispatch("enable");
				resetCover();
			}
		}
	}

	return { keydown }
}

export default useKeyboard;