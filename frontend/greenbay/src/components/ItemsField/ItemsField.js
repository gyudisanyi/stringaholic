import React, { useState, useEffect } from 'react';
import Item from '../Item/Item';
import './ItemsField.css';

export default function ItemsField (data) {

  const [filter, setFilter] = useState({
    modern: true,
    historic: true,
    folk: true,
  });

  const categories = Object.keys(filter)

  let ownId = localStorage.getItem('userId');

  const [toggles, setToggles] = useState({
    sold: true,
    own: true,
    budget: false,
  });
  
  useEffect(() => {
  }, [filter]);

  return(
    <>
      <div className="filterBox">
        <form id="filter">
        <span className="tag">Filter: </span>
          <label htmlFor="modern">
            <input
              type="checkbox"
              name="modern"
              checked={filter.modern}
              onChange={() => setFilter({
                ...filter,
                modern: !filter.modern,
              })}
            />
              <span onClick={() => setFilter(
                filter.folk || filter.historic ?
                {
                modern: true,
                historic: false,
                folk: false,
                }
                :
                {
                modern: true,
                historic: true,
                folk: true,
                }
                )}>Modern</span>
            </label>
          <label htmlFor="historic">
            <input
              type="checkbox"
              name="historic"
              checked={filter.historic}
              onChange={() => setFilter({
                ...filter,
                historic: !filter.historic,
              })}
            />
              <span onClick={() => setFilter(
                filter.modern || filter.folk ?
                {
                modern: false,
                historic: true,
                folk: false,
                }
                :
                {
                modern: true,
                historic: true,
                folk: true,
                }
                )}>Historic</span>
            </label>
          <label htmlFor="folk">
            <input
              type="checkbox"
              name="folk"
              checked={filter.folk}
              onChange={() => setFilter({
                ...filter,
                folk: !filter.folk,
              })}
            />
              <span onClick={() => setFilter(
                filter.modern || filter.historic ?
                {
                modern: false,
                historic: false,
                folk: true,
                }
                :
                {
                modern: true,
                historic: true,
                folk: true,
                }
                )}>Folk</span>
            </label>
            <label htmlFor="listSold">
            <input
              type="checkbox"
              name="listSold"
              checked={toggles.sold}
              onChange={() => setToggles({
                ...toggles,
                sold: !toggles.sold
              })}
            />
              Sold
            </label>
            <label htmlFor="listOwn" style={ownId?{}:{"display": "none"}}>
            <input
              type="checkbox"
              name="listOwn"
              checked={toggles.own}
              onChange={() => setToggles({
                ...toggles,
                own: !toggles.own
              })}
            />
              Own
            </label>
            <label htmlFor="budget" style={ownId?{}:{"display": "none"}}>
            <input
              type="checkbox"
              name="budget"
              checked={toggles.budget}
              onChange={() => setToggles({
                ...toggles,
                budget: !toggles.budget
              })}
            />
              Fits budget
            </label>
        </form>
        <form id="search">
          <span className="tag">Search:</span>
          <label htmlFor="search">
            <input type="text" name="search"/>
          </label>
          <input type="submit" value="Go"/>
        </form>
      </div>
    <div id="itemsfield">
    {data.data.map((item) => (
      <div key={item.id} id={item.id}>
      
        <Item
          key={item.id}
          id={item.id}
          name={item.name}
          description={item.description}
          userId={item.user_id}
          owner={JSON.parse(localStorage.getItem('users'))[JSON.parse(localStorage.getItem('users')).findIndex(user => ''+user.id === ''+item.user_id)].username}
          photoUrl={item.photo_url}
          buyPrice={item.buy_price}
          sold={item.sold}
          category={categories[item.category-1]}
          toggle={
            !!filter[categories[item.category-1]] &&
            (toggles.sold || item.sold === 'no') &&
            (toggles.own || ''+item.user_id !== ''+ownId) &&
            (!toggles.budget || item.buy_price <= localStorage.getItem('balance'))
          }
        />

      </div>
    ))}
    </div>
    </>
  )
}