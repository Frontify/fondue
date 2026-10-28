/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Dropdown } from '@frontify/fondue-components';

import { type EditorApi } from '#/bridge/pluginApi/plugin';
import { type ColorToken } from '#/model';

import { type ColorMark, SET_COMMANDS } from '../helpers/colorMenuModel';

import { ColorRow } from './ColorRow';

export type SwatchGroupProps = {
    api: EditorApi;
    mark: ColorMark;
    heading: string;
    custom: string;
    tokens: readonly ColorToken[];
    literalMarks: readonly ColorMark[];
    run: (command: string, payload?: object) => void;
    onCustom: (mark: ColorMark) => void;
};

/** One mark's swatches: its tokens, then the custom colour when the mark takes one. */
export const SwatchGroup = ({ api, mark, heading, custom, tokens, literalMarks, run, onCustom }: SwatchGroupProps) => {
    // The literal colour that the whole selection holds, which checks the custom row.
    let literal: string | undefined;
    const takesLiteral = literalMarks.includes(mark);
    const value = api.marks.attrs(mark)?.value;
    if (takesLiteral && typeof value === 'string' && api.marks.active(mark, { value }) === true) {
        literal = value;
    }

    return (
        <Dropdown.Group heading={heading}>
            {tokens
                .filter((token) => token.usage.includes(mark))
                .map((token) => (
                    <ColorRow
                        key={token.id}
                        label={token.label}
                        description={token.value}
                        color={token.value}
                        checked={api.marks.active(mark, { tokenId: token.id }) === true}
                        onSelect={() => run(SET_COMMANDS[mark], { tokenId: token.id })}
                    />
                ))}
            {takesLiteral && (
                <ColorRow
                    label={custom}
                    description={literal}
                    color={literal}
                    checked={literal !== undefined}
                    onSelect={(event) => {
                        event.preventDefault();
                        onCustom(mark);
                    }}
                />
            )}
        </Dropdown.Group>
    );
};

SwatchGroup.displayName = 'SwatchGroup';
