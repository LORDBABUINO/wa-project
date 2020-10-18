import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import api from '../../services/api'
import { Li } from './styles'

const User = ({ userId, nodeId, html_url, avatar_url, login, onClick }) => {
  const [followers, setFollower] = useState(0)
  const [following, setFollowing] = useState(0)
  useEffect(() => {
    ;(async () => {
      const { data } = await api.get(`users/${login}`)
      setFollower(data.followers)
      setFollowing(data.following)
    })()
  }, [login])
  return (
    <Li>
      <img src={avatar_url} alt={login} />
      <div>
        <span>Id:</span>
        <span>{userId}</span>
      </div>
      <div>
        <span>Login:</span>
        <span>{login}</span>
      </div>
      <div>
        <span>Node Id:</span>
        <span>{nodeId}</span>
      </div>
      <div>
        <span>Followers:</span>
        <span>{followers}</span>
      </div>
      <div>
        <span>Following:</span>
        <span>{following}</span>
      </div>
      <a href={html_url} target="_blank" rel="noopener noreferrer">
        <button type="button">acessar github</button>
      </a>
      <button className="button" type="button" onClick={onClick}>
        remover
      </button>
    </Li>
  )
}

User.propTypes = {
  userId: PropTypes.number.isRequired,
  nodeId: PropTypes.string.isRequired,
  html_url: PropTypes.string.isRequired,
  avatar_url: PropTypes.string.isRequired,
  login: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
}
export default User
