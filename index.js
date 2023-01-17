const apiKey = 'abwh0GWofX092UD1ccJ4mBuHhkf508NMWGwJQ3PY';
const latInput = document.getElementById('latitude');
const longInput = document.getElementById('longitude');
const dateInput = document.getElementById('date');
const submitButton = document.getElementById('submit');
const dimInput = document.getElementById('dim');
const url = 'https://api.nasa.gov/planetary/earth/assets';
const imgDiv = document.getElementById('images');
const numPhotos = document.getElementById('numberOfPhotos');
const loading = document.getElementById('loading')


async function submit() {
    loading.style.display = 'block';
    let long = Number(longInput.value).toFixed(2);
    let lat = Number(latInput.value).toFixed(2);
    let date = dateInput.value;
    let dim =Number(dimInput.value);
    let quant = numPhotos.value;
    let urlArr = [];
    let imgArr = [];
    let count = 0;
    //console.log(`Long: ${long} Lat: ${lat}`)
    // console.log(`returnIncreasedDec(.15, 3): ${returnIncreasedDec(.15, 3)}`)
    for (let i=0; i <= quant - 1; i++){
        console.log(`img: ${i + 1} | long: ${Number(long)} | lat: ${Number(lat) + (i * Number(dim))} | dim: ${dim}`)
        let urlToFetch = `${url}?lon=${Number(Number(long) - (i * Number(dim / 2))).toFixed(2)}&lat=${Number(lat)}&dim=${dim}&date=${date}&api_key=${apiKey}`;
        let response = await fetch(urlToFetch)
        let data = await response.json();
        urlArr.push(data.url);
        imgArr.push(document.createElement('img'))
    }
    
    for (img of imgArr){
        img.onload = function(){imgLoaded(img)};
        img.setAttribute('src', urlArr[count]);
        img.setAttribute('width', `${100/quant}%`);
        img.setAttribute('height', `${100/quant}%`);
        img.setAttribute('class', 'satImage');
        imgDiv.prepend(img)
        count += 1;
    }
    //console.log(urlArr);
    //console.log(imgArr);
    
    
}

function returnIncreasedDec(num, mult){
    num = Number(num);
    mult = Number(mult);
    num = num * 100;
    num = num * mult;
    num = num / 100;
    return num
}
function imgLoaded(img){
    loading.style.display = 'none'
}
submitButton.addEventListener('click', function(){submit()})

