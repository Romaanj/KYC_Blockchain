let connectedAccount = null;

function connectToMetaMask() {
    // MetaMask가 설치되어 있는지 확인
    if (typeof window.ethereum !== 'undefined') {
      // MetaMask와 연결
      ethereum.request({ method: 'eth_requestAccounts' })
        .then((accounts) => {
          // 연결된 계정 정보를 가져옴
          connectedAccount = accounts[0];
          alert('MetaMask와 연결되었습니다. 연결된 계정!!: ' + connectedAccount);
          // 이후에는 connectedAccount 변수를 사용하여 메타마스크와 상호작용 가능
          displayAccountAddress(connectedAccount);
        })
        .catch((error) => {
          alert('MetaMask 연결에 실패했습니다. 오류: ' + error.message);
        });
    } else {
      alert('MetaMask를 설치하고 브라우저에 활성화해주세요.');
    }
}

function displayAccountAddress(connectedAccount) {
    const accountAddressElement = document.getElementById('metamaskAddress');
    accountAddressElement.textContent = "⭐ "+ connectedAccount +" ⭐";
}

const connectButton = document.getElementById('metamaskAddress');
connectButton.addEventListener('click', connectToMetaMask);

function displaySelectedOption() {
    localStorage.clear();
    const selectedOption = document.getElementById('projectList');
    const selectedOptionText = selectedOption.options[selectedOption.selectedIndex].value;
    localStorage.setItem('selectedOption', selectedOptionText);
}

const projectList = document.getElementById('projectList');
projectList.addEventListener('change', displaySelectedOption);

