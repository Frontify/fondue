/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type RefObject } from 'react';

import { SEVERITIES, SEVERITY_ICONS } from '../helpers/issueDisplay';

export type SeverityMarksProps = {
    iconsRef: RefObject<HTMLSpanElement>;
};

/** The icons the surface decorations copy. */
export const SeverityMarks = ({ iconsRef }: SeverityMarksProps) => (
    <span ref={iconsRef} hidden>
        {SEVERITIES.map((severity) => {
            const Icon = SEVERITY_ICONS[severity];

            return (
                <span key={severity} data-severity={severity}>
                    <Icon size={16} />
                </span>
            );
        })}
    </span>
);

SeverityMarks.displayName = 'SeverityMarks';
