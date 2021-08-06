import React, { ReactElement, useState, MouseEvent, useRef } from "react";
import { EditorState, RichUtils } from "draft-js";
import { InlineToolbarChildrenProps } from "./InlineToolbar";

type LinkChooserProps = {
    onConfirm: () => void;
};

export const LinkChooser = ({
    setEditorState,
    editorState,
    savedSelection,
    onConfirm,
}: InlineToolbarChildrenProps & LinkChooserProps): ReactElement<InlineToolbarChildrenProps> => {
    const [url, setUrl] = useState("");
    const [newTab, setNewTab] = useState(false);

    const setSelectionAsLink = (event: MouseEvent) => {
        event.preventDefault();

        if (savedSelection) {
            const editorStateWithSelection = EditorState.forceSelection(editorState, savedSelection);

            const contentState = editorStateWithSelection.getCurrentContent();
            const contentStateWithEntity = contentState.createEntity("LINK", "MUTABLE", { url, newTab });
            const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
            const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });

            setEditorState(RichUtils.toggleLink(newEditorState, newEditorState.getSelection(), entityKey));

            onConfirm();
        }
    };

    const preventBubblingUp = (event: MouseEvent): void => {
        event.preventDefault();
    };

    const urlInput = useRef<HTMLInputElement | null>(null);

    return (
        <>
            <p>Link Chooser</p>
            <br />
            <input
                type="url"
                ref={urlInput}
                onInput={(event) => setUrl((event.target as HTMLInputElement).value)}
                onMouseDown={(event) => event.stopPropagation()}
            />
            <br />
            <input
                type="checkbox"
                onChange={(event) => setNewTab((event.target as HTMLInputElement).checked)}
                onMouseDown={preventBubblingUp}
            />
            <br />
            <button onClick={setSelectionAsLink} onMouseDown={preventBubblingUp}>
                Ok
            </button>
        </>
    );
};
