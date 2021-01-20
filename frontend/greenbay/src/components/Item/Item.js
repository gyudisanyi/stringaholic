import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button/Button'
import ReusableModal from '../../utilities/Modal/ReusableModal';
import Buy from '../Buy/Buy';
import TopUp from '../TopUp/TopUp';

import './Item.css'

export default function Item({id, name, description, userId, owner, photoUrl, buyPrice, sold, category, toggle, }) {

  const [reusableModalStatus, setReusableModalStatus] = useState(false);

  const yours = '' + userId === '' + localStorage.getItem('userId')
  const canBuy = buyPrice <= localStorage.getItem('balance')

  if (toggle) {
    return (
      <div className="item" id={`item${id}`}>
        <h3>{name}</h3>
        <p className={`category ${category}`}
        >{category} instrument</p>
        <p className="seller">{`Posted by `}
          <Link
            to={`/user/${userId}`} >{yours ? 'You' : owner}
          </Link>
        </p>
        <p className="description">{description}</p>
        <img className="itemPhoto" alt={name} src={photoUrl} />
        <p className="price">Buying price {buyPrice} $</p>
        
        {!yours ? 
          <p className="sold">{sold === "no" ? 
            <div style={localStorage.getItem('userId') ? {} : {"display": "none"} }>
                { reusableModalStatus && (
                <ReusableModal
                  closeModal={() => setReusableModalStatus(false)}
                  headerText={`Buy this ${name} from ${owner}!`}
                  Component={canBuy ? (
                    <Buy itemId={id} price={buyPrice} ownerId={userId}
                    />
                    ) : (
                    <TopUp need={buyPrice-localStorage.getItem('balance')} name={name} itemId={id} />
                    )}
                />
                )}
                <div className="container">
                  <Button buttonText={canBuy ? 'Buy' : 'Top up'} buttonClass={canBuy ? 'buyButton' : 'emptyButton'} handleClick={() => setReusableModalStatus(true)} />
                </div>
              </div>
              : `Sold at ${sold}` }</p>
            : <></>
          }
      </div>
    )
  }
  return (<></>)
}