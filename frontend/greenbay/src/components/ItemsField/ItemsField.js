import React from 'react';
import Item from '../Item/Item';
import './ItemsField.css';

export default function ItemsField (data) {
  return(
    <div id="itemsfield">
    {data.data.map((item) => (
      <div key={item.id} id={item.id}>
        <Item
          key={item.id}
          id={item.id}
          name={item.name}
          description={item.description}
          owner={JSON.parse(localStorage.getItem('users'))[JSON.parse(localStorage.getItem('users')).findIndex(user => user.id === item.user_id) || 0].username}
          photoUrl={item.photo_url}
          buyPrice={item.buy_price}
          sold={item.sold}
        />

      </div>
    ))}
    </div>

  )
}