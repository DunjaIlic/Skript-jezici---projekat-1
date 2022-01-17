function init() {


    const cookies = document.cookie.split('=');
    const token = localStorage.getItem('token');

    getAllUsers(token)

    document.getElementById('usrBtnAdd').addEventListener('click', e => {
        e.preventDefault();

        const data = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            username: document.getElementById('username').value,
            password: document.getElementById('password').value
        };

        document.getElementById('firstName').value = '';
        document.getElementById('lastName').value = '';
        document.getElementById('email').value = '';
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';

        fetch('http://localhost:8000/admin/users', {
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
                    document.getElementById('usrLst').innerHTML += buildOneRow(el)
                }
            });
    });


    document.getElementById('usrBtnUpdate').addEventListener('click', e => {
        e.preventDefault();

        const data = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            username: document.getElementById('username').value,
            password: document.getElementById('password').value,
            id: document.getElementById('id').value


        };

        document.getElementById('firstName').value = '';
        document.getElementById('lastName').value = '';
        document.getElementById('email').value = '';
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';

        fetch('http://localhost:8000/admin/users/' + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
            .then(res => console.log(res))
            });

    document.getElementById('usrBtnDelete').addEventListener('click', e => {
        e.preventDefault();
       
        const id = document.getElementById("id").value;

        fetch('http://localhost:8000/admin/users/' + id, {
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
                    getAllUsers(token)
                }
            });
    });

    document.getElementById('usrBtnLogOut').addEventListener('click', e => {
        document.cookie = `token=;SameSite=Lax`;
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


function getAllUsers(token) {
    fetch('http://localhost:8000/admin/users', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            var str = ""
            data.forEach(el => {
                str += `
                <tr>
                    <th scope="row">${el.id}</th>
                    <td>${el.firstName}</td>
                    <td>${el.lastName}</td>
                    <td>${el.email}</td>
                    <td>${el.username}</td>
                </tr>`;
            });
            document.getElementById('usrLst').innerHTML = str
        });

}