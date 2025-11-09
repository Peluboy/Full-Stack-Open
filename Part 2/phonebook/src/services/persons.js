import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const response = axios.get(baseUrl)
    return response.then(response => response.data);
}

const create = (newPerson) => {
    const response = axios.post(baseUrl, newPerson)
    return response.then(response => response.data);
}

const update = (id, updatedPerson) => {
  const response = axios.put(`${baseUrl}/${id}`, updatedPerson)
  return response.then(response => response.data);

}

const remove = (id) => {
  const response = axios.delete(`${baseUrl}/${id}`)
  return response.then(response => response.data);
}

export default { getAll, create, update, remove }
