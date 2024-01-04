const userNameText = document.querySelector('#username');
const addUser = document.querySelector('#add-user');
const btnText = addUser.innerText;
const DisplayRecords = document.querySelector('#records');
let edit_id = null;

let userArray = [];
// get data form local storage because how many times we are refresh the data is change
let objstr = localStorage.getItem('users');
if (objstr != null) {
    userArray = JSON.parse(objstr);
}

DisplayInfo();
addUser.addEventListener('click', () => {
    const name = userNameText.value;
    if (edit_id != null) {
        // edit 
        userArray.splice(edit_id, 1, { 'name': name });
        edit_id = null;



    } else {

    }

    userArray.push({ 'name': name });
    SaveInfo(userArray);
    userNameText.value = '';

});


function SaveInfo(userArray) {
    if (!userArray) {
        let nameStr = JSON.stringify(userArray);
        localStorage.setItem('users', nameStr);
        DisplayInfo();
    }

    addUser.innerText = btnText;


}

function DisplayInfo() {
    let statement = '';
    userArray.forEach((users, i) => {
        statement += `<tr>
            <th scope="row">${i+1}</th>
            <td>${users.name}</td>
            <td>
                <i class="btn-info text-white fa-solid fa-pen-to-square green " onclick='EditInfo(${i})'></i><i class="btn-danger fa-solid fa-trash red" onclick='DeleteInfo(${i})'></i></td>

        </tr>`
    });
    DisplayRecords.innerHTML = statement;


}


// here id get the same id pass on click
function EditInfo(id) {
    edit_id = id;
    userNameText.value = userArray[id].name;
    addUser.innerText = 'Update';


}


function DeleteInfo(id) {
    userArray.splice(id, 1); //if we give 0 in this context its add the another value and if we give third parameter its add one another value
    SaveInfo(userArray);
    DisplayInfo();
}