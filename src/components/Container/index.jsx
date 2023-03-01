/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable arrow-parens */
import React, { useState, useEffect } from 'react';
import './container.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import filter from '../../assets/icons/filter-solid.svg';
import search from '../../assets/icons/magnifying-glass-solid.svg';
import Box from '../Box';

export default function Container() {
  const [allData, setAllData] = useState([]);
  const [subsetData, setSubsetData] = useState([]);
  useEffect(() => {
    axios
      .get('http://localhost:8000/api/events')
      .then(response => {
        const output = response.data;
        setAllData(output);
        setSubsetData(output);
        // console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  const ShowAllEvents = () => {
    setSubsetData(allData);
  };
  const showRegisteredEvents = () => {
    const temporaryData = [];
    for (let i = 0; i < allData.length; i += 1) {
      if (allData[i].isRegistered === true) {
        temporaryData.push(allData[i]);
      }
    }
    setSubsetData(temporaryData);
  };
  const showBookmarkedEvents = () => {
    const temporaryData = [];
    for (let i = 0; i < allData.length; i += 1) {
      if (allData[i].isBookmarked === true) {
        temporaryData.push(allData[i]);
      }
    }
    setSubsetData(temporaryData);
  };
  const showEventsWithSeats = () => {
    const temporaryData = [];
    for (let i = 0; i < allData.length; i += 1) {
      if (allData[i].areSeatsAvailable === true && allData[i].isRegistered === false) {
        temporaryData.push(allData[i]);
      }
    }
    setSubsetData(temporaryData);
  };
  const [query, setQuery] = useState('');
  const searchQueryHandler = event => {
    setQuery(event.target.value.toLowerCase());
  };
  const searchQuery = title => title.includes(query);
  const searchHandler = () => {
    if (query === '') {
      setSubsetData(allData);
      return;
    }
    const temporaryData = [];
    for (let i = 0; i < subsetData.length; i += 1) {
      if (searchQuery(subsetData[i].name.toLowerCase()) === true) {
        temporaryData.push(allData[i]);
      }
    }
    setSubsetData(temporaryData);
  };
  return (
    <div className="container">
      <div className="search-and-filter">
        <div className="filter">
          <img src={filter} alt="filter" />
        </div>
        <div className="search">
          <input type="text" onChange={searchQueryHandler} />
          <img src={search} alt="search" placeholder="EVENT NAME" onClick={searchHandler} />
        </div>
      </div>
      <div className="filter-fields">
        <div className="all-and-registered">
          <input type="radio" value="all" name="filter" onClick={ShowAllEvents} defaultChecked />
          ALL
          <br />
          <input type="radio" value="registered" name="filter" onClick={showRegisteredEvents} />
          REGISTERED
        </div>
        <div className="bookmarked-and-available">
          <div>
            BOOKMARKED
            <input type="radio" value="bookmarked" name="filter" onClick={showBookmarkedEvents} />
          </div>
          <div>
            SEATS AVAILABLE
            <input type="radio" value="registered" name="filter" onClick={showEventsWithSeats} />
          </div>
        </div>
      </div>
      <div className="content">
        {subsetData.map(item => (
          <Link to={`/events/${item.id}`}>
            <Box
              key={item.id}
              id={item.id}
              image={item.imgUrl}
              title={item.name}
              description={item.description}
              venue={item.venue}
              datetime={item.datetime}
              isRegistered={item.isRegistered}
              areSeatsAvailable={item.areSeatsAvailable}
              isBookmarked={item.isBookmarked}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
