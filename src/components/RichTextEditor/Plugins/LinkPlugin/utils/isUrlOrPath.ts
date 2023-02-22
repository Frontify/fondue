/* (c) Copyright Frontify Ltd., all rights reserved. */

export const isUrlOrPath = (url: string) => !!url.match(/^(https?:\/\/|\/).*/);
