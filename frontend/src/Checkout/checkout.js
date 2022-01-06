import { ethers } from 'ethers'
import './checkout.css'

const startPayment = async ({ether, addr}) => {
  try {
    if (!window.ethereum)
      throw new Error('No crypto wallet found. Please install it.')

    await window.ethereum.send('eth_requestAccounts')
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    ethers.utils.getAddress(addr)
    ether = parseFloat(ether/1000000);
    ether = ether.toString();
    try {
      const tx = await signer.sendTransaction({
        to: addr,
        value: ethers.utils.parseEther(ether)
      })
    } catch (err) {
      console.log(err)
    }
  } catch (err) {
    console.log(err.message)
  }
}

export default startPayment;
