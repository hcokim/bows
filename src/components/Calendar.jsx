import React from "react";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import styles from "../style/calendar.module.css";
import getMonthProperties from "../helpers/getMonthProperties";
import { useStates, useStatesDispatch } from "../lib/statesProvider";

function Calendar(){

	const { data } = useStates();

	const months = [];
	const monthsToShow = 25;
	const firstDate = dayjs().subtract(13, "month").startOf("month");
	for (let i = 0; i < monthsToShow; i++){
		const date = firstDate.add(i, "month");
		const key = date.format("YYYYMM");
		const month = <Month key={key} date={date} data={data} />;
		months.push(month);
	}

	return (
		<motion.div
			className={styles.calendar}>
				{/* <Heading /> */}
				<DayHeaders />
				{months}
		</motion.div>
	)
};

function Month({ date, data }){

	const days = [];
	const startOfWeek = "sunday";
	const title = date.format('MMMM YYYY');

	const { firstDay, fillerDays, daysInMonth } = getMonthProperties({ date, startOfWeek });

	// PREVIOUS MONTH
	for ( let i = fillerDays; i > 0; i-- ){
		const date = firstDay.subtract(i, 'day');
		const key = date.format('YYYYMMDD');
		const props = { isFiller: true, data };
		const filler = <Day key={key} date={date} props={props} />;
		days.push(filler);
	}

	// CURRENT MONTH
	for ( let i = 0; i < daysInMonth; i++ ){
		const date = firstDay.add(i, "day");
		const key = date.format("YYYYMMDD");
		days.push(<Day key={key} date={date} props={{ data }} />);
	}

	// NEXT MONTH
	// const totalDays = fillerDays + daysInMonth;
	// let daysToFill = 7 - totalDays % 7;
	// const firstDayOfNextMonth = firstDay.add(1, "month").startOf('month');

	// for ( let i = 0; i < daysToFill; i++ ){
	// 	const day = firstDayOfNextMonth.add(i, "day");
	// 	const thisDate = day.toDate();
	// 	const key = day.format("YYYYMMDD");
	// 	const props = { date: thisDate, isFiller: true }
	// 	days.push(<Day key={key} props={props} />);
	// }

	return (
		<div
			id={`calendar-${date.format("YYYYMM")}`}
			className={styles.month}>
				<div className={styles.monthTitle}>{title}</div>
				{days}
		</div>
	)
}

const Day = ({ date, props }) => {

	const key = date.format('YYYYMMDD');
	const dayData = props.data[key] || {};
	const today = dayjs();
	const isToday = date.isSame(today, "day");
	const isFiller = props.isFiller;

	const classList = [styles.day];

	if ( isToday ) classList.push(styles.today);
	if ( isFiller ) classList.push(styles.filler);

	const classNames = classList.join(' ');

	return (
		<motion.div
			className={classNames}
			data-date={key}>
				<div className="label">{date.format('D')}</div>
				<div className="record">{dayData.count}</div>
		</motion.div>
	)
}

const Heading = () => {

	const { calendarDate: date } = useStates();
	const dispatch = useStatesDispatch();

	function changeMonth(direction){
		const jsdate = dayjs(date);
		const newDate = direction === 'back' ?
			jsdate.subtract(1, 'month').startOf('month') :
			jsdate.add(1, 'month').startOf('month');
		dispatch("setCalendarDate", { date: newDate });
	}
	
	return (
		<div
			className={styles.header}>
				<Icon icon="caretBack" size={16} onMouseDown={() => changeMonth("back")} />
				<span>{dayjs(date).format('MMMM YYYY')}</span>
				<Icon icon="caretNext" size={16} onMouseDown={() => changeMonth("next")} />
		</div>
	)
}

const DayHeaders = () => {

	const { startOfWeek } = useStates();

	const startMon = startOfWeek === "monday";
	const headers = startMon ?
		['M', 'T', 'W', 'T', 'F', 'S', 'S'] :
		['S', 'M', 'T', 'W', 'T', 'F', 'S'];

	return (
		<div className={styles.dayHeaders}>
			{headers.map((h, index) =>
				<div key={h + index} className={styles.day}>{h}</div>
			)}
		</div>
	)
};

export default Calendar;