export const LanguageTypeEnum = {
    En: 'EN',
    Nl: 'NL',
    Es: 'ES',
    Fr: 'FR',
    De: 'DE'
} as const;

export type LanguageTypeEnum = typeof LanguageTypeEnum[keyof typeof LanguageTypeEnum];
