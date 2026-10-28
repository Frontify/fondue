/* (c) Copyright Frontify Ltd., all rights reserved. */

// Typed here because vite/client would change the type of the glob call.
type ViteImportMeta = ImportMeta & {
    glob: (pattern: string, options: { eager: true; import: string }) => Record<string, Record<string, string>>;
};

const pluginStrings = (import.meta as ViteImportMeta).glob('../plugins/*/locales/nl-NL.ts', {
    eager: true,
    import: 'default',
});

export const nlNL = {
    lang: 'nl-NL',
    translationStrings: {
        RichTextEditor_announceBoth: '${first}. ${second}',
        RichTextEditor_apply: 'Toepassen',
        RichTextEditor_blockedInvalid: 'Bewerken is niet mogelijk omdat deze inhoud ongeldig is.',
        RichTextEditor_blockedLimit: 'Bewerken is niet mogelijk omdat deze inhoud een groottelimiet overschrijdt.',
        RichTextEditor_blockedMigration:
            'Bewerken is niet mogelijk omdat deze inhoud niet naar de huidige versie kan worden bijgewerkt.',
        RichTextEditor_blockedVersion:
            'Bewerken is niet mogelijk omdat deze inhoud een onbekend formaat of model gebruikt.',
        RichTextEditor_brandStyles: 'Merkstijlen',
        RichTextEditor_bubbleToolbar: 'Opmaak van de selectie',
        RichTextEditor_cancel: 'Annuleren',
        RichTextEditor_checkColorMeaningReview: 'Betekenis via kleur',
        RichTextEditor_checkColorMeaningReviewHelp:
            'Controleer of kleur niet de enige manier is waarop deze tekst betekenis toont, zoals een status of een verplicht item. Voeg ook woorden toe.',
        RichTextEditor_checkContrastLow: 'Laag tekstcontrast',
        RichTextEditor_checkContrastLowHelp:
            'De tekstkleur en de achtergrond hebben te weinig contrast voor veel mensen. Kies een tekstkleur die het menu voor deze achtergrond aanbiedt.',
        RichTextEditor_checkContrastUnknown: 'Tekstcontrast dat niet te meten is',
        RichTextEditor_checkContrastUnknownHelp:
            'De editor kent de kleur van deze tekst of van de achtergrond niet. Controleer of de tekst goed leesbaar is, met een contrast van minstens 4,5 op 1, of 3 op 1 voor grote tekst.',
        RichTextEditor_checkGenericImageWords:
            'afbeelding|plaatje|foto|fotografie|grafiek|illustratie|pictogram|icoon|logo|banner|schermafbeelding|screenshot|alternatieve tekst|tijdelijke aanduiding|zonder titel|miniatuur',
        RichTextEditor_checkHeadingDescriptiveReview: 'Koptekst',
        RichTextEditor_checkHeadingDescriptiveReviewHelp:
            'Controleer of elke kop zegt waar de sectie over gaat, zodat je een sectie alleen aan de koppen vindt.',
        RichTextEditor_checkHeadingEmpty: 'Lege kop',
        RichTextEditor_checkHeadingEmptyHelp:
            'Een kop zonder tekst staat toch in de lijst met koppen die schermlezers aanbieden. Voeg tekst toe of maak er gewone tekst van.',
        RichTextEditor_checkHeadingSkippedLevel: 'Overgeslagen kopniveau',
        RichTextEditor_checkHeadingSkippedLevelHelp:
            'Kopniveaus vormen het overzicht van het document. Een kop hoort hoogstens één niveau dieper te liggen dan de kop ervoor.',
        RichTextEditor_checkImageAltMissing: 'Afbeelding zonder alternatieve tekst',
        RichTextEditor_checkImageAltMissingHelp:
            'Beslis of de afbeelding informatie toevoegt. Zo ja, beschrijf in een paar woorden wat ze toont. Is ze alleen decoratie, markeer haar dan als decoratief.',
        RichTextEditor_checkImageAltSuspicious: 'Alternatieve tekst die de afbeelding misschien niet beschrijft',
        RichTextEditor_checkImageAltSuspiciousHelp:
            'De alternatieve tekst lijkt op een bestandsnaam of een algemeen woord. Zegt hij niet wat de afbeelding toont of waarom ze er staat, schrijf dan een korte beschrijving.',
        RichTextEditor_checkImageContentReview: 'Inhoud van de afbeelding',
        RichTextEditor_checkImageContentReviewHelp:
            'Controleer of de afbeelding tekst toont die in het document hoort, langer dan vijf seconden beweegt of knippert, of meer dan drie keer per seconde flitst.',
        RichTextEditor_checkLanguagePartsReview: 'Passages in een andere taal',
        RichTextEditor_checkLanguagePartsReviewHelp:
            'Controleer of een passage in een andere taal staat dan het document. Als de taal is aangegeven, spreken schermlezers de passage goed uit.',
        RichTextEditor_checkLinkPurposeReview: 'Doel van de link',
        RichTextEditor_checkLinkPurposeReviewHelp:
            'Controleer of de linktekst, met zijn zin, zegt waar de link naartoe gaat en wat er gebeurt als je hem volgt.',
        RichTextEditor_checkLinkTextEmpty: 'Link zonder tekst',
        RichTextEditor_checkLinkTextEmptyHelp:
            'Een link heeft tekst nodig die een schermlezer kan voorlezen. Voeg tekst toe die zegt waar de link naartoe gaat.',
        RichTextEditor_checkLinkTextVague: 'Linktekst die niet zegt waar hij naartoe gaat',
        RichTextEditor_checkLinkTextVagueHelp:
            'Lees de linktekst los, zoals een lijst met links hem toont. Zegt hij niet waar de link naartoe gaat, zoals ‘hier’ of ‘lees meer’, noem dan de bestemming.',
        RichTextEditor_checkSensoryReview: 'Instructies die op de zintuigen steunen',
        RichTextEditor_checkSensoryReviewHelp:
            'Controleer of geen instructie alleen steunt op vorm, kleur, grootte, geluid of de plek op de pagina. Noem het item ook bij naam, zodat iedereen de instructie kan volgen.',
        RichTextEditor_checkStructureReview: 'Structuur die alleen zichtbaar is',
        RichTextEditor_checkStructureReviewHelp:
            'Controleer of een structuur alleen visueel wordt getoond, zoals vette tekst als kop, alinea’s die met een streepje of een cijfer beginnen als lijst, of inspringen als citaat. Gebruik daarvoor de opdrachten voor kop, lijst en citaat.',
        RichTextEditor_checkVagueLinkTexts:
            'klik hier|klik|hier|link|deze link|meer|lees meer|meer weten|meer info|meer informatie|info|details|verder|ga|deze pagina|website',
        RichTextEditor_close: 'Sluiten',
        RichTextEditor_columnBreak: 'Kolomeinde',
        RichTextEditor_columnBreakInactive: 'Kolomeinde, inactief',
        RichTextEditor_contextMenu: 'Acties voor de selectie',
        RichTextEditor_convertToText: 'Omzetten naar tekst',
        RichTextEditor_convertedToText: 'Omgezet naar tekst',
        RichTextEditor_originalCopied: 'Origineel gekopieerd',
        RichTextEditor_copyContent: 'Inhoud kopiëren',
        RichTextEditor_copyFailed: 'Kopiëren is mislukt. Selecteer de inhoud en kopieer deze met het toetsenbord.',
        RichTextEditor_copyOriginal: 'Origineel kopiëren',
        RichTextEditor_gapCursor: 'Tussen blokken. Typ om een alinea toe te voegen.',
        RichTextEditor_imageAltReviewPrompt:
            'De afbeelding is gewijzigd. Controleer of de alternatieve tekst haar nog beschrijft.',
        RichTextEditor_imageReplaceRemoved: 'De afbeelding is niet vervangen omdat ze is verwijderd.',
        RichTextEditor_imageTargetRemoved: 'De afbeelding is niet ingevoegd omdat de plek ervoor is verwijderd.',
        RichTextEditor_imageUnavailable: 'Afbeelding niet beschikbaar',
        RichTextEditor_mentionFailed: 'Zoeken mislukt',
        RichTextEditor_mentionLoadMore: 'Meer laden',
        RichTextEditor_mentionLoading: 'Zoeken…',
        RichTextEditor_mentionNoResults: 'Geen resultaten',
        RichTextEditor_mentionOption: '${label}, ${type}, ${position} van ${total}',
        RichTextEditor_mentionResults: 'Resultaten: ${count}',
        RichTextEditor_mentionSuggestions: 'Suggesties voor vermelding',
        RichTextEditor_mentionUnavailable: 'niet beschikbaar',
        RichTextEditor_mentionUnknown: 'Onbekend (${resourceType})',
        RichTextEditor_more: 'Meer',
        RichTextEditor_nodeViewError: 'Dit deel van de inhoud kan niet worden weergegeven',
        RichTextEditor_panelError: 'Dit paneel kan niet worden weergegeven.',
        RichTextEditor_pasteFormattingRemoved: 'Een deel van de opmaak is verwijderd.',
        RichTextEditor_pasteMediaDropped: 'Media niet geplakt: ${count}',
        RichTextEditor_pasteTooLarge: 'De geplakte inhoud is te groot.',
        RichTextEditor_profileLoadFailed: 'De editor kon niet worden geladen.',
        RichTextEditor_readerBlockedInvalid: 'Deze inhoud kan niet worden getoond',
        RichTextEditor_readerBlockedUnsupported: 'Deze inhoud kan hier niet worden getoond',
        RichTextEditor_readerIslandFeature: 'Niet-ondersteunde inhoud: ${feature}',
        RichTextEditor_readerIslandGeneric: 'Niet-ondersteunde inhoud',
        RichTextEditor_readerIslandNotice: 'Sommige inhoud wordt hier niet ondersteund.',
        RichTextEditor_recoveryMessage: 'De editor werkt niet meer. Je laatste wijzigingen staan hieronder.',
        RichTextEditor_retry: 'Opnieuw proberen',
        RichTextEditor_saveConflict:
            'Iemand anders heeft deze inhoud gewijzigd. Je wijzigingen blijven behouden, maar zijn niet opgeslagen.',
        RichTextEditor_saveFailed: 'Opslaan is mislukt. Je wijzigingen zijn niet opgeslagen.',
        RichTextEditor_saveForbidden:
            'Niet opgeslagen: je mag deze inhoud niet bewerken. Vraag toegang aan of meld je opnieuw aan.',
        RichTextEditor_saveIncompatible: 'Niet opgeslagen: deze editor is verouderd. Laad de pagina opnieuw.',
        RichTextEditor_saveInvalid:
            'Niet opgeslagen: de inhoud is niet geaccepteerd. Kopieer de inhoud om je wijzigingen te bewaren.',
        RichTextEditor_saveOffline: 'Offline. Wijzigingen worden opgeslagen zodra je weer online bent.',
        RichTextEditor_saveRetrying: 'Opslaan is mislukt. Opnieuw proberen…',
        RichTextEditor_saveSaved: 'Alle wijzigingen opgeslagen',
        RichTextEditor_saveSaving: 'Opslaan…',
        RichTextEditor_saveUnsaved: 'Niet-opgeslagen wijzigingen',
        RichTextEditor_slashInsert: 'Invoegen',
        RichTextEditor_slashTurnInto: 'Omzetten naar',
        RichTextEditor_submitEmpty: 'Voer tekst in voordat je verzendt.',
        RichTextEditor_submitHint: 'Druk op ${submit} om te verzenden. Druk op ${newLine} voor een nieuwe regel.',
        RichTextEditor_submitHintSingleLine: 'Druk op ${submit} om te verzenden.',
        RichTextEditor_suggestionOption: '${label}, ${position} van ${total}',
        RichTextEditor_suggestions: 'Suggesties',
        RichTextEditor_textStyle: 'Tekststijl',
        RichTextEditor_toolbar: 'Tekstopmaak',
        RichTextEditor_toolbarAlways: 'Werkbalk altijd tonen',
        RichTextEditor_toolbarOnSelection: 'Werkbalk alleen bij een selectie tonen',
        RichTextEditor_turnIntoCurrent: 'Omzetten naar: ${type}',
        RichTextEditor_unavailable: 'Niet beschikbaar voor de huidige selectie',
        RichTextEditor_unavailableNotAllowed: 'Niet toegestaan in deze editor',
        RichTextEditor_unavailableReadOnly: 'De inhoud is alleen-lezen',
        RichTextEditor_uploadCancel: 'Uploaden annuleren',
        RichTextEditor_uploadCancelled: 'Uploaden geannuleerd: ${name}',
        RichTextEditor_uploadCompleted: 'Geüpload: ${name}',
        RichTextEditor_uploadCompletedNoAlt: 'Geüpload: ${name}. De afbeelding heeft nog geen alternatieve tekst.',
        RichTextEditor_uploadFailed: 'Uploaden mislukt: ${name}',
        RichTextEditor_uploadRetry: 'Opnieuw uploaden',
        RichTextEditor_uploadStarted: 'Bezig met uploaden: ${name}',
        RichTextEditor_uploadStartedCount: 'Bestanden uploaden: ${count}',
        RichTextEditor_uploadTooLarge:
            '${name} is niet geüpload omdat het bestand te groot is. Kies een bestand van het type ${types} van maximaal ${size}.',
        RichTextEditor_uploadTooManyPixels:
            '${name} is niet geüpload omdat de afbeelding te veel pixels heeft. Kies een afbeelding van maximaal ${megapixels} megapixel en ${side} pixels per zijde.',
        RichTextEditor_uploadUnreadable:
            '${name} is niet geüpload omdat de afmetingen van de afbeelding niet te lezen zijn. Kies een bestand van het type ${types} van maximaal ${size}.',
        RichTextEditor_uploadUnsafe:
            '${name} is niet geüpload omdat de SVG een script bevat. Kies een bestand van het type ${types} van maximaal ${size}.',
        RichTextEditor_uploadWrongType:
            '${name} is niet geüpload omdat dit bestandstype niet wordt geaccepteerd. Kies een bestand van het type ${types} van maximaal ${size}.',
        ...(Object.assign({}, ...Object.values(pluginStrings)) as Record<string, string>),
    },
};
