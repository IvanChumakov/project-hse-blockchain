from web3 import Web3
from web3.middleware import geth_poa_middleware

# Initialize endpoint URL
node_url = "https://data-seed-prebsc-1-s1.bnbchain.org:8545"

# Create the node connection
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
caller = "0xA9Bd88507AcD014843c8A858ffc5fdec684E5cA8" # address of wallet
private_key = "f8a730a38bea06e6bd524d76cf103e1c24c1713cf8b66ef8d91f3752205a2780"  # metamask private key

# Initialize address nonce
nonce = web3.eth.get_transaction_count(caller)

# Initialize contract ABI and address
abi = '[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_from","type":"address"},{"indexed":true,"internalType":"address","name":"_to","type":"address"},{"indexed":false,"internalType":"uint256","name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getMessage","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_newMessage","type":"string"}],"name":"setMessage","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[],"stateMutability":"nonpayable","type":"function"}]'

contract_address = "0x1b6F9647fec759E6B83717936e375a96BF965281"

# Create smart contract instance
contract = web3.eth.contract(address=contract_address, abi=abi)

result = contract.functions.getMessage().call()
print(result)

############################################################################################

# initialize the chain id, we need it to build the transaction for replay protection
Chain_id = web3.eth.chain_id
print("Processing...")
# Call your function
tx_hash = contract.functions.setMessage("New message").build_transaction(
    {
        "gasPrice": web3.eth.gas_price,
        "chainId": 97,
        "from": caller,
        "nonce": nonce
    }
)
signed_transaction = web3.eth.account.sign_transaction(tx_hash, private_key = private_key)
send_tx = web3.eth.send_raw_transaction(signed_transaction.rawTransaction)
web3.eth.wait_for_transaction_receipt(send_tx)

print(contract.functions.getMessage().call())