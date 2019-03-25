import React from 'react'

const Suggestions = (props) => {
  const options = props.results.map(person => (
    <li key={person.id} className="user-search-item">
      {person.name}
    </li>
  ))
  return <ul className="user-search">{options}</ul>
}

export default Suggestions;