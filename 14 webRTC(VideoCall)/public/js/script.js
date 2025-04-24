const socket = io();
let local;
let remote;
let peerConnection;
const rtcSettings = {
    iceServers : [{ urls: "stun:stun.l.google.com.19302" }],
}

const initialize = async() => {
    socket.on("signalingMessage",handleSignalingMessage)
    local =await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true
    }).catch(err => {
        console.error("Error accessing media devices: ", err);
      });
    initiateOffer();
};

const initiateOffer = async () => {
    await createPeerConnection();
    const offer = await peerConnection.createOffer()
    await peerConnection.setLocalDescription(offer)
    socket.emit("signalingMessage",JSON.stringify({type:"offer",offer}))
}

const createPeerConnection = async () => {
    peerConnection = new RTCPeerConnection(rtcSettings);
    remote = new MediaStream();
    document.querySelector("#remoteVideo").srcObject = remote;
    document.querySelector("#localVideo").srcObject = local;

    document.querySelector("#remoteVideo").style.display = "block";
    document.querySelector("#localVideo").classList.add("smallFrame");
  
    local.getTracks().forEach((track) => {
      peerConnection.addTrack(track, local); // fixed here
    });
  
    peerConnection.ontrack = (event) => {
      event.streams[0].getTracks().forEach((track) => remote.addTrack(track));
    };
  
    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("signalingMessage", JSON.stringify({ type: "candidate", candidate: event.candidate }));
      }
    };
  };
  

const handleSignalingMessage = async (message) => {
const {type , offer , answer , candidate} = JSON.parse(message)
if (type === "offer") handleOffer(offer)
if (type === "answer") handleAnswer(answer)
if (type === "candidate" && peerConnection ){
    peerConnection.addIceCandidate(candidate)
}
}

const handleOffer = async (offer) => {
    await createPeerConnection()
    await peerConnection.setRemoteDescription(offer)

    let answer = await peerConnection.createAnswer()
    await peerConnection.setLocalDescription(answer)
    socket.emit ("signalingMessage" , JSON.stringify({type:"answer", answer}))
}

const handleAnswer = async (answer) => {
   if(!peerConnection.currentRemoteDescription){
    peerConnection.setRemoteDescription(answer)
   }
}

window.addEventListener("beforeunload",()=>socket.disconnect())

initialize()