function init() {

    document.getElementById('btn').addEventListener('click', e => {
        e.preventDefault();

        const data = {
            username: document.getElementById('username').value,
            password: document.getElementById('password').value
        };


        fetch('http://localhost:9000/login', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },

        })
            .then(res => res.json())
            .then(data => {
                if (data.token)
                {
                    localStorage.setItem('token', data.token)
                    window.location.href = "/adminPage.html"
                }
                else alert("Bad login, please check username and password")
            })

    });
}