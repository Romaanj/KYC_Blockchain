const video = document.getElementById('video');

Promise.all([
    faceapi.nets.ssdMobilenetv1.loadFromUri('../models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('../models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('../models'),
])
.then(startWebcam)

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

function getLabeledFaceDescriptions() {

    const labels = ["Steven"]

   return Promise.all(
        labels.map(async (label) => {

            const descriptions = []
    
            for (i=1; i<=5; i++){
                const img = await faceapi.fetchImage(`../labels/${label}/${i}.jpg`)
                const detections = await faceapi
                .detectSingleFace(img)
                .withFaceLandmarks()
                .withFaceDescriptor()
                descriptions.push(detections.descriptor)
            }
            console.log(descriptions);
        return new faceapi.LabeledFaceDescriptors(label, descriptions)
    })
);
}

let sameFace = false;
video.addEventListener('play', async () => {
    const labeledFaceDescriptors = await getLabeledFaceDescriptions();
    const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors);
        
    const canvas = faceapi.createCanvasFromMedia(video);
    document.getElementById('webcam').append(canvas);

    const displaySize = { width: video.width, height: video.height };
    faceapi.matchDimensions(canvas, displaySize);

    setInterval(async () => {
        const detections = await faceapi
        .detectAllFaces(video)
        .withFaceLandmarks()
        .withFaceDescriptors();

        const resizedDetections = faceapi.resizeResults(detections, displaySize);

        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);

        const results = resizedDetections.map((d) => {
            return faceMatcher.findBestMatch(d.descriptor);
        });

        results.forEach((result, i) => {
            const box = resizedDetections[i].detection.box;
            const drawBox = new faceapi.draw.DrawBox(box, 
                { label: (1-result.distance).toFixed(2)});
            drawBox.draw(canvas);
            console.log(result);
            if ((1-result.distance) > 0.7 ) {
                sameFace = true;
            }
    }, 100);
})
});
