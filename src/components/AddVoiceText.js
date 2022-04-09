import React, {useEffect, useState} from 'react';
import {Button} from "@blueprintjs/core";
import "./AddVoiceText.scss";

const START_RECORD = "Start Recording";
const STOP_RECORD = "Stop Recording"
const AddVoiceText = ({setText}) => {
    const [listening, setListening] = useState(false);
    const [buttonText, setButtonText] = useState(START_RECORD);
    const [recognition, setRecognition] = useState(null);

    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (typeof SpeechRecognition !== "undefined") {
            const recognition = new SpeechRecognition()

            recognition.continuous = true;
            recognition.interimResults = true;
            recognition.addEventListener("result", onResult);

            setRecognition(recognition);
        } else {
            console.error("speech recognition is not supported")
        }
    }, []);

    const handleClick = () => {
        listening ? stop() : start();
        setListening(!listening);
    }
    const stop = () => {
        recognition.stop();
        setButtonText(START_RECORD);
    };

    const start = () => {
        recognition.start();
        setButtonText(STOP_RECORD);
    };

    const onResult = event => {
        const result = [];
        for (const res of event.results) {
            const text = res[0].transcript;
            result.push(text);
        }
        const str = result.map(s => s.trim()).filter(Boolean).join("\n");
        setText(str);
    };

    return <Button className="record__voice"
                   icon="record"
                   intent="danger"
                   onClick={handleClick}
                   aria-label="Translate"
                   text={buttonText}/>;
}

export default AddVoiceText;