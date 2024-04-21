const connectButton = document.getElementById("connect_button")
connectButton.onclick = connect


async function connect() {
    if (typeof window.ethereum !== "undefined"){
        await window.ethereum.request({method: "eth_requestAccounts"})
        console.log("Metamask connected")
    } else {
        console.lod("Istall metamask")
    }
}