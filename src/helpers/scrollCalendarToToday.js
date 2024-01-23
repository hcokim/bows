import dayjs from "dayjs";

function scrollCalendarToToday(){
	const calendar = document.getElementById("page-calendar");
	const currMonth = dayjs().format("YYYYMM");
	const currMonthEl = document.getElementById(`calendar-${currMonth}`);
	const scrollTop = currMonthEl.offsetTop;
	calendar.scrollTo({
		top: scrollTop,
		behavior: "smooth"	
	});
}

export default scrollCalendarToToday;