import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import React from "react";
import MicNoneOutlinedIcon from "@material-ui/icons/MicNoneOutlined";
import Button from "@material-ui/core/Button";

export default function SpeechSynthesis() {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <>
      <Button onClick={listen(transcript)}>
        <MicNoneOutlinedIcon />
      </Button>{" "}
      {listening ? "on" : "off"}
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>
      <p>{transcript}</p>
    </>
  );
}
