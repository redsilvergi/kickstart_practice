const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/CampaignFactory.json');

const provider = new HDWalletProvider(
    'series quality couple cliff spy vehicle south desk spring crack urban correct',
    'https://goerli.infura.io/v3/448b063aa3fd4bac96ce2d114f8b8530'
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from account', accounts[1]);

    const result = await new web3.eth.Contract(
        JSON.parse(compiledFactory.interface)
    )
        .deploy({ data: compiledFactory.bytecode })
        .send({ from: accounts[1], gas: '1000000' });

    console.log('Contract deployed to', result.options.address);
    provider.engine.stop();
}
deploy();