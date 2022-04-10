import React, {useEffect, useRef, useState} from 'react';
import {useMutation, useQueryClient} from "react-query";
import {useDebounce} from "../customHooks";
import {addText} from "../apis";
import AddVoiceText from "./AddVoiceText";
import {autoResize, isBlank, translateHelper} from "../utils";
import {Intent, Spinner} from "@blueprintjs/core";
import "./AddText.scss";

const AddText = () => {
    const leftTextArea = useRef(null);
    const rightTextArea = useRef(null);
    const [text, setText] = useState("");
    const debouncedText = useDebounce(text, 500);
    const [translation, setTranslation] = useState("");
    const [translationLoading, setTranslationLoading] = useState(false);

    const queryClient = useQueryClient();

    const mutation = useMutation(addText, {
        onSuccess: () => {
            // refetch texts
            queryClient.invalidateQueries("texts");
        },
    });

    // Only call effect if debounced search term changes
    useEffect(() => {
        if (isBlank(debouncedText)) {
            return;
        }

        // auto resize textareas at text change if height becomes too long
        if (leftTextArea && rightTextArea) {
            autoResize(leftTextArea.current, rightTextArea.current);
        }

        setTranslationLoading(true);

        translateHelper(debouncedText).then(translatedText => {
            setTranslation(translatedText)

            mutation.mutate({
                text: debouncedText,
                translatedText: translatedText
            });

            setTranslationLoading(false);
        })
    }, [debouncedText]);

    return <div className="translate__wrapper">
        <div className="translate__form">
            <textarea
                ref={leftTextArea}
                className="bp4-input bp4-large left__textarea"
                placeholder="Enter a text"
                dir="auto"
                rows={6}
                value={text}
                onChange={e => setText(e.target.value)}>
            </textarea>
            <Spinner
                className={(translationLoading ? "visible" : "")}
                intent={Intent.PRIMARY}
                size={40} />
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
        </div>
        <AddVoiceText setText={setText}/>
    </div>
};

export default AddText;
