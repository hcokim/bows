import { createContext, useContext, useState } from 'react';
import useBowCounter from '../hooks/useBowCounter';
import useDataStore from '../hooks/useDataStore';

const StatesContext = createContext(null);
const StatesDispatchContext = createContext(null);

export default function StatesProvider({children}){

	const [ count, setCount ] = useState(0);
	const [ data, updateData ] = useDataStore();
	const { isBowing, enable, increase, toggle } = useBowCounter({ data });

	const states = { count, isBowing, data };

	const actions = {
		reset: () => setCount(0),
		increase: () => increase({ data, setCount, updateData }),
		decrease: () => setCount(prev => prev - 1),
		enable: () => enable(),
		toggle: () => toggle(),
		updateData: props => updateData(props),
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