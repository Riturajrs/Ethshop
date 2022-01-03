import { useState } from "react";
import { ethers } from "ethers";
import { Form, Input, Label, Button } from "semantic-ui-react";
import ErrorMessage from "./ErrorMessage";
import TxList from "./TxList";
import './checkout.css';

const startPayment = async ({ setError, setTxs, ether, addr}) => {
  try {
    if (!window.ethereum)
      throw new Error("No crypto wallet found. Please install it.");

    await window.ethereum.send("eth_requestAccounts");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    ethers.utils.getAddress(addr);
    const tx = await signer.sendTransaction({
      to: addr,
      value: ethers.utils.parseEther(ether)
    });
    console.log({ ether, addr });
    console.log("tx", tx);
    setTxs([tx]);
  } catch (err) {
    setError(err.message);
  }
};

export default function Checkout() {
  const [error, setError] = useState();
  const [txs, setTxs] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    setError();
    await startPayment({
      setError,
      setTxs,
      ether: data.get("ether"),
      addr: data.get("addr")
    });
  };

  return (
    <div>
        <link
                async
                    rel="stylesheet"
                    href="https://cdn.jsdelivr.net/npm/semantic-ui@2/dist/semantic.min.css"
                />
               
                <Form onSubmit={handleSubmit} className="check-form">
                    <div className='header'>Send ETH Payment</div>
                    <Form.Group widths="equal">
                        <Form.Field>
                            <Label>Recipient Address</Label>
                            <Input
                                type='text'
                                name='addr'
                                placeholder='Address'
                            />
                        </Form.Field>
                        <Form.Field className='price-box'>
                            <Label>Amount in Eth</Label>
                            <Input
                                type='text'
                                name='ether'
                                label='ETH'
                                labelPosition='right'
                                placeholder='Amount'
                            />
                        </Form.Field>
                    </Form.Group>
                    <Button type='submit'>Submit</Button>
                    <div>
                      <ErrorMessage message={error} />
                      <TxList txs={txs} />
                    </div>
                </Form>
            </div>        
  );
}