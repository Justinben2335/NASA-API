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
    let long = longInput.value;
    let lat = latInput.value;
    let date = dateInput.value;
    let dim =dimInput.value;
    let quant = numPhotos.value;
    let urlArr = [];
    let imgArr = [];
    let count = 0;
    for (i=0; i <= quant; i++){
        let urlToFetch = `${url}?lon=${long + (i*100)}&lat=${lat + (i*100)}&dim=${dim}&date=${date}&api_key=${apiKey}`;
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
    imgDiv.appendChild(img)
    }
    console.log(urlArr);
    console.log(imgArr);
}

submitButton.addEventListener('click', function(){submit()})

