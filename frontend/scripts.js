//const { param } = require("jquery");

// const { param } = require("jquery");
var web3 = new Web3('https://data-seed-prebsc-1-s1.bnbchain.org:8545');
const w3 = new Web3(window.ethereum);

// var wallet_address = '0xd8e69F1f86CBF4EfaE69bf1166Be5163195Df809'
// var private_key = '0xc7c2a935899060a580556e913ac086fe0cf3c626a739223eb55d56ee871e33e1'

var data = '[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_from","type":"address"},{"indexed":true,"internalType":"address","name":"_to","type":"address"},{"indexed":false,"internalType":"uint256","name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getMessage","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getUsers","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_userAddress","type":"address"},{"internalType":"string","name":"_name","type":"string"}],"name":"grantAccess","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"nameList","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_newMessage","type":"string"}],"name":"setMessage","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userAccess","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"userList","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"}]';
var ABI = JSON.parse(data);
var contract_address = "0xFD457cC83e5d4Cf0e85bE9f37CaC77a5F617d579";
var contract = new web3.eth.Contract(ABI, contract_address);
var contract_2 = new w3.eth.Contract(ABI, contract_address);

const connectButton = document.getElementById("connect_button")
connectButton.onclick = connect
const getButton = document.getElementById("get_button");
getButton.onclick = gett;
const getDevicesButton = document.getElementById("device_button");
getDevicesButton.onclick = getDevices;
const sendForm = document.getElementById("send_form")
const sendButton = document.getElementById("send_button")
const accessForm = document.getElementById("grant_form")
const accessButton = document.getElementById("grant_access")
const walletForm = document.getElementById("wallet_form")
const walletButton = document.getElementById("get_balance")

var account = 'not registered'

async function getDevices() {
    var devices = await contract.methods.getUsers().call()
    for (let i = 0; i < devices.length; ++i) {
        document.getElementById("device_info").innerHTML += devices[i] + "<br />"
    }
}

async function connect() {
    const accounts = await window.ethereum
    .request({ method: "eth_requestAccounts" })
      .catch((err) => {
        if (err.code === 4001) {
          console.log("Please connect to MetaMask.");
        } else {
          console.error(err);
        }
      });
    account = accounts[0];
    connectButton.textContent = "Сonnected " + account
}

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


accessButton.addEventListener('click', async (event) => {
    event.preventDefault()

    const formData = new FormData(accessForm)
    const name = formData.get("name_id")
    var ans = $.ajax({
        type: "POST", 
        url: "http://127.0.0.1:5000/access",
        data: {param: account, name: name},
        dataType: "text",
        error: alert("Error"),
        success: alert("Registered succesfully")

    })
})

walletButton.addEventListener('click', async (event) => {
    event.preventDefault()
    const formData = new FormData(walletForm)
    const id = document.getElementById("id_id").value

    alert(web3.utils.fromWei((await web3.eth.getBalance(id)), "ether"))
})


