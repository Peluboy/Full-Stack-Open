import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import { useEffect } from 'react'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState('success')

  useEffect(() => {
    personService.getAll().then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])

    const showMessage = (text, type = 'success') => {
    setMessage(text)
    setMessageType(type)
    setTimeout(() => {
      setMessage(null)
    }, 4000)
  }

const addPerson = (event) => {
    event.preventDefault()
    const existing = persons.find(p => p.name.toLowerCase() === newName.toLowerCase())
    const newPerson = { name: newName, number: newNumber }

    if (existing) {
      const confirmUpdate = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      )
      if (confirmUpdate) {
        personService
          .update(existing.id, { ...existing, number: newNumber })
          .then(updatedPerson => {
            setPersons(persons.map(p => (p.id !== existing.id ? p : updatedPerson)))
            showMessage(`Updated ${newName}`)
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            showMessage(
              `Information of ${newName} has already been removed from server`,
              'error'
            )
            setPersons(persons.filter(p => p.id !== existing.id))
          })
      }
      return
    }

    personService
      .create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        showMessage(`Added ${newName}`)
        setNewName('')
        setNewNumber('')
      })
      .catch(() => {
        showMessage(`Failed to add ${newName}`, 'error')
      })
  }

const deletePerson = (id) => {
    const person = persons.find(p => p.id === id)
    if (!person) return

    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
          showMessage(`Deleted ${person.name}`)
        })
        .catch(() => {
          showMessage(
            `Information of ${person.name} has already been removed from server`,
            'error'
          )
          setPersons(persons.filter(p => p.id !== id))
        })
    }
  }

  const handleNameChange = (e) => setNewName(e.target.value)
  const handleNumberChange = (e) => setNewNumber(e.target.value)
  const handleFilterChange = (e) => setFilter(e.target.value)

  const personsToShow = persons.filter(p =>
    p.name.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} type={messageType} />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />

      <h3>Add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>
      <Persons persons={personsToShow} deletePerson={deletePerson} />
    </div>
  )
}

export default App
