import React, { useState, useEffect, createRef } from 'react';
import { users } from './data';
import './App.css';
import { SearchRecord } from './components';

function App() {
  const [searchResults, setResults] = useState([])
  const [cursor, setCursor] = useState(null)
  const [search, setSearch] = useState('')
  const cardRef = createRef();


  const filterData = (user, inputText) => {
    return user.name.toLowerCase().indexOf(inputText) >= 0 || user.id.toLowerCase().indexOf(inputText) >= 0 || user.address.toLowerCase().indexOf(inputText) >= 0
  }

  const handleInput = (e) => {
    const inputText = e.target.value.toLowerCase();
    setSearch(e.target.value)
    if (!inputText) return setResults([])
    const searchResults = users.filter((user) => filterData(user, inputText))
    setResults(searchResults)
  }

  const handleSelection = (e) => {
    if (e.keyCode === 38 && cursor > 0) {
      setCursor(cursor - 1)
    } else if (e.keyCode === 40 && cursor < searchResults.length - 1) {
      if (cursor == null)
        return setCursor(0)
      setCursor(cursor + 1)
    }

    cardRef.current && cardRef.current.previousSibling && cardRef.current.previousSibling.scrollIntoView()
    document.body.style.pointerEvents = 'none';
  }

  const clearSearch = () => {
    setSearch('');
    setResults([])
  }

  useEffect(() => {
    window.addEventListener('mousemove', () => {
      document.body.style.pointerEvents = 'auto';
    })

    return () => {
      window.removeEventListener('mousemove')
    }
  }, [])

  return (
    <div className="wrapper">
      <div className="search-bar">
        <i className="icon-search" />
        <input className="search-box"
          type="text"
          placeholder="Search users by ID, address, name"
          onChange={handleInput}
          value={search}
          onKeyDown={handleSelection} />
        {search && <i className="icon-close" onClick={clearSearch} />}
      </div>
      <div className="card-container">
        {
          search && searchResults.length === 0 && <SearchRecord>No User Found</SearchRecord>
        }
        {
          searchResults.map((item, index) => (
            <SearchRecord key={item.id}
              data={item}
              cursor={cursor}
              index={index}
              cardRef={cardRef}
              setCursor={setCursor}
              search={search} />
          ))
        }
      </div>
    </div >
  );
}

export default App;
