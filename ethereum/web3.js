import Web3 from 'web3';

let web3;

if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
    window.ethereum.request({ method: 'eth_requestAccounts' });
    web3 = new Web3(window.ethereum);
} else {
    const provider = new Web3.providers.HttpProvider(
        "https://goerli.infura.io/v3/448b063aa3fd4bac96ce2d114f8b8530"
    );
    web3 = new Web3(provider);
}

export default web3;