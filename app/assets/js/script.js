const homePageLink =  document.getElementById("loadHomePage");
const profilePageLink =  document.getElementById("loadProfile");
const userMessagesLink =  document.getElementById("loadUserMessages");

document.addEventListener('DOMContentLoaded', ()=>{
	console.log("content loaded");
});

(async function loadContent(){
	await processHomeContent();
})();

homePageLink.addEventListener('click',async (event)=>{	
	await processHomeContent();
});

async function processHomeContent(){
	let elFileName = getFileNameAttributeValue(homePageLink.attributes);
	await loadHome(elFileName);
	//add listeners after content is loaded
	commentReadMore("readmore-1","dots-1","more-1");
	commentReadMore("readmore-2","dots-2","more-2");
}


profilePageLink.addEventListener('click',async (event)=>{	
	let elFileName = getFileNameAttributeValue(profilePageLink.attributes);
	await loadHome(elFileName);
});

userMessagesLink.addEventListener('click',async (event)=>{	
	let elFileName = getFileNameAttributeValue(userMessagesLink.attributes);
	await loadHome(elFileName);
	const sidebar = document.querySelector(".sidebar");
	document.getElementById("sidebarCollapse").addEventListener('click',()=>{
		sidebar.classList.toggle("active")
	});
	
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
function commentReadMore(readmoreId,dotsId,moreId){
	const readMoreSpanPromise =  new Promise((resolve,reject)=>{
		resolve(document.getElementById(readmoreId));	
	});
	readMoreSpanPromise.then((readMoreSpan)=>{
		readMoreSpan.addEventListener('click',(event)=>{
			let dots = document.getElementById(dotsId);
			let moreText = document.getElementById(moreId);
		
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

