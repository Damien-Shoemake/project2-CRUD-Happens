async function logout() {
    const res = await fetch('/api/users/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (res.ok) {
        document.location.replace('/')
    } else {
        window.alert('Logout failed')
    }
}


document.getElementById('#logout').addEventListener('click', logout)