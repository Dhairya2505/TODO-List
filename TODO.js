Add();
flag = 0;
var alphaorder = false;
var oldorder = true;
var neworder = false;


// function to display the table
function displaytable(arr) {
    let str = '';
    arr.forEach((element, index) => {
        str += `
            <tr>
            <td class="align">${index + 1}</td>
            <td class="align">${element[0]}</td>
            <td class="align">${element[1]}</td>
            <td class="align"><button type="submit" class="btn btn-primary" id="${element[0]}" onclick="deleteTODO(this.id)">Delete</button></td>
        </tr>`;
    });
    document.getElementById('tabledata').innerHTML = str;
}



// function to add a task to the table and making sure there is no repeatition
function Add() {
    task = document.getElementById('task').value;
    // console.log(task);
    desc = document.getElementById('desc').value;
    // console.log(desc);

    if (localStorage.getItem('itemjson') == null) {

        arr = [];
        if (task != "") {
            arr.push([task.toLowerCase(), desc.toLowerCase()]);
        }
        localStorage.setItem('itemjson', JSON.stringify(arr));
    }
    else {
        itemarr = localStorage.getItem('itemjson');
        arr = JSON.parse(itemarr);
        if (task != "") {
            arr.forEach(element => {
                if (task.toLowerCase() == element[0].toLowerCase()) {
                    flag = 1;
                }
            });
            if (flag == 0) {
                arr.push([task.toLowerCase(), desc.toLowerCase()]);
            }
            else {
                alert("Task already exists !");
                flag = 0;
            }
        }
        localStorage.setItem('itemjson', JSON.stringify(arr));
    }
    displaytable(arr);

}



// function to delete any task from the table

function deleteTODO(buttonID) {
    let storedData = localStorage.getItem('itemjson');

    if (storedData) {

        let arr = JSON.parse(storedData);

        arr.forEach((element, index) => {
            if (buttonID == element[0]) {
                console.log(index);
                arr.splice(index, 1);
            }
        })
        localStorage.setItem('itemjson', JSON.stringify(arr));
        displaytable(arr);
    }

}



// function for printing the tasks in alphabetical order

function alphabetical() {
    // console.log("alphabetical order hit");
    if (localStorage.getItem('itemjson') != null && alphaorder == false) {
        str = localStorage.getItem('itemjson');
        arr = JSON.parse(str);
        newarr = arr;
        sortarr = newarr.sort();
        displaytable(sortarr);
        alphaorder = true;
        neworder = false;
        oldorder = false;
    }
}

function newest() {
    if (localStorage.getItem('itemjson') != null && neworder == false) {
        str = localStorage.getItem('itemjson');
        arr = JSON.parse(str);
        s=arr;
        st = s.reverse();
        displaytable(st);
        alphaorder = false;
        neworder = true;
        oldorder = false;

    }
}

function oldest(){
    if(localStorage.getItem('itemjson') !=null && oldorder == false){
        str = localStorage.getItem('itemjson');
        arr = JSON.parse(str);
        displaytable(arr);
        alphaorder = false;
        neworder = false;
        oldorder = true;
    }
}



setInterval(() => {
    if(alphaorder==true){
        document.getElementById('ddbtn').innerHTML = "Alphabetical";
    }
    if(oldorder==true){
        document.getElementById('ddbtn').innerHTML = "Oldest First";
    }
    if(neworder==true){
        document.getElementById('ddbtn').innerHTML = "Newest First";
    }
    
}, 100);
