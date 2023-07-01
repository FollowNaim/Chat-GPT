// Declaring Variable

const sendBtn = document.querySelector(".chat-input span");
const chatInput = document.querySelector(".chat-input textarea");
const chatbox = document.querySelector(".chatbox");
const showchatbot = document.querySelector(".show-chatbot");
const toggler = document.querySelector(".chatbot-toggler");
const body = document.querySelector("body");
const sendtxt = document.querySelector("#sendtxt");
const chatInputHeight = chatInput.scrollHeight;
const showInfo = document.querySelector(".showInfo")
const API_KEY = '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';
const API_URL = 'https://api.openai.com/v1/chat/completions';


let userMassage;

// Making Li Dynamatically And adding it into incoming or outgoing based on activity

const createChatLi = (massage,className)=>{
const  chatLi = document.createElement("li");
 chatLi.classList.add("chat", className);
 let chatContent = className === 'outgoing'? `<p>${massage}</p>`: `<span class="material-symbols-outlined">smart_toy</span><p>${massage}</p>`;
 chatLi.innerHTML = chatContent;
 chatLi.querySelector("p").textContent = massage;
 return chatLi;
}

// Generating Response From the server

const generateResponse = (incomingChatLi)=>{
 const incomingMassageElement = incomingChatLi.querySelector("p");
 const requestOptions = {
  method: 'POST',
  headers: {
   "Content-Type": "application/json",
   Authorization: `Bearer ${API_KEY}`
  },
  body: JSON.stringify({
         model: "gpt-3.5-turbo",
         messages: [{ role: "user", content: userMassage }],
  }),
 };
 
// Fetching API 
 
fetch(API_URL,requestOptions).then(resp=>resp.json()).then(data=>{
 incomingMassageElement.textContent = data.choices[0].message.content;
}).catch((error)=>{
 incomingMassageElement.textContent = "Opps! Something Went Wrong";
 incomingMassageElement.classList.add("error")
}).finally(()=>{
 chatbox.scrollTo(0,chatbox.scrollHeight);
})
}

// Handaling Chat

const handleChat = ()=>{
 userMassage = chatInput.value.trim();
 if(!userMassage) return;
 chatbox.appendChild(createChatLi(userMassage,"outgoing"));
 chatInput.value = '';
 chatbox.scrollTo(0,chatbox.scrollHeight);
 
 setTimeout(()=>{
  const incomingChatLi = createChatLi('Typing...',"incoming");
  chatbox.appendChild(incomingChatLi);
  generateResponse(incomingChatLi);
  chatbox.scrollTo(0,chatbox.scrollHeight);
 },300)
}




toggler.addEventListener("click",()=>{
 if(body.classList.contains("show-chatbot")){
  body.classList.remove("show-chatbot");
  //showInfo.classList.add("active")
 }else{
  body.classList.add("show-chatbot")
 }
})


chatInput.addEventListener("input",()=>{
 chatInput.style.height = `${chatInputHeight}px`;
 chatInput.style.height = `${chatInput.scrollHeight}px`;
})



sendBtn.addEventListener("click",handleChat)