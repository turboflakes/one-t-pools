import iconPolkadotSVG from '../assets/polkadot_icon.svg';
import logoPolkadotSVG from '../assets/polkadot_logotype_white.svg';
import iconKusamaSVG from '../assets/kusama_icon.svg';
import logoKusamaSVG from '../assets/kusama_logo.svg';
import iconWestendSVG from '../assets/westend_icon.svg';
import logoWestendSVG from '../assets/westend_icon.svg'; 

// Define Network settings
const networkSettings = {
  polkadot: {
    name: "Polkadot",
    endpoint: process.env.REACT_APP_POLKADOT_API_ENDPOINT,
    externalWSS: "wss://rpc.polkadot.io",
    icon: iconPolkadotSVG,
    logo: logoPolkadotSVG,
    url: "https://polkadot.network",
    maxValidators: 16,
  },
  kusama: {
    name: "Kusama",
    endpoint: process.env.REACT_APP_KUSAMA_API_ENDPOINT,
    externalWSS: "wss://kusama-rpc.polkadot.io",
    icon: iconKusamaSVG,
    logo: logoKusamaSVG,
    url: "https://kusama.network",
    maxValidators: 24,
  },
  westend: {
    name: "Westend",
    endpoint: process.env.REACT_APP_WESTEND_API_ENDPOINT,
    externalWSS: "wss://westend-rpc.polkadot.io",
    icon: iconWestendSVG,
    logo: logoWestendSVG,
    url: "https://polkadot.network",
    maxValidators: 16,
  }
}
export const getNetworks = () => Object.keys(networkSettings)
export const getNetworkName = (network) => networkSettings[network].name
export const getNetworkHost = (network) => networkSettings[network].endpoint
// Useful to open https://polkadot.js.org/apps/ with the right network
export const getNetworkWSS = (network) => networkSettings[network].externalWSS
export const getNetworkIcon = (network) => networkSettings[network].icon
export const getNetworkLogo = (network) => networkSettings[network].logo
export const getNetworkURL = (network) => networkSettings[network].url
// Useful for the leaderboard tabs selection
export const getNetworkIndex = (network) => Object.keys(networkSettings).findIndex(n => n === network)
export const getNetworkKey = (index) => Object.keys(networkSettings)[index]
export const isNetworkSupported = (network) => Object.keys(networkSettings).includes(network)


export const WEIGHTS = [7,8,6,9,6,4,3,7,8,5]
export const LIMITS = ["0:0","0:0","0:0","0:0","0:0","0:0","0:0","0:0","0:0","0:0"]
export const COMMISSION_PLANCK = 1000000000
