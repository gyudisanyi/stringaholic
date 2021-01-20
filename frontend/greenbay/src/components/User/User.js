import React, {useState, useEffect} from 'react';
import {
  useRouteMatch,
} from 'react-router-dom';
import generalFetch from '../../utilities/generalFetch';
import ItemsField from '../ItemsField/ItemsField';
import './User.css';

export default function User() {
  const [items, setItems] = useState('');
  const [error, setError] = useState('');
  
  let { url } = useRouteMatch();
  let id = url.split('/')[2]
  let userName = JSON.parse(localStorage.getItem('users'))[JSON.parse(localStorage.getItem('users')).findIndex(user => ''+user.id === ''+id)].username
  
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await generalFetch(`items/?user_id=${id}`, 'GET');
        if(data.message) { throw new Error(data.message)};
        if (!data[0]) { throw new Error('Query returning empty result!'); }
        setItems(data);
      } catch (fetchError) {
        setError(fetchError);
      }
    }
    fetchData();
  }, [id]);

  return (
    <>
    <h2>{userName}'s instruments</h2>
    <div>
        {!items
          ? <div className="status">{`${error.message}` || 'Fetching data...'}</div>
          : <ItemsField data={items} />
        }
      </div>
    </>
  )
}
