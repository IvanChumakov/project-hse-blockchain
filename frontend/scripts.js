// const { param } = require("jquery");

var web3 = new Web3('https://data-seed-prebsc-1-s1.bnbchain.org:8545');
const w3 = new Web3(window.ethereum);

var wallet_address = '0xA9Bd88507AcD014843c8A858ffc5fdec684E5cA8'
var private_key = '0xf8a730a38bea06e6bd524d76cf103e1c24c1713cf8b66ef8d91f3752205a2780'

var data = '[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_from","type":"address"},{"indexed":true,"internalType":"address","name":"_to","type":"address"},{"indexed":false,"internalType":"uint256","name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getMessage","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_newMessage","type":"string"}],"name":"setMessage","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[],"stateMutability":"nonpayable","type":"function"}]';
var ABI = JSON.parse(data);
var contract_address = "0x1b6F9647fec759E6B83717936e375a96BF965281";
var contract = new web3.eth.Contract(ABI, contract_address);
var contract_2 = new w3.eth.Contract(ABI, contract_address);

const connectButton = document.getElementById("connect_button")
connectButton.onclick = connect
const getButton = document.getElementById("get_button");
getButton.onclick = gett;
const sendForm = document.getElementById("send_form")
const sendButton = document.getElementById("send_button")



async function connect() {
    if (typeof window.ethereum !== "undefined"){
        const connectButton = document.getElementById("connect_button")
        await window.ethereum.request({method: "eth_requestAccounts"})
        connectButton.textContent = "Metamask connected"
        //alert("Metamask connected")
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

async function gett() {
    document.getElementById("info").innerHTML = await contract.methods.getMessage().call()
}

function my_func() {
    $.ajax({
        type: "POST",
        url:"http://127.0.0.1:5000/",

        data: {param: "test"}
    })
}

function my_func2() {
    $.ajax({
        type: "POST",
        url:"http://127.0.0.1:5000",

        data: {param: "aboba"}
    })
}