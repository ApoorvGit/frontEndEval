/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable max-len */
import React, { useState } from 'react';
import './Box.css';
import propTypes from 'prop-types';
import tick from '../../assets/icons/tick.png';
import bookmark from '../../assets/icons/bookmark.png';
import bookmarkSolid from '../../assets/icons/bookmarkSolid.png';
import cross from '../../assets/icons/cross.png';

export default function Box({
  image,
  title,
  description,
  venue,
  datetime,
  isRegistered,
  areSeatsAvailable,
  isBookmarked,
}) {
  const [isThisBookmarked, setIsThisBookmarked] = useState(isBookmarked);
  const bookmarkHandler = () => {
    setIsThisBookmarked(!isThisBookmarked);
  };
  return (
    <div className="box">
      <img src={image} alt="event" />
      <div className="box-body">
        <div className="box-title">{title}</div>
        <div className="box-desc">{description}</div>
        <div className="box-venue">
          <b>VENUE: </b>
          {venue}
        </div>
        <div className="box-date">
          <b>DATE: </b>
          {datetime}
        </div>
        <div className="register-and-bookmark">
          <div className="registered">
            <div>{isRegistered && <img src={tick} alt="registered" />}</div>
            <div>{isRegistered && <p>REGISTERED</p>}</div>
            <div>{!isRegistered && !areSeatsAvailable && <img src={cross} alt="cross" />}</div>
            <div>{!isRegistered && !areSeatsAvailable && <p>NO SEATS AVAILABLE</p>}</div>
          </div>
          <div className="bookmark">
            <img src={isThisBookmarked ? bookmarkSolid : bookmark} alt="bookmark" onClick={bookmarkHandler} />
          </div>
        </div>
      </div>
    </div>
  );
}
Box.propTypes = {
  image: propTypes.string.isRequired,
  description: propTypes.string.isRequired,
  venue: propTypes.string.isRequired,
  datetime: propTypes.string.isRequired,
  isRegistered: propTypes.bool.isRequired,
  isBookmarked: propTypes.bool.isRequired,
  title: propTypes.string.isRequired,
  areSeatsAvailable: propTypes.bool.isRequired,
};
