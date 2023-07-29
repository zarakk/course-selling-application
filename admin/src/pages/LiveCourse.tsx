import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import { Button, Dialog, DialogContent } from "@mui/material";
import Chat from "../components/Chat";

type Socket = any;
//  SocketIOClient.Socket;

const LiveCourse: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Replace with the URL of your Socket.IO server
    const socket = io("https://your-socket-io-server.com");
    setSocket(socket);

    socket.on("offer", (id: string, description: RTCSessionDescriptionInit) => {
      peerConnection
        .setRemoteDescription(description)
        .then(() => peerConnection.createAnswer())
        .then((sdp) => peerConnection.setLocalDescription(sdp))
        .then(() => {
          socket.emit("answer", id, peerConnection.localDescription);
        });
    });

    socket.on("answer", (description: RTCSessionDescriptionInit) => {
      peerConnection.setRemoteDescription(description);
    });

    socket.on("candidate", (id: string, candidate: RTCIceCandidateInit) => {
      peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  const handleOpen = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: true })
      .then((stream) => {
        setStream(stream);
        setOpen(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClose = () => {
    setOpen(false);
  };

  let peerConnection: RTCPeerConnection;
  const configuration: RTCConfiguration = {
    iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
  };

  const handleGoLive = () => {
    peerConnection = new RTCPeerConnection(configuration);

    if (stream) {
      stream
        .getTracks()
        .forEach((track) => peerConnection.addTrack(track, stream));
    }

    peerConnection.onicecandidate = (event) => {
      if (event.candidate && socket) {
        socket.emit("candidate", event.candidate);
      }
    };

    peerConnection.ontrack = (event) => {
      if (videoRef.current) {
        videoRef.current.srcObject = event.streams[0];
      }
    };

    peerConnection
      .createOffer()
      .then((sdp) => peerConnection.setLocalDescription(sdp))
      .then(() => {
        if (socket && peerConnection.localDescription) {
          socket.emit("offer", peerConnection.localDescription);
        }
      });
  };

  return (
    <>
      <Button variant="contained" onClick={handleOpen}>
        Go Live
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <video ref={videoRef} autoPlay />
          <Button variant="contained" onClick={handleGoLive}>
            Start Streaming
          </Button>
        </DialogContent>
      </Dialog>
      <Chat />
    </>
  );
};

export default LiveCourse;
