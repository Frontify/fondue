import { assign } from "@xstate/immer";
import { DoneInvokeEvent } from "xstate";
import { LinkChooserContext } from "./machine";

export const setOpenInNewTab = assign<LinkChooserContext, DoneInvokeEvent<LinkChooserContext>>((context, { data }) => {
    context.openInNewTab = data.openInNewTab;
});

export const updateQuery = assign<LinkChooserContext, DoneInvokeEvent<LinkChooserContext>>((context, { data }) => {
    context.query = data.query;
});

export const setSelectedResult = assign<LinkChooserContext, DoneInvokeEvent<LinkChooserContext>>(
    (context, { data }) => {
        //TODO: Ask Marco why
        context.selectedResult = data.selectedResult;
        // should query be mutated here?
        context.query = data.selectedResult?.title;
    },
);

export const clearSelectedResult = assign<LinkChooserContext, DoneInvokeEvent<LinkChooserContext>>((context) => {
    //TODO: Ask Marco why
    context.selectedResult = null;
    // should query be mutated here?
    context.query = "";
});

export const openPreview = ({ selectedResult }: LinkChooserContext): void => {
    selectedResult?.link && window.open(selectedResult.link, "_blank");
};
