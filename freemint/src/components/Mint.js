import React, { useState } from "react";
import { Card, Navbar, Nav, Button } from "react-bootstrap";
import Web3 from "web3";
import { ethers } from "ethers";
import "../css/style.css";
import Ninja from "../artifacts/contracts/NeonNinjas.sol/NeonNinjas.json";
import logo from "../images/name.png";
import background from "../images/Logo.JPG";

function Mint(props) {
  const [maxWallet, setmaxWallet] = useState(0);
  const [maxSupply, setmaxSupply] = useState(0);

  const getMaxWallet = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // await provider.send("eth_requestAccounts", []); // <- this promps user to connect metamask
    const signer = provider.getSigner();
    const ninja = new ethers.Contract(NinjaAddr, Ninja.abi, signer);
    const supply = await ninja.MaxPerWallet();
    console.log(supply);
    setmaxWallet(supply);
  };
  const getMaxSupply = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // await provider.send("eth_requestAccounts", []); // <- this promps user to connect metamask
    const signer = provider.getSigner();
    const ninja = new ethers.Contract(NinjaAddr, Ninja.abi, signer);
    const supply = await ninja.MaxSupply();
    console.log(supply);
    setmaxSupply(supply);
  };

  const NinjaAddr = "0x875b9c8928015e3943AF25a9b93262a76B080E93"; //*******************CHANGE FOR MAINNET */

  const eth = async () => {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x1" }],
      });
    } catch (switchError) {
      console.log("Wallet Not Connected");
    }
  };
  const mint = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await eth();
    // await provider.send("eth_requestAccounts", []); // <- this promps user to connect metamask
    const signer = provider.getSigner();
    const ninja = new ethers.Contract(NinjaAddr, Ninja.abi, signer);
    const supply = await ninja.publicMint();
    console.log("minted");
  };

  const goerli = async () => {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x5" }],
    });
  };
  const connectWeb3 = async () => {
    const web3 = new Web3(window.ethereum);
    // get all accounts
    const accounts = await web3.eth.getAccounts();
    const user = accounts[0];
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []); // <- this promps user to connect metamask
    const signer = provider.getSigner();
    await eth();
  };
  // styles={{
  //   backgroundImage: `url(${background})`,
  //   // backgroundPosition: "center",
  //   backgroundSize: "cover",
  //   // backgroundRepeat: "no-repeat",
  //   width: "100vw",
  //   height: "100vh",
  // }}

  return (
    <>
      <img src={logo} height="150" width="250" marginLeft="10px"></img>

      <Button
        style={{
          marginLeft: "6px",
          marginRight: "8px",
          float: "right",
        }}
        className="btn"
        onClick={() => connectWeb3()}
      >
        Connect Wallet
      </Button>
      <Card
        style={{
          width: "rem80",
          float: "center",
          marginLeft: "60px",
          marginRight: "80px",
          marginTop: "70px",
        }}
      >
        <Card.Title>
          <b>Neon Ninja</b>
        </Card.Title>
        {/* <Card.Img>{background}</Card.Img> */}
        {/* <Card.Img
          src={background}
          height="250"
          width="150"
          marginLeft="10px"
        ></Card.Img> */}

        <Button
          style={{
            marginLeft: "6px",
            marginRight: "8px",
          }}
          className="btn"
          onClick={() => mint()}
        >
          Free Mint
        </Button>
      </Card>
      <Card
        style={{
          // width: "rem80",
          float: "left",
          marginLeft: "60px",
          marginRight: "80px",
          marginTop: "70px",
        }}
      >
        <Card.Title>
          <b>Minting Details</b>
        </Card.Title>
        {/* <Card.Img>{background}</Card.Img> */}
        <Card.Text>Supply: 999</Card.Text>
        <Card.Text>Max Per Wallet: 1</Card.Text>

        <Button
          style={{
            marginLeft: "6px",
            marginRight: "8px",
          }}
          className="btn"
          href="https://goerli.etherscan.io/address/0x875b9c8928015e3943AF25a9b93262a76B080E93#writeContract"
        >
          Check on Etherscan
        </Button>
      </Card>
    </>
  );
}

export default Mint;
