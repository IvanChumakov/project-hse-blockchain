from web3 import Web3
from web3.middleware import geth_poa_middleware
from flask import Flask, request

app = Flask(__name__)
node_url = "https://data-seed-prebsc-1-s1.bnbchain.org:8545"

# idx = 0

web3 = Web3(Web3.HTTPProvider(node_url))
web3.middleware_onion.inject(geth_poa_middleware, layer=0)

# Verify if the connection is successful
if web3.is_connected():
    print("-" * 50)
    print("Connection Successful")
    print("-" * 50)
else:
    print("Connection Failed")

############################################################################################

# Initialize the address calling the functions/signing transactions
caller = "0xAd4cFa3d953d56b42e9D358ff575169589828409" # address of metamask wallet
private_key = "53a22c9d376d28b01bc480b98a8ef0d428f458cdd6b2eea0fd05aa089e76a424"  # metamask private key
# nonce = web3.eth.get_transaction_count(caller)

# Initialize contract ABI and address
abi = '[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_from","type":"address"},{"indexed":true,"internalType":"address","name":"_to","type":"address"},{"indexed":false,"internalType":"uint256","name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getMessage","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getUsers","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_userAddress","type":"address"},{"internalType":"string","name":"_name","type":"string"}],"name":"grantAccess","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_newMessage","type":"string"}],"name":"setMessage","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userAccess","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"userList","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userName","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"}]'
contract_address = "0x1742f6408D295E18B1Afa426736e188c9075f7fb" # address of deployed contract
contract = web3.eth.contract(address=contract_address, abi=abi)
chain_id = web3.eth.chain_id

# setMessage(data)
@app.route('/', methods=['POST'])
def set_message():
    # global idx
    data = request.form['param']
    print("Processing...")
    tx_hash = contract.functions.setMessage(data).build_transaction(
        {
            "gasPrice": web3.eth.gas_price,
            "chainId": chain_id,
            "from": caller,
            "nonce": web3.eth.get_transaction_count(
            Web3.to_checksum_address(caller)),
        }
    )
    signed_transaction = web3.eth.account.sign_transaction(tx_hash, private_key = private_key)
    send_tx = web3.eth.send_raw_transaction(signed_transaction.rawTransaction)
    web3.eth.wait_for_transaction_receipt(send_tx)
    # idx += 1
    return "OKAY", 200

# grantAccess(caller, name)
@app.route('/access', methods=["POST"])
def grant_access():
    # global idx
    
    address = request.form['param']
    name = request.form['name']
    address2 = web3.to_checksum_address(address)
    caller = address2
    try:
        tx_hash = contract.functions.grantAccess(caller, name).build_transaction(
            {
                "gasPrice": web3.eth.gas_price,
                "chainId": chain_id,
                "from": caller,
                "nonce": web3.eth.get_transaction_count(
                Web3.to_checksum_address(caller)),
            }
        )
    except BaseException:
        return "Already have access", 400
    signed_transaction = web3.eth.account.sign_transaction(tx_hash, private_key = private_key)
    send_tx = web3.eth.send_raw_transaction(signed_transaction.rawTransaction)
    web3.eth.wait_for_transaction_receipt(send_tx)
    # idx += 1

    return "OKAY", 200

if __name__ == "__main__":
    app.run(debug=True)