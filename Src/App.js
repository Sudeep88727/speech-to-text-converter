import './App.css';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import useClipboard from "react-use-clipboard";
import { useState } from "react";

function App() {

  // For copy text
  const [copyText, setCopyText] = useState();
  const [isCopied, setCopied] = useClipboard(copyText);


  const [display, setdisplay] = useState(true);

  function refreshPage() {
    window.location.reload(false);
  }

  // to convert speech into text
  const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return null
  }

  return (

    <div className="container">

      {/* normal text */}
      <h3>Voice to Text</h3>

      <br />

      <p>Convert voice to text in minutes using our speech recognition software. </p>

      {/* we pass our speaking text to setcopytext then it assign to copytext which will be copied when we press on copy button */}
      <div className='main-content' onClick={() => setCopyText(transcript)}>
        {transcript}
      </div>

      {/* all buttons */}
      <div className='btn-style'>

        {/* when we click on this button text will be copy and iscopied have some value so it show you copied */}
        <button onClick={() => {

          setdisplay(true)
          setCopied()

        }}>
          {display && isCopied ? "Copied!" : "Copy to Clipboard"}
        </button>

        {/* when we click on this button startListening will be called then our voice converted into english language and pass into transcript
        which is shown in main content */}

        <button onClick={() => {
          SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
          setdisplay(false)
        }}>Start Listening</button>

        {/* Listening will be stop when we click on this button */}
        <button onClick={SpeechRecognition.stopListening}>Stop Listening</button>

        {/* clear the input */}
        <button onClick={refreshPage}>Clear</button>

      </div>
    </div>
  );
}
export default App;