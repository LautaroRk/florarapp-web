import React, { useState, useEffect } from 'react';
import { msToTime, dateToString } from '../utils/dates';

const Auction = ({ auction }) => {

  const {
    auction_id,
    image_url,
    article_id,
    description,
    description0C,
    variety,
    source,
    stem_length,
    stems,
    color, quality,
    start_date,
    end_date,
    stock_left,
    initial_price,
    discount_freq,
    discount_rate,
    min_price,
  } = auction;

  const [timeLeft, setTimeLeft] = useState(0);
  const [price, setPrice] = useState(initial_price);
  
  useEffect(() => {
    applyDiscount();
    const starts = new Date(start_date).valueOf();
    const now = new Date().valueOf();

    // Si falta para el comienzo de la subasta, seteamos un timeout para activar el contador un minuto antes
    if (starts > now) {
      setTimeout(() => {
        startCountdown();
      }, starts - now - 60000);
    } else {
      startCountdown();
    };
  }, []);

  const applyDiscount = () => {
    const times = parseInt(((new Date().valueOf() - new Date(start_date).valueOf()) / 60000 ) / discount_freq);
    const newPrice = parseInt(initial_price * ((1 - discount_rate / 100) ** times));

    if (newPrice < min_price) {
      setPrice(min_price);
    } else if (newPrice > initial_price) {
      setPrice(initial_price);
    } else {
      setPrice(newPrice);
    }
  };

  const startCountdown = () => {
    const starts = new Date(start_date).valueOf();
    const ends = new Date(end_date).valueOf();
    let now = new Date().valueOf();
    let timer;

    timer = setInterval(() => {
      applyDiscount();
      now = new Date().valueOf();
      if (ends >= now && starts < now) {
        setTimeLeft(ends - now);
      }
      if (ends < now) {
        setTimeLeft(0);
        clearInterval(timer);
      }
    }, 1000);
  };

  const showTime = () => {
    const now = new Date();
    const starts = new Date(start_date);
    const ends = new Date(end_date);

    // Si todavia no empezó
    if (starts > now) {
      return <p className="mb-0 pb-0">Inicio: { dateToString(starts) }</p>
    }
    // Si ya terminó
    else if (ends < now) {
      return <p className="mb-0 pb-0">Finalizó: { dateToString(ends) }</p>
    }
    // Si está activa
    else {
      return <h5 className="mb-0 pb-0">{ msToTime(timeLeft) }</h5>
    }
  };

  const showDescription = () => {
    let descText = "";
    if (article_id === "0C") {
      descText = description0C;
    } else {
      if (description) descText = descText.concat(description);
      // if (variety) descText = descText.concat(" - " + variety);
      if (color) descText = descText.concat(" - " + color);
      if (quality) descText = descText.concat(" - " + quality);
      if (source) descText = descText.concat(" - " + source);
      if (stem_length) descText = descText.concat(" - " + stem_length);
      if (stems) descText = descText.concat(" - x" + stems);
    }
    
    return <p className="mb-0 pt-0">{descText}</p>
  };

  return (
    <div className="card border-dark m-3" style={{ width: 400 }}>
      <div className="card-header d-flex flex-row justify-content-between pb-0">
        <h5>{stock_left}</h5>
        <div>
          <span className="text-muted mr-2">ID </span>
          { auction_id }
        </div>
        <h5>${ price }</h5>
      </div>
      <div className="card-body d-flex flex-row mr-0 pr-0">
        <img className="pr-4" src={ image_url } style={{width: 150, height: 100}} />
        <div className="d-flex flex-column justify-content-between">
          <div className="flex-column justify-content-start">
            {showDescription()}
            <p><span className='text-muted mr-2 mt-0 pt-0'>Stock:</span>{stock_left}</p>
          </div>
          { showTime() }
        </div>
      </div>
    </div>
  );
};

export default Auction;