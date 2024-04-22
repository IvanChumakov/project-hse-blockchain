//const { eventNames } = require("process")
//const { Web3 } = require("web3")
//import { Web3 } from '../test'
//import Web3 from './web3.min.js';

const web3 = new Web3 ("http://localhost:8545/")
const connectButton = document.getElementById("connect_button")
const sendForm = document.getElementById("send_form")
const sendButton = document.getElementById("send_button")

// connectButton.onclick = connect


async function connect() {
    if (typeof window.ethereum !== "undefined"){
        await window.ethereum.request({method: "eth_requestAccounts"})
        alert("Metamask connected")
    } else {
        alert("Istall metamask")
    }
}

sendButton.addEventListener('click', async (event) => {
    event.preventDefault()

    const formData = new FormData(sendForm)
    const senderAddress = formData.get("sender_address")
    const receiverAddres = formData.get("receiver_address")
    const value = formData.get("amount_of")

    const myAccount = web3.eth.accounts.privateKeyToAccount(senderAddress)
    const txObject = {
        from: myAccount.address,
        to: receiverAddres,
        value: value * Math.pow(10, 18),
        maxPriorityFeePerGas: 10_100,
        maxFeePerGas: 64424547553 * 2,
    }

    async function signAndSend() {
        const signature_object = await myAccount.signTransaction(txObject)
        const txReceipt = await web3.eth.sendSignedTransaction(signature_object.rawTransaction)
        alert("Data sent")
    }
    
    signAndSend()
})
