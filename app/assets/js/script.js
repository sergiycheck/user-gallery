const homePageLink =  document.getElementById("loadHomePage");

document.addEventListener('DOMContentLoaded', ()=>{
	console.log("content loaded");
});

(async function loadContent(){
	let elFileName = getFileNameAttributeValue(homePageLink.attributes)
	await loadHome(elFileName);
	commentReadMore();
})();

homePageLink.addEventListener('click',(event)=>{	
	console.log("home link clicked");
});

function getFileNameAttributeValue(attributes){
	let elFileName = "";
	let map = new Map(Object.entries(attributes));
	map.forEach((key,value)=>{
		//console.log(key.name,key.value);
		if(key.name==="filename"){
			elFileName = key.value;
		}
	});
	return elFileName;
}

async function loadHome(fileName) {
	const contentDiv = document.getElementById("mainContent");
	contentDiv.innerHTML = await fetchHtmlAsText(fileName);
}
async function fetchHtmlAsText(url) {
	return await (await fetch(url)).text();
}
async function fetchHtmlAsText(url) {
	const response = await fetch(url);
	return await response.text();
}
//todo: add animation to comment read more
function commentReadMore(){
	const readMoreSpanPromise =  new Promise((resolve,reject)=>{
		resolve(document.getElementById("readmore"));	
	});
	readMoreSpanPromise.then((readMoreSpan)=>{
		readMoreSpan.addEventListener('click',()=>{
			let dots = document.getElementById("dots");
			let moreText = document.getElementById("more");
		
			if(dots.style.display=="none"){
				dots.style.display = "inline";
				moreText.style.display = "none";
				readMoreSpan.innerText = "read more"
			}else{
				dots.style.display = "none";
				moreText.style.display = "inline";
				readMoreSpan.innerText = "read less"
			}
		},false);

	});

};
