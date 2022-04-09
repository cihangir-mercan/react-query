import React, {useEffect, useRef, useState} from 'react';
import {useMutation, useQueryClient} from "react-query";
import {addText} from "../apis";
import "./AddText.scss";
import AddVoiceText from "./AddVoiceText";
import {autoResize, isBlank, translateHelper} from "../utils";
import {Button} from "@blueprintjs/core";

const AddText = () => {
    const leftTextArea = useRef(null);
    const rightTextArea = useRef(null);
    const [text, setText] = useState("");
    const [translation, setTranslation] = useState("");
    const [translationLoading, setTranslationLoading] = useState(false);

    const queryClient = useQueryClient();

    const mutation = useMutation(addText, {
        onSuccess: () => {
            // refetch
            queryClient.invalidateQueries("texts");
        },
    });

    useEffect(() => {
        // auto resize textareas at text change
        if (leftTextArea && rightTextArea) {
            autoResize(leftTextArea.current, rightTextArea.current);
        }
    }, [text])

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isBlank(text)) {
            return;
        }

        setTranslationLoading(true)
        translateHelper(text).then(translatedText => {
            setTranslation(translatedText)

            mutation.mutate({text, translatedText});

            setTranslationLoading(false);
        })
    }

    return <div className="translate__wrapper">
        <form className="translate__form" onSubmit={handleSubmit}>
            <textarea
                ref={leftTextArea}
                className="bp4-input bp4-large left__textarea"
                placeholder="Enter a text"
                dir="auto"
                rows={6}
                value={text}
                onChange={e => setText(e.target.value)}>
            </textarea>
            <Button type="submit"
                    icon="translate"
                    large
                    intent="primary"
                    loading={translationLoading}
                    aria-label="Translate"/>
            <textarea
                ref={rightTextArea}
                className="bp4-input bp4-large right__textarea"
                placeholder="Translation"
                dir="auto"
                rows={6}
                value={translation}
                readOnly
                disabled>
            </textarea>
        </form>
        <AddVoiceText setText={setText}/>
    </div>

};

export default AddText;
