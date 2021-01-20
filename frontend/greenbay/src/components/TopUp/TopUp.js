import React, { useState } from 'react';
import { useHistory} from 'react-router-dom';
import generalFetch from '../../utilities/generalFetch';
import Button from '../Button/Button'

export default function TopUp({ name, itemId, need }) {
  const [topupvalue, setTopUp] = useState(need)
  
  let history = useHistory();

  function TopUpChange(event) {
    setTopUp(event.target.value)
  }

  async function topup() {
    try {
      let newBalance = parseInt(topupvalue)+parseInt(localStorage.getItem('balance'));
      const data = await generalFetch(`users/${+localStorage.getItem('userId')}`, 'PATCH', {"balance": newBalance});
      localStorage.setItem('balance', newBalance);
      if(data.message) { throw new Error(data.message)};
      console.log(data)
    } catch (fetchError) {
      console.log(fetchError)
    }
    history.push("/shop");
  }

  return (
    <>
    <p>{`You need at least ${need}$ to buy this ${name}!`}</p>
    <form>
      <label htmlFor="topup">
        <input type="number" onChange={TopUpChange} defaultValue={need} style={{"height": "3em", "display": "block", "width": "35%", "margin": "auto", "margin-bottom": "1em"}}/>
      </label>
      <Button handleClick={topup} buttonText={`Top Up my balance!`} buttonClass="buyButton" />
    </form>
    <img alt="payment methods" src="https://www.isterh2019.com/assets/img/conference/icon-cc.png" style={{"max-width": "420px"}}/>
    </>
  )
}