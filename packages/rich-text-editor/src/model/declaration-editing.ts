/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type JsonObject, type JsonValue } from './declaration-values';
import { type Diagnostic, type RichTextDocument } from './format';

/**
 * `Mod`, `Ctrl`, `Alt` and `Shift`, then the key, joined by `-`, such as `Mod-Shift-x`. A binding that starts
 * with `mac:` or `other:` applies only on Apple platforms or only on the others.
 */
export type KeyBinding = string;
/** A typing rule that turns text such as `# ` or `**x**` into structure as the user types. */
export type InputRule =
    | {
          readonly id: string;
          readonly kind: 'line-start';
          readonly command: string;
          readonly markers: readonly (string | { readonly marker: string; readonly payload: JsonValue })[];
      }
    | {
          readonly id: string;
          readonly kind: 'mark-delimiter';
          readonly open: string;
          readonly close: string;
          readonly mark: string;
      }
    | {
          readonly id: string;
          readonly kind: 'text-replace';
          readonly find: string;
          readonly replace: string;
          readonly boundary?: 'word';
      }
    | { readonly id: string; readonly kind: 'quotes'; readonly marker: '"' | "'" }
    /** From `textRule`. */
    | { readonly id: string; readonly kind: 'text-rule'; readonly match: RegExp; readonly replace: string }
    /** Code features only, from `blockRule`; named groups fill the command's payload fields. */
    | { readonly id: string; readonly kind: 'block-rule'; readonly match: RegExp; readonly command: string }
    /** Code features only, from `markRule`; named groups fill the mark's attributes. */
    | {
          readonly id: string;
          readonly kind: 'mark-rule';
          readonly match: RegExp;
          readonly mark: string;
          readonly on: readonly ('input' | 'enter')[];
      };
/** A command ID, or a command with the payload a route passes, such as `{ command: 'heading.set', payload: { level: 1 } }`. */
export type CommandRef =
    | string
    | { readonly command: string; readonly payload?: JsonValue; readonly labelKey?: string };
/** One textblock as a decoration source reads it. */
export interface DecoratedBlock {
    readonly nodeId: string | null;
    readonly attrs: JsonObject;
    /** Its text, in which each inline leaf, such as a hard break or a mention, counts as one U+FFFC. */
    readonly text: string;
}
/** A stretch of a block's text, by character offsets, drawn with a class or attributes. */
export interface BlockDecoration {
    readonly from: number;
    readonly to: number;
    readonly className?: string;
    readonly attributes?: Readonly<Record<string, string>>;
}
/** Decorations over each textblock of `nodes`, derived again only for a block that a change touched. */
export interface BlockDecorationSource {
    readonly id: string;
    readonly nodes: readonly string[];
    /** The ranges of `block`, or a promise of them while what the source reads still loads. */
    derive(block: DecoratedBlock): readonly BlockDecoration[] | Promise<readonly BlockDecoration[]>;
}
/** Where a trigger opens a list and what query it takes. */
export interface SuggestionRules {
    /** A word starts at the block start, after white space or a hard break, and with this, after punctuation too; a plain list uses `false`. */
    readonly afterPunctuation: boolean;
    /** The longest query; a longer one closes the list. A plain list uses `32`. */
    readonly maxQuery: number;
    /** Whether the query may hold spaces; a line break always ends it. A plain list uses `false`. */
    readonly spaces: boolean;
    /** The letters the query starts with before the list opens, so a time such as `12:30` opens none. A plain list uses `0`. */
    readonly leadingLetters: number;
}
/** One option a suggestion search finds; accepting it runs the list's command with `payload`. */
export interface SuggestionResult {
    /** Unique within one result list, and not empty. */
    readonly key: string;
    readonly label: string;
    /** What the option shows before its label, such as the emoji itself; none for an option with no such text. */
    readonly glyph?: string | null;
    readonly payload: JsonObject;
    /** What the option shows after its label, such as a mention's resource type. */
    readonly detail?: string;
    /** An avatar, which the list shows only as an absolute `https:` URL that passes `checkHref`. */
    readonly imageUrl?: string;
    /** Mention art only: the icon, a person, a group or everyone, that an option with no glyph and no image shows. */
    readonly kind?: 'user' | 'group' | 'everyone';
}
/** One page of a suggestion search: its options, and the cursor of the next page, `null` after the last. */
export interface SuggestionPage {
    readonly items: readonly SuggestionResult[];
    readonly nextCursor: string | null;
}
/** New `nodeId`s in a migrated document come from `generateId` only. */
export interface MigrationContext {
    readonly generateId: () => string;
}
/** What one migration step returns: the migrated document, or a request for review when content cannot be mapped. */
export type MigrationStepResult =
    | { readonly status: 'migrated'; readonly document: RichTextDocument }
    /**
     * Content the step cannot map without choosing meaning stays as stored, so decode keeps it as
     * islands, except the root, which blocks; `unsupported` means no document of the target version
     * exists for this input. One diagnostic per unmapped node, with its path into the step's output, which
     * names a node position.
     */
    | {
          readonly status: 'requires-review' | 'unsupported';
          readonly document: RichTextDocument;
          readonly diagnostics: readonly Diagnostic[];
      };
/**
 * A pure, synchronous, DOM-free step that upgrades a document from one model version to the next;
 * `id` appears in `MigrationManifest.steps`. It leaves nodes, marks and attributes its source version
 * does not declare unchanged, so it is a no-op on content a newer version wrote.
 */
export interface ModelMigration {
    readonly id: string;
    readonly from: number;
    /** Receives unchecked content: a value in a node or mark position may be any JSON value, `null` included. */
    readonly migrate: (document: RichTextDocument, context: MigrationContext) => MigrationStepResult;
}
/**
 * Code features only. The same kind of step for the content one feature owns, from capability version
 * `from` to `from + 1`. `compileContentModel` installs it in every model that installs the feature, so
 * profile and host models register nothing; decode runs it for a document whose `requiredCapabilities`
 * record an older version of that capability.
 */
export interface CapabilityMigration {
    readonly id: string;
    readonly from: number;
    /** Receives unchecked content: a value in a node or mark position may be any JSON value, `null` included. */
    readonly migrate: (document: RichTextDocument, context: MigrationContext) => MigrationStepResult;
}
