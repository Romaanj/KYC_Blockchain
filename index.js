const {ethers} = require('ethers');
const provider = new ethers.JsonRpcProvider('https://eth-sepolia.g.alchemy.com/v2/86iLh9daFU35_IDIGlzBJ5brNhu_3ibv');

const signer = ethers.Wallet.createRandom();
const mne = signer.mnemonic.phrase;
console.log(signer.mnemonic.phrase);
const resultArray = mne.split(" ");


// const outputDiv = document.getElementById('output');

// function getRandom(){
//     resultArray.forEach((item) => {
//         const box = document.createElement('div');
//         box.className="box";
//         box.innerHTML = item;
//         outputDiv.appendChild(box);
//     })
// }
// const button = document.getElementById('btn');
// button.addEventListener('click', getRandom);
