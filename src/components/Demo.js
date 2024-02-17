import React, { useState, useEffect } from 'react';
import colorNameToCode from 'color-name-to-code'; // Import a library to convert color names to RGB codes

function Demo() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState('https://swapi.dev/api/people/?page=1');
  const [prevPageUrl,setprevPageUrl] = useState('');
  const [nextPageUrl,setnextPageUrl] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(currentPage);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setUsers(data.results);
        setLoading(false);
        setprevPageUrl(data.previous);
        setnextPageUrl(data.next);

        console.log(data.next,prevPageUrl,nextPageUrl);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage]);

  const handleNextPage = () => {
    setCurrentPage(nextPageUrl);
  };

  const handlePrevPage = () => {
    setCurrentPage(prevPageUrl);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="Demo">
      <h1>Star Wars Users</h1>
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={handleSearch}
      />
      {error && <p>{error}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="user-list">
          {filteredUsers.map(user => (
            <div
              key={user.name}
              className="user-card"
              style={{ backgroundColor: user.hair_color }}
            >
              <img
                src={`https://picsum.photos/200/300?random=${Math.random()}`}
                alt={user.name}
              />
              <div>
                <h2>{user.name}</h2>
                <p>Hair Color: {user.hair_color}</p>
                <p>Skin Color: {user.skin_color}</p>
                <p>Gender: {user.gender}</p>
                <p>Count of Vehicles: {user.vehicles.length}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={!prevPageUrl}>
          Previous
        </button>
        <button onClick={handleNextPage} disabled={!nextPageUrl}>
          Next
        </button>
      </div>
    </div>
  );
}

export default Demo;
