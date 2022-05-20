/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Flyout } from "@components/Flyout";
import { PlateRenderElementProps, useEditableProps } from "@udecode/plate";
import React, { FC, MutableRefObject, useState } from "react";
import { IconPen, IconTrash } from "../../..";
import { EditLinkChooserButton } from "../plugins/linkChooserPlugin/ui/EditLinkChooserButton";
import { RemoveLinkChooserButton } from "../plugins/linkChooserPlugin/ui/RemoveLinkChooserButton copy";

export const ChosenLinkElement: FC<PlateRenderElementProps> = (props) => {
    const { attributes, children, element, editor } = props;

    const { chosenLink } = element;

    const [isPreviewFlyoutOpen, setIsPreviewFlyoutOpen] = useState<boolean>(false);

    const isReadOnly = useEditableProps(editor).readOnly;

    const getHref = () => {
        return chosenLink ? (chosenLink.searchResult ? element.chosenLink.searchResult.link : "") : "";
    };

    const getTarget = () => {
        const TARGET_DEFAULT = "_self";
        const TARGET_BLANK = "_blank";
        return chosenLink ? (chosenLink.openInNewTab ? TARGET_BLANK : TARGET_DEFAULT) : TARGET_DEFAULT;
    };

    return (
        <>
            {isReadOnly ? (
                <a
                    data-chosen-link={JSON.stringify(chosenLink)}
                    href={getHref()}
                    target={getTarget()}
                    rel="noreferrer"
                    className={"tw-text-violet-70 tw-underline tw-cursor-pointer"}
                >
                    {children}
                </a>
            ) : (
                <Flyout
                    isOpen={isPreviewFlyoutOpen}
                    onOpenChange={setIsPreviewFlyoutOpen}
                    onCancel={() => setIsPreviewFlyoutOpen(false)}
                    trigger={({ "aria-label": ariaLabel }, ref: MutableRefObject<HTMLAnchorElement>) => (
                        <a
                            ref={ref}
                            aria-label={ariaLabel}
                            onClick={() => {
                                setTimeout(() => {
                                    setIsPreviewFlyoutOpen(true);
                                }, 100);
                            }}
                            data-chosen-link={JSON.stringify(chosenLink)}
                            href={getHref()}
                            target={getTarget()}
                            rel="noreferrer"
                            className={"tw-text-violet-70 tw-underline tw-cursor-pointer"}
                        >
                            {children}
                        </a>
                    )}
                    legacyFooter={false}
                >
                    <span className="tw-flex tw-justify-between tw-gap-y-8 tw-p-8">
                        <span className="tw-text-violet-70">{getHref()}</span>
                        <span className="tw-flex">
                            <EditLinkChooserButton icon={<IconPen />} />
                            <RemoveLinkChooserButton editor={editor} icon={<IconTrash />} />
                        </span>
                    </span>
                </Flyout>
            )}
        </>
    );
};
