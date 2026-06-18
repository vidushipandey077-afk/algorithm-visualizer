const container=document.getElementById("array-container")
const newArray=document.getElementById("newArray")
const bubbleSort=document.getElementById("bubbleSort")
const selectionSort=document.getElementById("selectionSort")
const insertionSort=document.getElementById("insertionSort")
const mergeSort=document.getElementById("mergeSort")
const quickSort=document.getElementById("quickSort")
const arraySize=document.getElementById("arraySize")
const arraySizeValue=document.getElementById("arraySizeValue")
const speed=document.getElementById("speed")
const speedValue=document.getElementById("speedValue")
const status=document.getElementById("status")
const algo=document.getElementById("algo")
const time=document.getElementById("time")
const space=document.getElementById("space")

let arr=[];

generateArray();

newArray.addEventListener('click',generateArray)
arraySize.addEventListener('input',changeArraySize)
speed.addEventListener('input',changeSpeed)
bubbleSort.addEventListener('click',bubbleSortAlgo)

async function bubbleSortAlgo(){
    status.textContent="Sorting..."
    status.style.color="orange"
    algo.textContent="Bubble Sort"
    time.innerHTML="O(n<sup>2</sup>)"
    space.textContent="O(1)"
    disableBtns()
    const bars=document.querySelectorAll(".bar")
    let arrSize=arr.length
    while(arrSize>1){
        let swapped=false;
        for(let i=0;i<arrSize-1;i++){
            bars[i].classList.add("comparing")
            bars[i+1].classList.add("comparing")
            await sleep(getDelay())

            if(arr[i]>arr[i+1]){
                swapped=true;
                let temp=arr[i];
                arr[i]=arr[i+1];
                arr[i+1]=temp;
                bars[i].classList.add("swapping")
                bars[i+1].classList.add("swapping")
                
                await sleep(getDelay())

                let tempHeight = bars[i].style.height;
                bars[i].style.height = bars[i+1].style.height;
                bars[i+1].style.height = tempHeight;

                let tempText = bars[i].innerText;
                bars[i].innerText = bars[i+1].innerText;
                bars[i+1].innerText = tempText;

                await sleep(getDelay())

                bars[i].classList.remove("swapping")
                bars[i+1].classList.remove("swapping")
            }
            bars[i].classList.remove("comparing")
            bars[i+1].classList.remove("comparing")
        }
        if(!swapped){
            for(let i=0;i<arr.length;i++){
                bars[i].classList.add("sorted");
            }
            break
        }
        bars[arrSize-1].classList.add("sorted")
        await sleep(getDelay())
        arrSize--;
    }
    bars[0].classList.add("sorted")
    await sleep(getDelay())
    enableBtns()
    status.textContent="Sorted"
    status.style.color="green"
}

function sleep(ms){
    return new Promise(resolve=>setTimeout(resolve,ms))
}

function getDelay(){
    return 510-Number(speed.value)
}

function enableBtns(){
    newArray.disabled=false;
    bubbleSort.disabled=false;
    insertionSort.disabled=false;
    selectionSort.disabled=false;
    mergeSort.disabled=false;
    quickSort.disabled=false;
    arraySize.disabled=false;
}

function disableBtns(){
    newArray.disabled=true;
    bubbleSort.disabled=true;
    insertionSort.disabled=true;
    selectionSort.disabled=true;
    mergeSort.disabled=true;
    quickSort.disabled=true;
    arraySize.disabled=true;
}

function changeSpeed(){
    speedValue.textContent=speed.value;
}

function changeArraySize(){
    arraySizeValue.textContent=arraySize.value;
    generateArray();
}


function generateArray(){
    algo.textContent="None";
    time.textContent="-";
    space.textContent="-";
    status.textContent="Ready"
    status.style.color="blue"
    container.innerHTML="";
    arr=[];
    for(let i=0;i<arraySize.value;i++){
        let value=Math.floor(Math.random()*250)+50;
        arr.push(value);
        let bar=document.createElement("div");
        bar.classList.add("bar");
        bar.style.height=value+"px";
        bar.innerText=value;
        container.appendChild(bar);
    }
}