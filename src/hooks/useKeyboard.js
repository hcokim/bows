import { useEffect } from "react";
import { useStates, useStatesDispatch } from "../lib/statesProvider";
import resetCover from "../helpers/resetCover";

function useKeyboard(){

	const dispatch = useStatesDispatch();
	const { isBowing } = useStates();

	useEffect(() => {
		document.addEventListener('keydown', keydown);
		return () => document.removeEventListener('keydown', keydown);
	}, [isBowing]);

	function keydown(event){
		if (event.key === " "){
			if (isBowing){
				dispatch("increase");
			} else {
				dispatch("enable");
				resetCover();
			}
		} else if (event.key === "Escape"){
			dispatch("disable");
		}
	}

	return { keydown }
}

export default useKeyboard;