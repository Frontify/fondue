/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type JsonObject, type JsonValue } from './declarationValues';
import { type Diagnostic, type RichTextDocument } from './format';
import { type Digit, type Letter } from './types';

/**
 * `Mod`, `Ctrl`, `Alt` and `Shift`, then the key, joined by `-`, such as `Mod-Shift-x`. A binding that starts
 * with `mac:` or `other:` applies only on Apple platforms or only on the others.
 */
export type KeyBinding =
    `${'mac:' | 'other:' | ''}${'Mod-' | ''}${'Ctrl-' | ''}${'Alt-' | ''}${'Shift-' | ''}${BindingKey}`;
type FunctionKey = 'F1' | 'F2' | 'F3' | 'F4' | 'F5' | 'F6' | 'F7' | 'F8' | 'F9' | 'F10' | 'F11' | 'F12';
type BindingKey =
    | Letter
    | Digit
    | FunctionKey
    | '['
    | ']'
    | '\\'
    | '.'
    | ','
    | '-'
    | '='
    | ';'
    | "'"
    | '/'
    | '`'
    | 'ContextMenu'
    | 'Space'
    | 'Enter'
    | 'Escape'
    | 'Tab'
    | 'Backspace'
    | 'Delete'
    | 'Insert'
    | 'Home'
    | 'End'
    | 'PageUp'
    | 'PageDown'
    | 'ArrowUp'
    | 'ArrowDown'
    | 'ArrowLeft'
    | 'ArrowRight';
/** A typing rule that turns text such as `# ` or `**x**` into structure as the user types. */
export type InputRule =
    | {
          id: string;
          kind: 'line-start';
          command: string;
          markers: readonly (string | { marker: string; payload: JsonValue })[];
      }
    | {
          id: string;
          kind: 'mark-delimiter';
          open: string;
          close: string;
          mark: string;
      }
    | {
          id: string;
          kind: 'text-replace';
          find: string;
          replace: string;
          boundary?: 'word';
      }
    | {
          id: string;
          kind: 'quotes';
          marker: '"' | "'";
      }
    /** From `textRule`. */
    | {
          id: string;
          kind: 'text-rule';
          match: RegExp;
          replace: string;
      }
    /** Code features only, from `blockRule`; named groups fill the command's payload fields. */
    | {
          id: string;
          kind: 'block-rule';
          match: RegExp;
          command: string;
      }
    /** Code features only, from `markRule`; named groups fill the mark's attributes. */
    | {
          id: string;
          kind: 'mark-rule';
          match: RegExp;
          mark: string;
          on: readonly ('input' | 'enter')[];
      };
/** A command ID, or a command with the payload a route passes, such as `{ command: 'heading.set', payload: { level: 1 } }`. */
export type CommandRef =
    | string
    | {
          command: string;
          payload?: JsonValue;
          labelKey?: string;
      };
/** One textblock as a decoration source reads it. */
export type DecoratedBlock = {
    nodeId: string | null;
    attrs: JsonObject;
    /** Its text, in which each inline leaf, such as a hard break or a mention, counts as one U+FFFC. */
    text: string;
};
/** A stretch of a block's text, by character offsets, drawn with a class or attributes. */
export type BlockDecoration = {
    from: number;
    to: number;
    className?: string;
    attributes?: Readonly<Record<string, string>>;
};
/** Decorations over each textblock of `nodes`, derived again only for a block that a change touched. */
export type BlockDecorationSource = {
    id: string;
    nodes: readonly string[];
    /** The ranges of `block`, or a promise of them while what the source reads still loads. */
    derive(block: DecoratedBlock): readonly BlockDecoration[] | Promise<readonly BlockDecoration[]>;
};
/** Where a trigger opens a list and what query it takes. */
export type SuggestionRules = {
    /** A word starts at the block start, after white space or a hard break, and with this, after punctuation too; a plain list uses `false`. */
    afterPunctuation: boolean;
    /** The longest query; a longer one closes the list. A plain list uses `32`. */
    maxQuery: number;
    /** Whether the query may hold spaces; a line break always ends it. A plain list uses `false`. */
    spaces: boolean;
    /** The letters the query starts with before the list opens, so a time such as `12:30` opens none. A plain list uses `0`. */
    leadingLetters: number;
    /** The trigger opens only at the start of an empty paragraph, and a query with a space that finds no option closes the list, keeping the text, as the slash menu needs. A plain list omits it. */
    emptyBlock?: boolean;
};
/** One option a suggestion search finds; accepting it runs the list's command with `payload`. */
export type SuggestionResult = {
    /** Unique within one result list, and not empty. */
    key: string;
    label: string;
    /** What the option shows before its label, such as the emoji itself; none for an option with no such text. */
    glyph?: string | null;
    payload: JsonObject;
    /** What the option shows after its label, such as a mention's resource type. */
    detail?: string;
    /** An avatar, which the list shows only as an absolute `https:` URL that passes `checkHref`. */
    imageUrl?: string;
    /** Mention art only: the icon, a person, a group or everyone, that an option with no glyph and no image shows. */
    kind?: 'user' | 'group' | 'everyone';
    /** The heading of the group the option sits under; a list shows the options with one `group` in a run, and none for a list with no groups. */
    group?: string;
};
/** One page of a suggestion search: its options, and the cursor of the next page, `null` after the last. */
export type SuggestionPage = {
    items: readonly SuggestionResult[];
    nextCursor: string | null;
};
/** New `nodeId`s in a migrated document come from `generateId` only. */
export type MigrationContext = {
    generateId: () => string;
};
/** What one migration step returns: the migrated document, or a request for review when content cannot be mapped. */
export type MigrationStepResult =
    | { status: 'migrated'; document: RichTextDocument }
    /**
     * Content the step cannot map without choosing meaning stays as stored, so decode keeps it as
     * islands, except the root, which blocks; `unsupported` means no document of the target version
     * exists for this input. One diagnostic per unmapped node, with its path into the step's output, which
     * names a node position.
     */
    | {
          status: 'requires-review' | 'unsupported';
          document: RichTextDocument;
          diagnostics: readonly Diagnostic[];
      };
/**
 * A pure, synchronous, DOM-free step that upgrades a document from one model version to the next;
 * `id` appears in `MigrationManifest.steps`. It leaves nodes, marks and attributes its source version
 * does not declare unchanged, so it is a no-op on content a newer version wrote.
 */
export type ModelMigration = {
    id: string;
    from: number;
    /** Receives unchecked content: a value in a node or mark position may be any JSON value, `null` included. */
    migrate: (document: RichTextDocument, context: MigrationContext) => MigrationStepResult;
};
/**
 * Code features only. The same kind of step for the content one feature owns, from capability version
 * `from` to `from + 1`. `compileContentModel` installs it in every model that installs the feature, so
 * profile and host models register nothing; decode runs it for a document whose `requiredCapabilities`
 * record an older version of that capability.
 */
export type CapabilityMigration = {
    id: string;
    from: number;
    /** Receives unchecked content: a value in a node or mark position may be any JSON value, `null` included. */
    migrate: (document: RichTextDocument, context: MigrationContext) => MigrationStepResult;
};
