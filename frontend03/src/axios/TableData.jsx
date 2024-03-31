import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TableData = () => {

  const [data, setData] = useState([]);

  useEffect(() => {
    // Define a function to fetch data from the API
    const fetchData = async () => {
      try {
        // Make a GET request to the API endpoint
        const response = await axios.get('http://localhost:3001/getlist');
        // Update the state with the fetched data
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []); 

  return (
    <div>
    
      <ul>
        {data.map(item => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default TableData;
