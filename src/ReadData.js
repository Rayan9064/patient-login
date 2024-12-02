import React, { useState } from "react";
import { useOkto } from "okto-sdk-react";
import { useNavigate } from "react-router-dom";

const ReadData = ({ handleLogout }) => {
  const navigate = useNavigate();
  const [wallets, setWallets] = useState(null);
  const [error, setError] = useState(null);
  const { createWallet, logOut } = useOkto();

  const fetchWallets = async () => {
    try {
      const walletsData = await createWallet();
      console.log(walletsData);
      setWallets(walletsData);

      // Store the wallet address of wallets[1] in a variable
      if (walletsData && walletsData.length > 1) {
        const walletAddress = walletsData[1]?.address; // Adjust the key if needed
        console.log("Wallet Address:", walletAddress);
      }
    } catch (error) {
      setError(`Failed to fetch wallets: ${error.message}`);
    }
  };

  const logout = async () => {
    try {
      logOut();
      handleLogout();
      navigate('/');
    } catch (error) {
      setError(`Failed to log out: ${error.message}`);
    }
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
  };

  const buttonStyle = {
    margin: '5px',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
  };

  return (
    <div style={containerStyle}>
      <div>
        <button style={buttonStyle} onClick={fetchWallets}>View Wallets</button>
        <button style={buttonStyle} onClick={logout}>Log Out</button>
      </div>
      {wallets && (
        <div>
          <h2>Wallets:</h2>
          <pre>{JSON.stringify(wallets, null, 2)}</pre>
        </div>
      )}
      {error && (
        <div style={{ color: 'red' }}>
          <h2>Error:</h2>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default ReadData;
