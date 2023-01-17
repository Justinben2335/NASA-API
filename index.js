const apiKey = 'abwh0GWofX092UD1ccJ4mBuHhkf508NMWGwJQ3PY';
const latInput = document.getElementById('latitude');
const longInput = document.getElementById('longitude');
const dateInput = document.getElementById('date');
const submitButton = document.getElementById('submit');
const dimInput = document.getElementById('dim');
const url = 'https://api.nasa.gov/planetary/earth/assets';
const imgDiv = document.getElementById('images');
const numPhotos = document.getElementById('numberOfPhotos');



async function submit() {
    let long = Number(longInput.value).toFixed(2);
    let lat = Number(latInput.value).toFixed(2);
    let date = dateInput.value;
    let dim =Number(dimInput.value);
    let quant = numPhotos.value;
    let urlArr = [];
    let imgArr = [];
    let count = 0;
    console.log(`Long: ${long} Lat: ${lat}`)
    // console.log(`returnIncreasedDec(.15, 3): ${returnIncreasedDec(.15, 3)}`)
    for (let i=0; i <= quant - 1; i++){
        let urlToFetch = `${url}?lon=${Number(long) + (i * returnIncreasedDec(dim, 100))}&lat=${Number(lat) + (i * returnIncreasedDec(dim, 100))}&dim=${dim}&date=${date}&api_key=${apiKey}`;
        let response = await fetch(urlToFetch)
        let data = await response.json();
        urlArr.push(data.url);
        imgArr.push(document.createElement('img'))
    }
    for (img of imgArr){
    img.setAttribute('src', urlArr[count]);
    img.setAttribute('width', `${100/quant}%`);
    img.setAttribute('height', `${100/quant}%`);
    img.setAttribute('class', 'satImage');
    imgDiv.prepend(img)
    }
    console.log(urlArr);
    console.log(imgArr);
}

function returnIncreasedDec(num, mult){
    num = Number(num);
    mult = Number(mult);
    num = num * 100;
    num = num * mult;
    num = num / 100;
    return num
}
submitButton.addEventListener('click', function(){submit()})

