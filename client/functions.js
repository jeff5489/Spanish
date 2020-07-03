
const api_url = 'http://localhost:1234/spanish/';

document.getElementById("getAll").addEventListener("click", getAllSets);

async function getAllSets(){
    const response = await fetch(api_url);
    const json = await response.json();
    // console.log(json);
    let allSetsDiv
    json.forEach(function(item){
        allSetsDiv +=`
          <ul>
            <li>ID: ${item._id}</li>
            <li>Spanish: ${item.spanish}</li>
            <li>English: ${item.english}</li>
            <li>Group: ${item.group}</li>
            <li>Type: ${item.type}</li>
          </ul>
        `;
      });
    document.querySelector('#allSetsDiv').innerHTML = allSetsDiv;
    
    // return json;
}

document.querySelector('#createSet').addEventListener("click", addSet);
async function addSet(){
    let spanish = document.querySelector('#spanish').value ;
    let english = document.querySelector('#english').value;
    let group = document.querySelector('#group').value;
    // let type = document.querySelector('#type').value;

    let wordType = document.getElementsByName('wordType');
    let wordType_value;
    for(let i = 0; i < wordType.length; i++){
        if(wordType[i].checked){
            wordType_value = wordType[i].value;
            console.log('wordType_value: ' + wordType_value)
        }
    }

    let set = {
        'spanish': spanish,
        'english': english,
        'group': group,
        'type': wordType_value
    }
    const response = await fetch(api_url, {
        method: 'POST',
        body: JSON.stringify(set),
        headers: {
          'content-type': 'application/json'
        },
      });
      return response.json();
}

document.querySelector('#deleteSet').addEventListener("click", deleteSet);
async function deleteSet(){
    let deleteId = document.querySelector('#deleteId').value ;
    console.log(deleteId)
    // let english = document.querySelector('#english').value;
    // let group = document.querySelector('#group').value;
    // let type = document.querySelector('#type').value;
    let set = {
        '_id': deleteId
    }
    const response = await fetch(api_url, {
        method: 'DELETE',
        body: JSON.stringify(set),
        headers: {
          'content-type': 'application/json'
        },
      });
      return response;
}

let globalSets = document.querySelector('#globalSets').innerHTML;
let currentSet;

document.querySelector("#getGroup1").addEventListener("click", getSetsOfGroupNumber1);
async function getSetsOfGroupNumber1(){
    const response = await  fetch('http://localhost:1234/allSetsInGroup/1');
    const sets = await response.json();
    globalSets = await sets;
    currentSet = 0;
    displaySpanish();
}

document.querySelector("#getGroupPlaces").addEventListener("click", getSetsOfGroupPlaces);
async function getSetsOfGroupPlaces(){
    const response = await  fetch('http://localhost:1234/allSetsInGroup/Places');
    const sets = await response.json();
    globalSets = await sets;
    currentSet = 0;
    displaySpanish();
}

document.querySelector('#showEnglish').addEventListener('click', displayEnglish);
function displayEnglish(){
    document.querySelector('#englishHere').textContent = globalSets[currentSet].english;
}

document.querySelector('#next').addEventListener('click', nextSet);
function nextSet(){
    currentSet++;
    displaySpanish();
}

document.querySelector('#previous').addEventListener('click', previousSet);
function previousSet(){
    currentSet--;
    displaySpanish();
}
function displaySpanish(){
    if (globalSets == undefined){
        alert('globalSets is undefined');
    }
    document.querySelector('#spanishHere').textContent = globalSets[currentSet].spanish;
}

// document.querySelector('#testThing').addEventListener('click', testThing);
// async function testThing(){
//     console.log('testThing function reached');
//     console.log(globalsets);
// }

document.querySelector("#getGroup2").addEventListener("click", getSetsOfGroupNumber2);
async function getSetsOfGroupNumber2(){
    // let groupNumber = document.querySelector('#groupNumber').value;
    const response = await  fetch('http://localhost:1234/allSetsInGroup/2')
    const sets = await response.json();
    // return sets;
    // console.log(sets);
    globalsets = sets;
    console.log(globalsets);
}

async function fetchAllIdsInGroup(){
    let groupIds = [];
    let groupNumber = document.querySelector('#groupNumber').value;
    await fetch('http://localhost:1234/allIdsInGroup/' + groupNumber)
    .then(response => response.json())
    .then((data) => {
        data.forEach(element => {
            groupIds.push(element['_id'])
        });
        return groupIds;
    })
    return groupIds;
}

// document.querySelector('#getAllIdsInGroup').addEventListener('click', printAllIdsInGroup);
// async function printAllIdsInGroup(){

//     let groupIds = await fetchAllIdsInGroup();
//     document.querySelector('#currentSetIdValue').textContent = groupIds[0];

//     console.log(groupIds[0]); 
// }