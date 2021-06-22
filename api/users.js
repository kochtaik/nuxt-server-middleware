const axios = require('axios')

function fetchUsers() {
  return axios
    .get('https://jsonplaceholder.typicode.com/todos/1')
    .then((res) => res.data)
}

async function logUsers() {
  return await fetchUsers()
}

export { logUsers }
