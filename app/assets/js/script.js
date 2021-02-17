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
	addMessage();
	
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

function addMessage(){
	const sendMsgBtn = document.getElementById("send-message-btn");
	
	sendMsgBtn.addEventListener('click',()=>{
		const mS = ['Jan', 'Feb', 'Mar', 'Apr', 'May',
	 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

		const messageContainer = document.querySelector(".chat-message-container");
		const msgDataMessage = document.getElementById("message-data");
		const inputMessage = msgDataMessage.innerText;
		msgDataMessage.innerText ="";

		let messageWrapper = createElement({tagName:"div",className:"my-2 me-3 align-self-end"});
		let messageRound = createElement({tagName:"div",className:"rounded d-flex mb-1"});
		let bglight = createElement({tagName:"div",className:"bg-light"});
		let msgControls = createElement({tagName:"div",className:"d-flex justify-content-end"});
		let edit = createElement({tagName:"small",className:"text-muted me-2 edit-msg"});
		edit.innerText = "Edit"
		let deleteBtn = createElement({
			tagName:"button",
			className:"btn-close",
			attributes:{
				"data-bs-dismiss":"toast",
				"aria-label":"Close"
			}
		});
		let pdiv = createElement({tagName:"div",className:"p-2"});
		let txtData = createElement({
			tagName:"p",
			className:"text-small mb-0 text-white bg-primary p-2 rounded"});
		txtData.innerText = inputMessage;

		let pDate = createElement({tagName:"p",className:"small text-muted"});
		let time = new Date();
		let hoursAndMinutes = time.toLocaleString('en-US', { 
			hour: 'numeric', minute: 'numeric', hour12: true });
		let monthNum = time.getMonth();
		pDate.innerText = `${hoursAndMinutes} | ${mS[monthNum-1]}. ${monthNum}`;

		pdiv.appendChild(txtData);
		msgControls.appendChild(edit);
		msgControls.appendChild(deleteBtn);

		bglight.appendChild(msgControls);
		bglight.appendChild(pdiv);
		
		
		
		messageRound.appendChild(bglight);
		messageWrapper.appendChild(messageRound);
		messageWrapper.appendChild(pDate);
		//messageContainer.insertBefore(messageWrapper,messageContainer.lastChild);
		messageContainer.appendChild(messageWrapper);


	},false)

}

function createElement({ tagName, className, attributes = {} }) {
	const element = document.createElement(tagName);

	if (className) {
			const classNames = className.split(' ').filter(Boolean);
			element.classList.add(...classNames);
	}

	Object.keys(attributes).forEach((key) => 
			element.setAttribute(key, attributes[key]));

	return element;
}