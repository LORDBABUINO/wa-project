import React, { useState, useEffect } from 'react'
import api from '../../services/api'
import User from '../../components/User'
import { Main } from './styles'

export default function Home() {
  const [currentUsers, setCurrentUsers] = useState([])
  const [deletedUsers, setDeletedUsers] = useState([])
  const [showedUsers, setShowedUsers] = useState([])
  const [showDeleted, setShowDeleted] = useState(false)
  const [searchFunction, setSearchFunction] = useState(() => {})
  useEffect(() => {
    ;(async () => {
      const { data } = await api.get('users', { params: { per_page: 10 } })
      setCurrentUsers(data)
      setShowedUsers(data)
      document.querySelector('#login').click()
      document.querySelector('#search').focus()
    })()
  }, [])
  useEffect(() => {
    setShowedUsers(showDeleted ? deletedUsers : currentUsers)
  }, [showDeleted, deletedUsers, currentUsers])

  const searchByLogin = () => ({ target: { value } }) =>
    setShowedUsers(currentUsers.filter(({ login }) => login.includes(value)))
  const searchById = () => ({ target: { value } }) => {
    const users = currentUsers.filter(({ id }) => id === parseInt(value, 10))
    setShowedUsers(users.length ? users : currentUsers)
  }

  const handleClick = (userId) => () => {
    setDeletedUsers([
      ...deletedUsers,
      ...showedUsers.filter(({ id }) => userId === id),
    ])
    setShowedUsers(showedUsers.filter(({ id }) => userId !== id))
    setCurrentUsers(currentUsers.filter(({ id }) => userId !== id))
  }

  return (
    <Main>
      <div>
        Pesquisar por:
        <label htmlFor="login">
          login
          <input
            type="radio"
            name="searchType"
            id="login"
            onClick={() => setSearchFunction(searchByLogin)}
          />
        </label>
        <label htmlFor="id">
          id
          <input
            type="radio"
            name="searchType"
            id="id"
            onClick={() => setSearchFunction(searchById)}
          />
        </label>
      </div>
      <input type="text" id="search" onChange={searchFunction} />
      <button type="button" onClick={() => setShowDeleted(!showDeleted)}>
        Mostrar usuários {showDeleted && 'não '} deletados
      </button>
      <ul>
        {showedUsers.map(({ id, node_id, html_url, avatar_url, login }) => (
          <User
            userId={id}
            nodeId={node_id}
            html_url={html_url}
            avatar_url={avatar_url}
            login={login}
            key={id}
            onClick={handleClick(id)}
          />
        ))}
      </ul>
    </Main>
  )
}
