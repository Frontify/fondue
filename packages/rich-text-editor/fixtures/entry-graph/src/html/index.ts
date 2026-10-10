import { kit } from 'editor-kit';
import { Schema } from 'prosemirror-model';
import { createElement } from 'react';

import { session } from '#/runtime/session';

export const fromHTML = { Schema, kit, createElement, session };
