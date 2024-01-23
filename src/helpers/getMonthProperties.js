import dayjs from "dayjs";

function getMonthProperties({ date, startOfWeek }){

	const firstDay = dayjs(date).startOf('month');

	let fillerDays = firstDay.day();
	if (startOfWeek === "monday"){
		fillerDays--;
		if (fillerDays === -1) fillerDays = 6;
	}

	return {
		firstDay,
		fillerDays,
		id: firstDay.format('YYYY-MM'),
		year: firstDay.format("YYYY"),
		monthID: firstDay.format('MM'),
		daysInMonth: firstDay.daysInMonth()
	}
}

export default getMonthProperties;