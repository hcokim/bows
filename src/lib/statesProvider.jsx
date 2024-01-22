import { createContext, useContext, useState } from 'react';
import useBowCounter from '../hooks/useBowCounter';

// import * as dexie from './dexie';
// import * as firebase from '@/api/firebase';
// import breakpoints from './breakpoints';

const StatesContext = createContext(null);
const StatesDispatchContext = createContext(null);

export default function StatesProvider({children}){

	const [ count, setCount ] = useState(0);
	const { isBowing, toggle } = useBowCounter();

	const states = { count, isBowing };

	const actions = {
		reset: () => setCount(0),
		increase: () => setCount(prev => prev + 1),
		decrease: () => setCount(prev => prev - 1),
		toggle: () => toggle(),
	};
	
	const dispatch = (action, props) => {
		if (actions[action]){
			actions[action](props);
		}
	};

	return (
		<StatesContext.Provider value={states}>
			<StatesDispatchContext.Provider value={dispatch}>
				{children}
			</StatesDispatchContext.Provider>
		</StatesContext.Provider>
	)
}

export function useStates(){
	return useContext(StatesContext);
}
export function useStatesDispatch(){
	return useContext(StatesDispatchContext);
}