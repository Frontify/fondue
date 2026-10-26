/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type TreeNode } from './content';
import { type CodecContext, type JsonObject } from './declarations';
import { diagnostic, type Diagnostic, type RichTextDocument } from './format';
import { isRecord } from './values';

/** The shipped feature whose `figure` holds one `asset_image`. */
export const IMAGE_FEATURE = 'media.image';
export const FIGURE = 'figure';
export const ASSET_IMAGE = 'asset_image';

/**
 * The key under which the session records, on an image a pick or an upload replaced, `{ assetId, focus }`: the asset
 * it set, and whether that was the author's own pick rather than an upload that completed in the background.
 * Public so the shipped features and the core share it.
 */
export const REPLACED_ASSET = 'replaced';

/**
 * An `asset_image` whose upload never finished, by its `nodeId`. A minor release may add `type` values, so handle a type
 * you do not know.
 */
export type UnresolvedAsset = {
    readonly nodeId: string;
    readonly type: 'asset_image';
};

/**
 * Every `asset_image` whose `assetId` is `null`, in document order, so a host can block publishing while a draft with
 * an unfinished upload still saves.
 */
export const findUnresolvedAssets = (document: RichTextDocument): readonly UnresolvedAsset[] => {
    const found: UnresolvedAsset[] = [];
    const pending: unknown[] = [document.content];
    // Walked with a stack, so a document nested past the call stack's depth still reads.
    for (let node = pending.pop(); node !== undefined; node = pending.pop()) {
        if (!isRecord(node)) {
            continue;
        }
        const { attrs } = node;
        if (
            node.type === ASSET_IMAGE &&
            isRecord(attrs) &&
            attrs.assetId === null &&
            typeof attrs.nodeId === 'string'
        ) {
            found.push({ nodeId: attrs.nodeId, type: ASSET_IMAGE });
        }
        if (Array.isArray(node.content)) {
            const children = node.content as readonly unknown[];
            for (let index = children.length - 1; index >= 0; index -= 1) {
                pending.push(children[index]);
            }
        }
    }
    return found;
};

/** Whether a decoded node is a figure, or an image, whose image has no `assetId` yet, which no output publishes. */
export const isUnresolvedImage = (node: TreeNode): boolean => {
    if (node.type === ASSET_IMAGE) {
        return node.attrs?.assetId === null;
    }
    return node.type === FIGURE && (node.content ?? []).some((child) => isUnresolvedImage(child));
};

/** The warning the reader and each codec report once per unfinished image they leave out. */
export const unresolvedAsset = (path: string): Diagnostic => ({
    ...diagnostic('codecs.unresolved-asset', path),
    featureId: IMAGE_FEATURE,
});

/**
 * Whether the reader or a codec leaves out `node`, a figure of `media.image` whose image has no `assetId` yet, which
 * it then reports once, never resolving the image.
 */
export const leavesOutUnresolved = (
    state: { readonly diagnostics: Diagnostic[] },
    featureId: string,
    node: TreeNode,
    path: string,
): boolean => {
    if (featureId !== IMAGE_FEATURE || !isUnresolvedImage(node)) {
        return false;
    }
    state.diagnostics.push(unresolvedAsset(path));
    return true;
};

/**
 * The `alt` an image renders with: empty for a decorative image, its text for a meaningful one, none while missing.
 * Public so the shipped features and the core share it.
 */
export const altOf = (attrs: JsonObject): string | undefined => {
    if (attrs.altIntent === 'decorative') {
        return '';
    }
    if (attrs.altIntent === 'meaningful' && typeof attrs.altText === 'string') {
        return attrs.altText;
    }
    return undefined;
};

/** How the editor, the reader and `toHTML` show one image: the resolved image, or the unavailable placeholder. */
export type ImageOutput =
    | {
          readonly kind: 'image';
          readonly src: string;
          readonly alt: string | undefined;
          /** The intrinsic size, which keeps the box's aspect ratio before the image loads. */
          readonly width: number | undefined;
          readonly height: number | undefined;
          /** `displayWidth` as a CSS width in percent of the content width, or `undefined` at natural size. */
          readonly cssWidth: string | undefined;
          /** The placeholder an image that fails to load shows in its place. */
          readonly unavailable: Unavailable;
      }
    | ({ readonly kind: 'unavailable' } & Unavailable);

/**
 * The "Image unavailable" placeholder: its localized message and the image's `labelSnapshot`, or empty.
 * Public so the shipped features and the core share it.
 */
export type Unavailable = {
    readonly message: string;
    readonly label: string;
};

// A stored size with a longer side more than this many times the shorter reserves no box, which it could make huge.
const MAX_ASPECT = 32;

const sizeOf = (value: unknown): number | undefined => {
    if (typeof value === 'number' && Number.isInteger(value) && value > 0) {
        return value;
    }
    return undefined;
};

/** The `src` of an image from `resolveAssetUrl` after `checkHref`, never from the document, or `undefined`. */
export const imageSource = (attrs: JsonObject, context: CodecContext): string | undefined => {
    const { resolveAssetUrl } = context;
    if (typeof attrs.assetId !== 'string' || resolveAssetUrl === undefined) {
        return undefined;
    }
    const options: { width?: number } = {};
    const width = sizeOf(attrs.width);
    if (width !== undefined) {
        options.width = width;
    }
    const url: unknown = resolveAssetUrl(attrs.assetId, options);
    if (typeof url !== 'string') {
        return undefined;
    }
    const checked = context.checkHref(url);
    if (!checked.ok) {
        return undefined;
    }
    return checked.href;
};

/**
 * The unavailable placeholder of an image, with its `labelSnapshot`.
 * Public so the shipped features and the core share it.
 */
export const unavailableOf = (attrs: JsonObject, context: CodecContext): Unavailable => {
    let label = '';
    if (typeof attrs.labelSnapshot === 'string') {
        label = attrs.labelSnapshot;
    }
    return { message: context.t('RichTextEditor_imageUnavailable'), label };
};

/** The intrinsic size an image's box reserves before it loads, or none for a missing or extreme aspect ratio. */
const reservedSize = (attrs: JsonObject): { readonly width?: number; readonly height?: number } => {
    const width = sizeOf(attrs.width);
    const height = sizeOf(attrs.height);
    if (width === undefined || height === undefined || Math.max(width, height) > Math.min(width, height) * MAX_ASPECT) {
        return {};
    }
    return { width, height };
};

/**
 * One image as every output shows it: the URL `resolveAssetUrl` gives at render time when it passes `checkHref`, else
 * the placeholder. A resolver that throws gives the placeholder for that image only.
 * Public so the shipped features and the core share it.
 */
export const imageOutput = (attrs: JsonObject, context: CodecContext): ImageOutput => {
    const src = imageSource(attrs, context);
    const unavailable = unavailableOf(attrs, context);
    if (src === undefined) {
        return { kind: 'unavailable', ...unavailable };
    }
    let cssWidth: string | undefined;
    const display = sizeOf(attrs.displayWidth);
    if (display !== undefined && display <= 100) {
        cssWidth = `${display}%`;
    }
    const { width, height } = reservedSize(attrs);
    return { kind: 'image', src, alt: altOf(attrs), width, height, cssWidth, unavailable };
};

/**
 * A figure's side as the `text-align` that places its image; `center` unless the stored value is another side.
 * Public so the shipped features and the core share it.
 */
export const figureAlign = (attrs: JsonObject): 'left' | 'center' | 'right' => {
    if (attrs.align === 'left' || attrs.align === 'right') {
        return attrs.align;
    }
    return 'center';
};
