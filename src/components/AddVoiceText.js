import React, {useEffect, useRef, useState} from 'react';
import {Button} from "@blueprintjs/core";
import "./AddVoiceText.scss";

const AddVoiceText = ({setText}) => {
    const [listening, setListening] = useState(false);
    const [buttonText, setButtonText] = useState("Start recording");
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
        setButtonText("Start recording");
    };

    const start = () => {
        recognition.start();
        setButtonText("Stop recording");
    };

    const onResult = event => {
        const result = [];
        for (const res of event.results) {
            const text = res[0].transcript;
            let isFinal = false;
            if (res.isFinal) {
                isFinal = true;
            }

            result.push({
                text: text,
                isFinal
            });
        }

        const str = result.map(function(elem){
            return elem.text.trim();
        }).join("\n");
        setText(str);
    };

    return <>
        <Button className="record__voice"
                icon="record"
                intent="danger"
                onClick={handleClick}
                aria-label="Translate"
                text={buttonText} />
    </>;
}

export default AddVoiceText;