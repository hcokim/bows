import { useState } from 'react';

function useDataStore(){

	const [ data, setData ] = useState(getStoredData());

	function updateData(newData){
		setData(newData);
		const data = JSON.stringify(newData);
		localStorage.setItem('data', data);
	}

	return [ data, updateData ]
}

function getStoredData(){
	const storedData = localStorage.getItem('data');
	if (!storedData) return {};
	return JSON.parse(storedData);
}

export default useDataStore;