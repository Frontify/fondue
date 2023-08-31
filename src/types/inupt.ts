/* (c) Copyright Frontify Ltd., all rights reserved. */

import { InputHTMLAttributes, ReactElement } from 'react';

export type InputBaseProps = {
    decorator?: ReactElement;
    error?: boolean;
    errorText?: string;
    helperText?: string;
    onChange?: (value: string) => void;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'className' | 'onChange'>;

export enum InputTypes {
    Button = 'button',
    Checkbox = 'checkbox',
    Color = 'color',
    Date = 'date',
    Datetime_Local = 'datetime-local',
    Email = 'email',
    File = 'file',
    Hidden = 'hidden',
    Image = 'image',
    Month = 'month',
    Number = 'number',
    Password = 'password',
    Radio = 'radio',
    Range = 'range',
    Reset = 'reset',
    Search = 'search',
    Submit = 'sumbit',
    Tel = 'tel',
    Text = 'text',
    Time = 'time',
    URL = 'url',
    Week = 'week',
}
