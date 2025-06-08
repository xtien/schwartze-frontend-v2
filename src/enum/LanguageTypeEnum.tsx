export const LanguageTypeEnum = {
    En: 'en',
    Nl: 'nl',
    Es: 'es',
    Fr: 'fl',
    De: 'de'
} as const;

export type LanguageTypeEnum = typeof LanguageTypeEnum[keyof typeof LanguageTypeEnum];
