/* (c) Copyright Frontify Ltd., all rights reserved. */

export const isValidUrl = (url: string): boolean => !!url.match(/^(https?:\/\/|mailto:).+/);
