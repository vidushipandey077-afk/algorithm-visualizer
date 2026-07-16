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

updateArrayLimit();
generateArray();

newArray.addEventListener('click',generateArray)
arraySize.addEventListener('input',changeArraySize)
speed.addEventListener('input',changeSpeed)
bubbleSort.addEventListener('click',bubbleSortAlgo)
selectionSort.addEventListener('click',selectionSortAlgo)
insertionSort.addEventListener('click',insertionSortAlgo)
mergeSort.addEventListener('click',mergeSortAlgoCall)
quickSort.addEventListener('click',quickSortAlgoCall)
window.addEventListener("resize", updateArrayLimit);

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


async function selectionSortAlgo(){
    status.textContent="Sorting..."
    status.style.color="orange"
    algo.textContent="Selection Sort"
    time.innerHTML="O(n<sup>2</sup>)"
    space.textContent="O(1)"
    disableBtns()
    const bars=document.querySelectorAll('.bar')
    let curr=0;
    while(curr<arr.length-1){
        bars[curr].classList.add("comparing")

        await sleep(getDelay())

        let min=curr
        bars[min].classList.add("minimum")
        for(let i=curr+1;i<arr.length;i++){
            bars[i].classList.add("comparing")
            await sleep(getDelay())

            if(arr[min]>arr[i]){
                bars[min].classList.remove("minimum")
                min=i;
                bars[min].classList.add("minimum")
            }
            bars[i].classList.remove("comparing")
        }

        bars[min].classList.remove("minimum")

        if(curr!=min){
            bars[curr].classList.add("swapping")
            bars[min].classList.add("swapping")

            await sleep(getDelay())

            let temp=arr[min];
            arr[min]=arr[curr];
            arr[curr]=temp;

            let tempHeight=bars[curr].style.height
            bars[curr].style.height=bars[min].style.height
            bars[min].style.height=tempHeight

            let tempText=bars[curr].textContent
            bars[curr].textContent=bars[min].textContent
            bars[min].textContent=tempText

            bars[curr].classList.remove("swapping")
            bars[min].classList.remove("swapping")

        }
        bars[curr].classList.remove("comparing")
        bars[curr].classList.add("sorted")

        await sleep(getDelay())

        curr++;
    }
    bars[bars.length-1].classList.add("sorted")
    
    await sleep(getDelay())
    enableBtns()
    status.textContent="Sorted"
    status.style.color="green"
}


async function insertionSortAlgo(){
    status.textContent="Sorting..."
    status.style.color="orange"
    algo.textContent="Insertion Sort"
    time.innerHTML="O(n<sup>2</sup>)"
    space.textContent="O(1)"
    disableBtns()
    const bars=document.querySelectorAll(".bar");
    bars[0].classList.add("sorted")
    await sleep(getDelay())
    for(let i=1;i<arr.length;i++){
        bars[i].classList.add('current')

        await sleep(getDelay())

        let curr=arr[i];

        let currHeight = bars[i].style.height;
        let currText = bars[i].textContent;

        let j=i-1;
        while(j>=0 && arr[j]>curr){

            bars[j].classList.add("comparing")
            bars[j+1].classList.add("shifted")

            await sleep(getDelay())

            arr[j+1]=arr[j];

            bars[j+1].style.height=bars[j].style.height
            bars[j+1].textContent=bars[j].textContent

            await sleep(getDelay())

            bars[j].classList.remove("comparing")
            bars[j+1].classList.remove("shifted")

            j--;
        }
        arr[j+1]=curr

        bars[j+1].classList.remove("current");

        bars[j+1].classList.add("swapping");

        await sleep(getDelay())

        bars[j+1].style.height=currHeight
        bars[j+1].textContent=currText

        bars[j+1].classList.remove("swapping")

        await sleep(getDelay());

        for (let k = 0; k <= i; k++) {
            bars[k].classList.add("sorted");
        }
        await sleep(getDelay())
        
    }
    enableBtns();
    status.textContent="Sorted"
    status.style.color="green"
    
}

async function quickSortAlgoCall(){
    status.textContent="Sorting..."
    status.style.color="orange"
    algo.textContent="Quick Sort"
    time.textContent="O(nlogn)"
    space.textContent="O(logn)"
    disableBtns()

    const bars=document.querySelectorAll(".bar")

    await quickSortAlgo(arr,0,arr.length-1,bars)

    for(let i=0;i<bars.length;i++){
        bars[i].classList.add("sorted")
    }

    await sleep(getDelay())
    enableBtns()
    status.textContent="Sorted"
    status.style.color="green"
}

async function quickSortAlgo(num,start,end,bars){
    if(start>=end){
        return;
    }
    let positionIndex=await partition(num,start,end,bars)
    await quickSortAlgo(num,start,positionIndex-1,bars)
    await quickSortAlgo(num,positionIndex+1,end,bars)
}


async function partition(num,start,end,bars){
    let pivot=num[start];
    bars[start].classList.add("current")
    let count=0;
    for(let i=start+1;i<=end;i++){
        if(num[i]<pivot){
            count++;
        }
    }
    let pivotIndex=start+count;

    bars[start].classList.remove("current")
    let ch=bars[start].style.height
    let chs=bars[start].textContent
    bars[start].style.height=bars[pivotIndex].style.height;
    bars[start].textContent=bars[pivotIndex].textContent
    bars[pivotIndex].style.height=ch;
    bars[pivotIndex].textContent=chs;
    bars[pivotIndex].classList.add("current")

    num[start]=num[pivotIndex]
    num[pivotIndex]=pivot;

    let i=start;
    let j=end;

    while(i<pivotIndex && j>pivotIndex){
        bars[i].classList.add("comparing")
        bars[j].classList.add("comparing")
        await sleep(getDelay())
        if(num[i]<pivot){
            await sleep(getDelay())
            bars[j].classList.remove("comparing")
            bars[i].classList.remove("comparing")

            i++;
        }
        else if(num[j]>pivot){
            await sleep(getDelay())
            bars[j].classList.remove("comparing")
            bars[i].classList.remove("comparing")

            j--;
        }
        else if(num[i]>pivot && num[j]<pivot){
            bars[i].classList.add("swapping")
            bars[j].classList.add("swapping")
            await sleep(getDelay())

            let tempHeight=bars[i].textContent;
            bars[i].textContent=bars[j].textContent;
            bars[j].textContent=tempHeight;

            let tempH=bars[i].style.height;
            bars[i].style.height=bars[j].style.height;
            bars[j].style.height=tempH;

            let temp=num[i];
            num[i]=num[j];
            num[j]=temp;
            
            await sleep(getDelay())
            bars[i].classList.remove("swapping")
            bars[j].classList.remove("swapping")

            await sleep(getDelay())
            bars[j].classList.remove("comparing")
            bars[i].classList.remove("comparing")


            j--;
            i++;
        }
        
    }
    bars[pivotIndex].classList.remove("current")
    bars[pivotIndex].classList.add("sorted")
    return pivotIndex
}

async function mergeSortAlgoCall(){
    status.textContent="Sorting..."
    status.style.color="orange"
    algo.textContent="Merge Sort"
    time.textContent="O(nlogn)"
    space.textContent="O(n)"
    disableBtns()
    const bars=document.querySelectorAll(".bar")
    await mergeSortAlgo(0,arr.length-1,arr,bars)
    
    for(let i=0;i<bars.length;i++){
        bars[i].classList.add("sorted")
    }
    
    await sleep(getDelay())
    enableBtns()
    status.textContent="Sorted"
    status.style.color="green"
}

async function mergeSortAlgo(start,end, nums, bars){
    if(start>=end){
        return;
    }
    let mid=Math.floor((start+end)/2);
    await mergeSortAlgo(start,mid,nums,bars)
    await mergeSortAlgo(mid+1,end,nums,bars)
    await merge(nums,start,end,mid, bars)
}

async function merge(nums,start,end,mid, bars){
    let n1=mid-start+1;
    let n2=end-mid;
    let left=new Array(n1);
    let right=new Array(n2);
    for(let i=0;i<n1;i++){
        left[i]=nums[start+i];
    }
    for(let i=0;i<n2;i++){
        right[i]=nums[mid+i+1]
    }
    let j=0;
    let k=0;
    let m=start;
    while(j<n1 && k<n2){
        bars[m].classList.add("comparing")
        await sleep(getDelay())

        if(left[j]>right[k]){
            nums[m]=right[k];
            k++;
        }
        else{
            nums[m]=left[j];
            j++;
        }

        bars[m].classList.add("swapping")
        bars[m].style.height=nums[m]+"px";
        bars[m].textContent=nums[m]
        await sleep(getDelay())

        bars[m].classList.remove("comparing")
        bars[m].classList.remove("swapping")

        m++;

    }
    while(j<n1){
        nums[m]=left[j]
        bars[m].classList.add("swapping")
        bars[m].style.height=nums[m]+"px"
        bars[m].textContent=nums[m]
        await sleep(getDelay())
        bars[m].classList.remove("swapping")
        j++;
        m++;
    }
    while(k<n2){
        nums[m]=right[k]
        bars[m].classList.add("swapping")
        bars[m].style.height=nums[m]+"px"
        bars[m].textContent=nums[m]
        await sleep(getDelay())
        bars[m].classList.remove("swapping")
        k++;
        m++;
    }
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

function updateArrayLimit() {
    if (window.innerWidth <= 768) {
        arraySize.max = 30;
        if (Number(arraySize.value) > 30) {
            arraySize.value = 30;
            arraySizeValue.textContent = 30;
            generateArray();
        }
    } else {
        arraySize.max = 50;
    }
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