let cafes = [];
let places = [];
let resultArray = [];

const myInput = document.querySelector("input")
const myTableBody = document.querySelector("tbody");

const fetchMyCafes = () => {
    const fetchedData = fetch("https://raw.githubusercontent.com/debojyoti/places-fake-rest-api/master/cafes.json")
        .then( response => response.json())
        .then( myData => {
            cafes = myData.cafes;
            console.log("cafes",cafes);
            fetchMyPlaces();
        })
        .catch(error => console.log(error.toString()));
}

const fetchMyPlaces = () => {
    const fetchedData = fetch("https://raw.githubusercontent.com/debojyoti/places-fake-rest-api/master/places.json")
        .then( response => response.json())
        .then( myData => {
            places = myData.places;
            console.log("places",places);
            mergeData();
            displayData(resultArray);
        })
        .catch(error => console.log(error));
}

const mergeData = () => {
    let mergedArray = [];
    let myCafes = cafes;
    let myPlaces = places;
    for (let elem of myCafes) {
            mergedArray.push(elem);
    }
    //for filling the address details in the cafe object
    for (let elem of myPlaces) {
        let i = 0;
        while (i < mergedArray.length) {
            if ( elem.id === mergedArray[i].location_id){
            mergedArray[i].street_no = elem.street_no;
            mergedArray[i].locality = elem.locality;
            mergedArray[i].postal_code = elem.postal_code;
            mergedArray[i].latitude = elem.lat;
            mergedArray[i].longitude = elem.long;
            delete mergedArray[i].location_id;
            }
            i++;
        }
    }
    resultArray = mergedArray;
}

const displayData = rsultArray => {
    rsultArray.forEach((elem, i) => {
        newElement = document.createElement("tr");
        newElement.innerHTML = `<td class="column1">${i + 1}</td>
            <td class="column2">${elem.name}</td>
            <td class="column3">${elem.street_no} ${elem.locality}</td>
            <td class="column4">${elem.postal_code}</td>
            <td class="column5">${elem.latitude}</td>
            <td class="column6">${elem.longitude}</td>`;
        myTableBody.appendChild(newElement);
        console.log(newElement);
      });
}

const searchWithString = string => {
    let newResult = resultArray.filter(elem =>
        elem.name.includes(string)
      );
      return newResult;
}

const updateResult = event => {
    myTableBody.innerHTML = null;
    const newResult = searchWithString(event.target.value);
    displayData(newResult);
}

fetchMyCafes();
myInput.addEventListener("input", updateResult);
