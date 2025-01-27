import React, {useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import ItemsField from '../ItemsField/ItemsField';
import generalFetch from '../../utilities/generalFetch';


export default function Shop () {
  const [items, setItems] = useState('');
  const [error, setError] = useState('');

  let { search } = useLocation()

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await generalFetch(`items${search.split('=')[1] ? '?q='+search.split('=')[1] : '/' }`, 'GET');
        if(data.message) { throw new Error(data.message)};
        if (!data[0]) { throw new Error('Query returning empty result!'); }
        setItems(data);
      } catch (fetchError) {
        setError(fetchError);
      }
    }
    fetchData();
  }, [search]);

  return (
    <>
      <div className="title">
        <h2>Shop</h2>
      </div>
      <div>
        {!items
          ? <div className="status">{`${error.message}` || 'Fetching data...'}</div>
          : <ItemsField data={items} />
        }
      </div>
    </>
  )
}