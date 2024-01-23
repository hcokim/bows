function resetCover(){
	const container = document.getElementById("cover-pages");
	container.scrollTo({
		left: 0,
		behavior: "smooth",
	});
}

export default resetCover;