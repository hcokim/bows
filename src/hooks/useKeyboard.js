import { useEffect } from "react";
import { useStates, useStatesDispatch } from "../lib/statesProvider";

function useKeyboard(){

	const dispatch = useStatesDispatch();
	const { isBowing } = useStates();

	useEffect(() => {
		window.addEventListener('keydown', keydown);
		return () => window.removeEventListener('keydown', keydown);
	}, [isBowing]);

	function keydown(event){
		if (event.key === " "){
			isBowing ?
				dispatch("increase") :
				dispatch("enable");
		}
	}

	return { keydown }
}

export default useKeyboard;