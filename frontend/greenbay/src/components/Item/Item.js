import React from 'react';
import Button from '../Button/Button'
import './Item.css'

export default function Item({id, name, description, owner, photoUrl, buyPrice, sold}) {

  return (
    <div className="item" id={`item${id}`}>
      <h3>{name}</h3>
      <p className="seller">Posted by <a href={`http://localhost:8080/users/?username=${owner}`}>{owner}</a></p>
      <p className="description">{description}</p>
      <img className="itemPhoto" alt={name} src={photoUrl} />
      <p className="price">Buying price {buyPrice} $</p>
      <p className="sold">{sold === "no" ? 
        <Button
          buttonText="buy"
          buttonClass="buyButton"
          handleClick={(e) => alert('bought')}
          /> : `Sold at ${sold}` }</p>
    </div>
  )
}