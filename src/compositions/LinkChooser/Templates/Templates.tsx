import React, { Key } from "react";
import { FC } from "react";
import IconArrowLeft from "@elements/Icon/Generated/IconArrowLeft";
import { OpenWindowType } from "../LinkChooser.stories";

export type Template = {
    id: Key;
    preview: string;
    title: string;
    subtitle?: string;
};

interface TemplatesProps {
    templates: Template[];
    onClick: (window: OpenWindowType) => void;
    onSelect: (key: Key) => void;
}

export const Templates: FC<TemplatesProps> = ({ templates, onClick, onSelect }) => {
    return (
        <div className="tw-bg-white tw-py-2">
            <button className="tw-flex tw-px-5 tw-mt-4 tw-mb-5" onClick={() => onClick(OpenWindowType.None)}>
                <IconArrowLeft />
                <p className="tw-ml-2 tw-text-black-80">Templates</p>
            </button>
            <div>
                {templates.map((template) => (
                    <div
                        key={template.title}
                        className="hover:tw-bg-black-0 tw-cursor-pointer"
                        onClick={() => onSelect(template.id)}
                        onKeyDown={() => onSelect(template.id)}
                        role="presentation"
                    >
                        <div className="tw-flex tw-px-5 tw-py-1.5">
                            <div className="tw-flex tw-flex-shrink-0 tw-w-[75px] tw-h-[75px] tw-max-w-xs tw-bg-black-0 tw-border-black-10 tw-border tw-rounded">
                                <img
                                    className="tw-w-full tw-object-contain"
                                    src={template.preview}
                                    alt="Man looking at item at a store"
                                />
                            </div>
                            <div className="tw-flex tw-flex-col tw-justify-center tw-ml-4">
                                <p className="tw-block tw-text-lg tw-leading-tight tw-hover:underline tw-text-black-80">
                                    {template.title}
                                </p>
                                <p className="tw-text-[12px] tw-text-black-80">{template.subtitle}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
