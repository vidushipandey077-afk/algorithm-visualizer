function generateArray(){
    const container=document.getElementById("array-container");
    container.innerHTML="";
    for(let i=0;i<30;i++){
        let value=Math.floor(Math.random()*300);
        let bar=document.createElement("div");
        bar.classList.add("bar");
        bar.style.height=value+"px";
        bar.innerText=value;
        container.appendChild(bar);
    }
}