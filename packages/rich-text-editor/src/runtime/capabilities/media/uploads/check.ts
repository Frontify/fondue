/* (c) Copyright Frontify Ltd., all rights reserved. */

import { readImageHeader, svgHoldsScript } from '../imageHeader';

import { MAX_IMAGE_SIDE } from './constants';
import { type Checked, type UploadHost, type UploadRejection } from './types';

/** The file name a slot shows, which a pasted image without one takes from its type. */
export const nameOf = (file: File) => {
    if (file.name !== '') {
        return file.name;
    }
    const subtype = file.type.split('/')[1] ?? 'image';
    return `image.${subtype.split('+')[0] ?? subtype}`;
};

/** Reads the header of `file` and refuses it by size, type or pixels; the file is never decoded. */
export const checkFile = async (
    host: Pick<UploadHost, 'limits' | 'acceptTypes'>,
    file: File,
): Promise<Checked | UploadRejection> => {
    if (file.size > host.limits.maxAssetBytes) {
        return 'size';
    }
    const header = await readImageHeader(file);
    // Only the content names the type, so an HTML file named `photo.png`, or content no reader knows, is refused.
    const type = header.mediaType;
    if (type === null || !host.acceptTypes.includes(type)) {
        return 'type';
    }
    const { width, height } = header;
    if (type === 'image/svg+xml') {
        if (svgHoldsScript(await file.text())) {
            return 'unsafe';
        }
    } else if (width === null || height === null) {
        return 'unreadable';
    } else if (width > MAX_IMAGE_SIDE || height > MAX_IMAGE_SIDE || width * height > host.limits.maxImagePixels) {
        return 'pixels';
    }
    const measured = (value: number | null) => (value === null || value < 1 ? null : value);
    return { file, name: nameOf(file), width: measured(width), height: measured(height) };
};

/** Checks `files`, reading as many headers at a time as uploads run, so a drop of thousands of files holds few reads. */
export const checkFiles = async (
    host: Pick<UploadHost, 'limits' | 'acceptTypes'>,
    files: readonly File[],
): Promise<(Checked | UploadRejection)[]> => {
    const limit = Math.max(1, host.limits.maxConcurrentUploads);
    const checked: (Checked | UploadRejection)[] = [];
    for (let at = 0; at < files.length; at += limit) {
        const batch = files.slice(at, at + limit);
        checked.push(
            ...(await Promise.all(
                batch.map(async (file) => checkFile(host, file).catch((): UploadRejection => 'type')),
            )),
        );
    }
    return checked;
};

/** Splits the checks of `files` into the files that passed and each refusal with its reason. */
export const sortChecked = (files: readonly File[], checked: readonly (Checked | UploadRejection)[]) => {
    const accepted: Checked[] = [];
    const refused: { readonly name: string; readonly reason: UploadRejection }[] = [];
    for (const [index, result] of checked.entries()) {
        if (typeof result === 'string') {
            refused.push({ name: nameOf(files[index] as File), reason: result });
        } else {
            accepted.push(result);
        }
    }
    return { accepted, refused };
};
