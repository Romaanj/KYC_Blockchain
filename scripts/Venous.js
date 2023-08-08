const video = document.getElementById('video');

const project = document.getElementById('selectedProject');
project.innerHTML = project.innerHTML + "- " + localStorage.getItem("project");

function startWebcam() {
    navigator.mediaDevices.getUserMedia({ 
        video: true,
        audio : false,
    })
    .then(stream => {
        video.srcObject = stream;
    })
    .catch(err => {
        console.error(err);
    });
}

startWebcam();

function showButton() {
    const conditionalButtonContainer = document.getElementById("conditionalButtonContainer");
    const button = document.createElement("button");
    button.id = "conditionalButton";
    button.textContent = "Verification Success!!";
    conditionalButtonContainer.appendChild(button);
}


const interval = 10000; // 1초마다 조건을 평가합니다.
setTimeout(showButton, interval);
