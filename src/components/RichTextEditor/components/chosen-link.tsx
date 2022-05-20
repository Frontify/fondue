/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Flyout } from "@components/Flyout";
import { PlateRenderElementProps, useEditableProps } from "@udecode/plate";
import React, { FC, useState } from "react";
import { IconPen, IconReject } from "../../..";
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
            <a
                onMouseDown={() => {
                    if (isReadOnly) {
                        return;
                    }
                    setTimeout(() => {
                        setIsPreviewFlyoutOpen(true);
                    }, 100);
                }}
                data-chosen-link={JSON.stringify(chosenLink)}
                href={getHref()}
                target={getTarget()}
                rel="noreferrer"
                className={"tw-text-violet-70 tw-underline tw-cursor-pointer"}
                {...attributes}
            >
                {children}
            </a>
            {!isReadOnly && (
                <Flyout
                    isOpen={isPreviewFlyoutOpen}
                    onOpenChange={setIsPreviewFlyoutOpen}
                    onCancel={() => setIsPreviewFlyoutOpen(false)}
                    trigger={undefined}
                    legacyFooter={false}
                >
                    <div className="tw-flex tw-justify-between tw-gap-y-8 tw-p-8">
                        <div className="tw-text-violet-70">{getHref()}</div>
                        <div className="tw-flex">
                            <EditLinkChooserButton icon={<IconPen />} />
                            <RemoveLinkChooserButton editor={editor} icon={<IconReject />} />
                        </div>
                    </div>
                </Flyout>
            )}
        </>
    );
};
