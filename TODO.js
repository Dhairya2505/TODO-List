Add();


function Add() {
    task = document.getElementById('task').value;
    // console.log(task);
    desc = document.getElementById('desc').value;
    // console.log(desc);

    if (localStorage.getItem('itemjson') == null) {
        // console.log("JSON created");
        // console.log("entered if");
        arr = [];
        if (task != "") {
            arr.push([task, desc]);
        }
        localStorage.setItem('itemjson', JSON.stringify(arr));
    }
    else {            // console.log("pushed into created json");
        // console.log("entered else");
        itemarr = localStorage.getItem('itemjson');
        arr = JSON.parse(itemarr);
        if (task != "") {
            arr.push([task, desc]);
        }
        localStorage.setItem('itemjson', JSON.stringify(arr));
    }

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


function deleteTODO(buttonID) {
    alert("are you sure");
    let storedData = localStorage.getItem('itemjson'); // Replace 'yourKey' with the key you used to store the JSON object

    // Check if there is any data stored
    if (storedData) {

        let dataObject = JSON.parse(storedData);

        // delete dataObject.buttonID;
        dataObject.forEach((element,index) =>{
            if(buttonID == element[0]){
                console.log(index);
                dataObject.splice(index,1);
            }
        })
        localStorage.setItem('itemjson', JSON.stringify(dataObject));
        let str='';
        dataObject.forEach((element, index) => {
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

}





