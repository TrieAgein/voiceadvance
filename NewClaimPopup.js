import React, { useState } from 'react';

const NewClaimPopup = ({ onClose }) => {
  const [claimText, setClaimText] = useState('');

  const handleSubmit = () => {
    // Handle submission of claim text
    console.log('Submitting claim:', claimText);
    // Reset claim text after submission
    setClaimText('');
    // Close the popup window 
    onClose();
  };

  return (
    <div className={styles.popup}>
      <textarea
        value={claimText}
        onChange={(e) => setClaimText(e.target.value)}
        placeholder="Enter your claim text..."
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default NewClaimPopup;




