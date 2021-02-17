document.addEventListener("DOMContentLoaded",()=>{
	const searchInput = document.getElementById("search");
	const searchCol = document.querySelector(".seach-col");
	const seachColClassAdd = function addClasses(){
		searchCol.classList.toggle("col-md-auto");
		searchCol.classList.add("col-md-4");
	}
	const seachColClassRemove = function removeClasses(){
		searchCol.classList.toggle("col-md-auto");
		searchCol.classList.remove("col-md-4");
	}
	searchInput.addEventListener('focus',()=>{
		seachColClassAdd();
	},false);
	searchInput.addEventListener('blur',()=>{
		seachColClassRemove();
	},false);
});