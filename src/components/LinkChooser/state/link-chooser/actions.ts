import { assign } from "@xstate/immer";
import { DoneInvokeEvent } from "xstate";
import { LinkChooserContext } from "./machine";

export const setOpenInNewTab = assign<LinkChooserContext, DoneInvokeEvent<LinkChooserContext>>((context, { data }) => {
    context.openInNewTab = data.openInNewTab;
});

export const setSelectedResult = assign<LinkChooserContext, DoneInvokeEvent<LinkChooserContext>>(
    (context, { data }) => {
        //TODO: Ask Marco why
        context.selectedResult = data.selectedResult;
    },
);

export const openPreview = ({ selectedResult }: LinkChooserContext): void => {
    selectedResult?.link && window.open(selectedResult.link, "_blank");
};
