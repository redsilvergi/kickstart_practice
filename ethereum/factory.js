import web3 from './web3';
import CampaignFactory from '../ethereum/build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0x68f374Fe5B306dCD5bcCd473dfF15Ae20567Cd42'
);

export default instance;