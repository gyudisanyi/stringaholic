// This is how to use ReusableModal. The example is the SingleQR component, but could be any other.

import React, { useState } from 'react';
import ReusableModal from './ReusableModal';
import SingleQR from '../SingleQR/SingleQR';
import Button from '../Button/Button';

function ReusableModalUsageExample() {
  const [reusableModalStatus, setReusableModalStatus] = useState(false);

  return (
    <>
      <div>
        { reusableModalStatus && (
        <ReusableModal
          closeModal={() => setReusableModalStatus(false)}
          headerText="Show this code to your inspector!"
          Component={(
            <SingleQR
              userId="1"
              orderId="2"
              expiration="asdf"
              status="active"
            />
        )}
        />
        )}
        <div className="container">
          <Button buttonText="Modal QR" buttonClass="emptyButton" handleClick={() => setReusableModalStatus(true)} />
        </div>
      </div>
    </>
  );
}

export default ReusableModalUsageExample;
