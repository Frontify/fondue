import { kit } from 'editor-kit';
import { Schema } from 'prosemirror-model';
import { EditorState } from 'prosemirror-state';
import { createElement } from 'react';
import { createPortal } from 'react-dom';
import { stateKit } from 'state-kit';

import { bridge } from '#/bridge/session';
import { view } from '#/react/view';
import { session } from '#/runtime/session';
import { panel } from '#/ui/panel';

export const fromHTML = {
    Schema,
    kit,
    stateKit,
    EditorState,
    createElement,
    createPortal,
    session,
    bridge,
    view,
    panel,
};
