/* eslint-disable arrow-parens */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import './BigBox.css';
import propTypes from 'prop-types';
import axios from 'axios';
import tick from '../../assets/icons/tick.png';
import bookmark from '../../assets/icons/bookmark.png';
import bookmarkSolid from '../../assets/icons/bookmarkSolid.png';
import cross from '../../assets/icons/cross.png';

export default function BigBox({ id }) {
  const [registered, setRegistered] = useState(null);
  const [data, setData] = useState({});
  const [isThisBookmarked, setIsThisBookmarked] = useState(null);
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/events/${id}`)
      .then(response => {
        const output = response.data;
        setData(output);
        setRegistered(output.isRegistered);
        setIsThisBookmarked(output.isBookmarked);
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const bookmarkHandler = () => {
    axios
      .patch('http://localhost:8000/api/events/1', { isBookmarked: !isThisBookmarked })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
    setIsThisBookmarked(!isThisBookmarked);
  };

  const UnregisterHandler = () => {
    axios
      .patch('http://localhost:8000/api/events/1', { isRegistered: !registered })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
    setRegistered(!registered);
  };
  return (
    <div className="big-box">
      <img src={data.imgUrl} alt="event" />
      <div className="big-box-body">
        <div className="big-box-title">{data.name}</div>
        <div className="big-box-desc">{data.description}</div>
        <div className="big-box-venue">
          <b>VENUE: </b>
          {data.venue}
        </div>
        <div className="big-box-date">
          <b>DATE: </b>
          {data.datetime}
        </div>
        <div className="register-and-bookmark">
          <div className="registered">
            <div>{registered && <img src={tick} alt="registered" />}</div>
            <div>{registered && <p>REGISTERED</p>}</div>
            <div>{!registered && !data.areSeatsAvailable && <img src={cross} alt="cross" />}</div>
            <div>{!registered && !data.areSeatsAvailable && <p>NO SEATS AVAILABLE</p>}</div>
          </div>
          <div className="bookmark">
            <img src={isThisBookmarked ? bookmarkSolid : bookmark} alt="bookmark" onClick={bookmarkHandler} />
          </div>
        </div>
        {registered && (
          <button type="button" className="unregister" onClick={UnregisterHandler}>
            UNREGISTER
          </button>
        )}
        {!registered && (
          <button type="button" className="unregister" onClick={UnregisterHandler}>
            REGISTER
          </button>
        )}
      </div>
    </div>
  );
}
BigBox.propTypes = {
  id: propTypes.string.isRequired,
};
