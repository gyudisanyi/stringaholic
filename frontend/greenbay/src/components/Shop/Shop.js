import React, {useState, useEffect} from 'react';
import ItemsField from '../ItemsField/ItemsField';
import generalFetch from '../../utilities/generalFetch';
import './Shop.css'

export default function Shop () {
  const [items, setItems] = useState('');
  const [error, setError] = useState('');
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await generalFetch('items', 'GET');
        const data = await response;
        if(data.message) { throw new Error(data.message)};
        if (!data[0]) { throw new Error('Query returning empty result!'); }
        setItems(data);
      } catch (fetchError) {
        setError(fetchError);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="page">
      <div className="title">
        <h2>Shop stuff {localStorage.getItem('users')[0].username}</h2>
      </div>
      <div>
        {!items
          ? <div className="status">{`${error.message}` || 'Fetching data...'}</div>
          : <ItemsField data={items} />
        }
      </div>
    </div>
  )
}