const baseUrl="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";


const dropdowns=document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

document.addEventListener("load",()=>{
   updateExchagerate();
    
});



for(let select of dropdowns){
    for(currcode in countryList){
       let newOption=document.createElement("option");
       newOption.innerText=currcode;
       newOption.value=currcode;
       select.append(newOption);
       if(select.name==="from" && currcode==="USD"){
        newOption.selected="selected";
       }else if(select.name==="to" && currcode==="INR"){
        newOption.selected="selected";
       }
    }

    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    });
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
  };
 
  
btn.addEventListener("click", (evt)=>{
    evt.preventDefault();
   updateExchagerate();

});


const updateExchagerate=async ()=>{
    let amount=document.querySelector(".amount input");
    let amtVal=amount.value;
    console.log(amtVal);
    if(amtVal==="" || amtVal<1){
        amtVal=1;
        amount.value="1";


    }
    const URL = `${baseUrl}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response=await fetch(URL);
    let data=await response.json();
   
   let rate=data[toCurr.value.toLowerCase];
   let finalamount=amount*rate;
    console.log(finalamount);
   msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
         
}
 
