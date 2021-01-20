import React from 'react'
import { useHistory} from 'react-router-dom';
import Button from '../Button/Button'
import generalFetch from '../../utilities/generalFetch'

export default function Buy({ itemId, ownerId, price }) {
  
  let history = useHistory();

  async function buy() {
    try {
      let newBalance = parseInt(localStorage.getItem('balance'))-parseInt(price);
      const data = await generalFetch(`users/${+localStorage.getItem('userId')}`, 'PATCH', {"balance": newBalance});
      localStorage.setItem('balance', newBalance);
      const sellersBalance = await generalFetch(`users/${+ownerId}`, 'GET');
      const purchasing = await generalFetch(`users/${+ownerId}`, 'PATCH', {"balance": +sellersBalance.balance+price});
      const bought = await generalFetch(`items/${+itemId}`, 'PATCH', {"user_id": +localStorage.getItem('userId')});
      if(data.message || bought.message || purchasing.message) { throw new Error(data.message || bought.message || purchasing.message)};
    } catch (fetchError) {
      console.log(fetchError)
    }
    history.push("/shop");
  }

  return (
    <>
    <p>{`You're about to spend ${price}$ on another instrument!`}</p>
    <Button handleClick={buy} buttonText="Yes I will" buttonClass="buyButton" />
    <p><img alt="payment methods" src="https://www.isterh2019.com/assets/img/conference/icon-cc.png" style={{"max-width": "420px"}}/></p>
    </>
  )
}