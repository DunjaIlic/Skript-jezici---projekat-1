function init() {


    const cookies = document.cookie.split('=');
    const token = localStorage.getItem('token');

    const schema = {
        api_url: "http://localhost:8000/admin/products",
        properties: ['id', 'name', 'type'],


    }

    createTableHeadings(schema)
    createFrom(schema)
    getAllUsers(token, schema)


    document.getElementById('usrBtnAdd').addEventListener('click', e => {
        e.preventDefault();

        const data = prepareDataForHttp(schema)
        console.log("DATA" , data);
        clearInputs(schema)

        fetch(schema.api_url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(el => {
                if (el.msg) {
                    alert(el.msg);
                } else {
                    getAllUsers(token, schema)
                }
            });
    });


    document.getElementById('usrBtnUpdate').addEventListener('click', e => {
        e.preventDefault();

        const data = prepareDataForHttp(schema)
        clearInputs(schema);

        fetch(schema.api_url + "/" + data.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        }).then(res => {
            res.json()
            getAllUsers(token, schema)
        })
    });

    document.getElementById('usrBtnDelete').addEventListener('click', e => {
        e.preventDefault();

        const id = document.getElementById("id").value;

        fetch(schema.api_url + "/" + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
            .then(res => res.json())
            .then(el => {
                if (el.msg) {
                    alert(el.msg);
                } else {
                    getAllUsers(token,schema)
                }
            });
    });

    document.getElementById('usrBtnLogOut').addEventListener('click', e => {
        document.cookie = `token=;SameSite=Lax`;
        localStorage.removeItem('token')
        window.location.href = 'login.html';
    });
}


function buildRows(data) {
    data.forEach(el => {
        document.getElementById('usrLst').innerHTML += `
        <tr>
            <th scope="row">${el.id}</th>
            <td>${el.firstName}</td>
            <td>${el.lastName}</td>
            <td>${el.email}</td>
            <td>${el.username}</td>
        </tr>`;
    })
}

function buildOneRow(el) {
    return ` <tr>
        <th scope="row">${el.id}</th>
        <td>${el.firstName}</td>
        <td>${el.lastName}</td>
        <td>${el.email}</td>
        <td>${el.username}</td>
         
        </tr>`
}


function getAllUsers(token, schema) {
    fetch(schema.api_url, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            var str = ""
            data.forEach(el => {
                str += `<tr>`
                schema.properties.forEach(element => {
                  str +=    `<td>${el[element]}</td>`
                });


                    // <th scope="row">${el.id}</th>
                    // <td>${el.firstName}</td>
                    // <td>${el.lastName}</td>
                    // <td>${el.email}</td>
                    // <td>${el.username}</td>
               str += `</tr>`;
            });
            document.getElementById('usrLst').innerHTML = str
        });

}

function prepareDataForHttp(schema) {
    const data = {}
    schema.properties.forEach(prop => {
        data[prop] = document.getElementById(prop).value
    });

    return data
}

function clearInputs(schema) {
    schema.properties.forEach(prop => {
        document.getElementById(prop).value = ''
    });
}

function createFrom(schema) {
    str = ""
    schema.properties.forEach(p => {
        str +=
            `<div class="mb-3">
            <label for="name" class="form-label">${p}</label>
            <input type="text" class="form-control" placeholder="Enter ${p} here" id="${p}" name="${p}">
        </div>`
    });

    document.getElementById("form").innerHTML = str;
}

function createTableHeadings(schema) {
    str = ''

    var headers = schema.properties.filter(p => p != 'password');
    headers.forEach(p => {
        str +=
            `<th scope="col">${p}</th>`
    });

    document.getElementById("columnNames").innerHTML = str;
}