/* (c) Copyright Frontify Ltd., all rights reserved. */

// Typed here because vite/client would change the type of the glob call.
type ViteImportMeta = ImportMeta & {
    glob: (pattern: string, options: { eager: true; import: string }) => Record<string, Record<string, string>>;
};

const pluginStrings = (import.meta as ViteImportMeta).glob('../plugins/*/locales/it-IT.ts', {
    eager: true,
    import: 'default',
});

export const itIT = {
    lang: 'it-IT',
    translationStrings: {
        RichTextEditor_alignCenter: 'Centra',
        RichTextEditor_alignJustify: 'Giustifica',
        RichTextEditor_alignLeft: 'Allinea a sinistra',
        RichTextEditor_alignRight: 'Allinea a destra',
        RichTextEditor_announceBoth: '${first}. ${second}',
        RichTextEditor_apply: 'Applica',
        RichTextEditor_blockedInvalid: 'La modifica non è disponibile perché questo contenuto non è valido.',
        RichTextEditor_blockedLimit:
            'La modifica non è disponibile perché questo contenuto supera un limite di dimensione.',
        RichTextEditor_blockedMigration:
            'La modifica non è disponibile perché questo contenuto non può essere aggiornato alla versione attuale.',
        RichTextEditor_blockedVersion:
            'La modifica non è disponibile perché questo contenuto usa un formato o un modello sconosciuto.',
        RichTextEditor_bold: 'Grassetto',
        RichTextEditor_brandStyles: 'Stili del marchio',
        RichTextEditor_bubbleToolbar: 'Formattazione della selezione',
        RichTextEditor_bulletList: 'Elenco puntato',
        RichTextEditor_cancel: 'Annulla',
        RichTextEditor_checkColorMeaningReview: 'Significato espresso dal colore',
        RichTextEditor_checkColorMeaningReviewHelp:
            'Verifica che il colore non sia l’unico modo in cui questo testo esprime un significato, come uno stato o un elemento obbligatorio. Aggiungi anche delle parole.',
        RichTextEditor_checkContrastLow: 'Contrasto del testo insufficiente',
        RichTextEditor_checkContrastLowHelp:
            'Il colore del testo e lo sfondo hanno un contrasto troppo basso per molte persone. Scegli un colore del testo che il menu offre per questo sfondo.',
        RichTextEditor_checkContrastUnknown: 'Contrasto del testo non misurabile',
        RichTextEditor_checkContrastUnknownHelp:
            'L’editor non conosce il colore di questo testo o del suo sfondo. Verifica che il testo sia facile da leggere, con un contrasto di almeno 4,5 a 1, o 3 a 1 per il testo grande.',
        RichTextEditor_checkGenericImageWords:
            'immagine|foto|fotografia|grafica|illustrazione|icona|logo|banner|screenshot|schermata|testo alternativo|segnaposto|senza titolo|miniatura',
        RichTextEditor_checkHeadingDescriptiveReview: 'Testo del titolo',
        RichTextEditor_checkHeadingDescriptiveReviewHelp:
            'Verifica che ogni titolo dica di cosa tratta la sua sezione, così da trovare una sezione dai soli titoli.',
        RichTextEditor_checkHeadingEmpty: 'Titolo vuoto',
        RichTextEditor_checkHeadingEmptyHelp:
            'Un titolo senza testo compare comunque nell’elenco dei titoli offerto dagli screen reader. Aggiungi il testo o trasformalo in testo normale.',
        RichTextEditor_checkHeadingSkippedLevel: 'Livello di titolo saltato',
        RichTextEditor_checkHeadingSkippedLevelHelp:
            'I livelli dei titoli formano la struttura del documento. Un titolo dovrebbe essere al massimo un livello più in basso del titolo precedente.',
        RichTextEditor_checkImageAltMissing: 'Immagine senza testo alternativo',
        RichTextEditor_checkImageAltMissingHelp:
            'Decidi se l’immagine aggiunge informazioni. Se sì, descrivi in poche parole cosa mostra. Se è solo decorativa, contrassegnala come decorativa.',
        RichTextEditor_checkImageAltSuspicious: 'Testo alternativo che forse non descrive l’immagine',
        RichTextEditor_checkImageAltSuspiciousHelp:
            'Il testo alternativo sembra un nome di file o una parola generica. Se non dice cosa mostra l’immagine o perché c’è, scrivi invece una breve descrizione.',
        RichTextEditor_checkImageContentReview: 'Contenuto dell’immagine',
        RichTextEditor_checkImageContentReviewHelp:
            'Verifica se l’immagine mostra testo che dovrebbe stare nel documento, si muove o lampeggia per più di cinque secondi o emette flash più di tre volte al secondo.',
        RichTextEditor_checkLanguagePartsReview: 'Passaggi in un’altra lingua',
        RichTextEditor_checkLanguagePartsReviewHelp:
            'Verifica se un passaggio è in una lingua diversa da quella del documento. Indicarne la lingua permette agli screen reader di pronunciarlo bene.',
        RichTextEditor_checkLinkPurposeReview: 'Scopo del link',
        RichTextEditor_checkLinkPurposeReviewHelp:
            'Verifica che il testo del link, con la sua frase, dica dove porta il link e cosa succede quando lo si segue.',
        RichTextEditor_checkLinkTextEmpty: 'Link senza testo',
        RichTextEditor_checkLinkTextEmptyHelp:
            'Un link ha bisogno di un testo che uno screen reader possa leggere. Aggiungi un testo che dica dove porta il link.',
        RichTextEditor_checkLinkTextVague: 'Testo del link che non dice dove porta',
        RichTextEditor_checkLinkTextVagueHelp:
            'Leggi il testo del link da solo, come lo mostra un elenco di link. Se non dice dove porta, come «qui» o «leggi di più», indica invece la destinazione.',
        RichTextEditor_checkSensoryReview: 'Istruzioni basate sui sensi',
        RichTextEditor_checkSensoryReviewHelp:
            'Verifica che nessuna istruzione si basi solo su forma, colore, dimensione, suono o posizione nella pagina. Indica anche il nome dell’elemento, così che tutti possano seguirla.',
        RichTextEditor_checkStructureReview: 'Struttura solo visiva',
        RichTextEditor_checkStructureReviewHelp:
            'Verifica se una struttura è mostrata solo visivamente, come testo in grassetto usato come titolo, paragrafi che iniziano con un trattino o un numero usati come elenco, o un rientro che indica una citazione. Usa invece i comandi per titolo, elenco e citazione.',
        RichTextEditor_checkVagueLinkTexts:
            'clicca qui|clicca|qui|link|questo link|altro|di più|leggi di più|scopri di più|maggiori informazioni|info|dettagli|continua|vai|questa pagina|sito web',
        RichTextEditor_checks: 'Verifiche di accessibilità',
        RichTextEditor_clearFormatting: 'Cancella formattazione',
        RichTextEditor_close: 'Chiudi',
        RichTextEditor_code: 'Codice',
        RichTextEditor_codeBlock: 'Blocco di codice',
        RichTextEditor_codeLanguageMenu: 'Linguaggio del codice',
        RichTextEditor_colorMenu: 'Colore',
        RichTextEditor_columnBreak: 'Interruzione di colonna',
        RichTextEditor_columnBreakInactive: 'Interruzione di colonna, inattiva',
        RichTextEditor_contextMenu: 'Azioni sulla selezione',
        RichTextEditor_convertToText: 'Converti in testo',
        RichTextEditor_convertedToText: 'Convertito in testo',
        RichTextEditor_originalCopied: 'Originale copiato',
        RichTextEditor_copyContent: 'Copia contenuto',
        RichTextEditor_copyFailed: 'Copia non riuscita. Seleziona il contenuto e copialo con la tastiera.',
        RichTextEditor_copyOriginal: 'Copia originale',
        RichTextEditor_defaultStyle: 'Stile predefinito',
        RichTextEditor_divider: 'Divisore',
        RichTextEditor_emoji: 'Emoji',
        RichTextEditor_gapCursor: 'Tra due blocchi. Digita per aggiungere un paragrafo.',
        RichTextEditor_image: 'Immagine',
        RichTextEditor_imageAlignMenu: 'Allineamento immagine',
        RichTextEditor_imageAltEdit: 'Testo alternativo',
        RichTextEditor_imageAltReviewPrompt:
            'L’immagine è cambiata. Verifica che il testo alternativo la descriva ancora.',
        RichTextEditor_imageReplace: 'Sostituisci immagine',
        RichTextEditor_imageReplaceRemoved: 'L’immagine non è stata sostituita perché è stata rimossa.',
        RichTextEditor_imageSizeCustom: 'Larghezza personalizzata…',
        RichTextEditor_imageSizeMenu: 'Dimensioni immagine',
        RichTextEditor_imageTargetRemoved:
            'L’immagine non è stata inserita perché il punto in cui inserirla è stato rimosso.',
        RichTextEditor_imageUnavailable: 'Immagine non disponibile',
        RichTextEditor_italic: 'Corsivo',
        RichTextEditor_language: 'Lingua',
        RichTextEditor_link: 'Link',
        RichTextEditor_linkNewWindow: '(si apre in una nuova finestra)',
        RichTextEditor_mention: 'Menziona',
        RichTextEditor_mentionFailed: 'Ricerca non riuscita',
        RichTextEditor_mentionLoadMore: 'Carica altro',
        RichTextEditor_mentionLoading: 'Ricerca in corso…',
        RichTextEditor_mentionNoResults: 'Nessun risultato',
        RichTextEditor_mentionOption: '${label}, ${type}, ${position} di ${total}',
        RichTextEditor_mentionResults: 'Risultati: ${count}',
        RichTextEditor_mentionSuggestions: 'Suggerimenti di menzione',
        RichTextEditor_mentionUnavailable: 'non disponibile',
        RichTextEditor_mentionUnknown: 'Sconosciuto (${resourceType})',
        RichTextEditor_more: 'Altro',
        RichTextEditor_moveDown: 'Sposta giù',
        RichTextEditor_moveUp: 'Sposta su',
        RichTextEditor_nodeViewError: 'Questa parte del contenuto non può essere visualizzata',
        RichTextEditor_normalText: 'Testo normale',
        RichTextEditor_numberedList: 'Elenco numerato',
        RichTextEditor_outline: 'Struttura',
        RichTextEditor_panelError: 'Impossibile mostrare questo pannello.',
        RichTextEditor_pasteFormattingRemoved: 'Parte della formattazione è stata rimossa.',
        RichTextEditor_pasteMediaDropped: 'Contenuti multimediali non incollati: ${count}',
        RichTextEditor_pasteTooLarge: 'Il contenuto incollato è troppo grande.',
        RichTextEditor_profileLoadFailed: 'Impossibile caricare l’editor.',
        RichTextEditor_quote: 'Citazione',
        RichTextEditor_readerBlockedInvalid: 'Questo contenuto non può essere mostrato',
        RichTextEditor_readerBlockedUnsupported: 'Questo contenuto non può essere mostrato qui',
        RichTextEditor_readerIslandFeature: 'Contenuto non supportato: ${feature}',
        RichTextEditor_readerIslandGeneric: 'Contenuto non supportato',
        RichTextEditor_readerIslandNotice: 'Alcuni contenuti non sono supportati qui.',
        RichTextEditor_recoveryMessage:
            'L’editor ha smesso di funzionare. Le ultime modifiche sono mostrate qui sotto.',
        RichTextEditor_redo: 'Ripeti',
        RichTextEditor_retry: 'Riprova',
        RichTextEditor_saveConflict:
            'Qualcun altro ha modificato questo contenuto. Le tue modifiche sono conservate ma non salvate.',
        RichTextEditor_saveFailed: 'Salvataggio non riuscito. Le tue modifiche non sono salvate.',
        RichTextEditor_saveForbidden:
            'Non salvato: non puoi modificare questo contenuto. Richiedi l’accesso o accedi di nuovo.',
        RichTextEditor_saveIncompatible: 'Non salvato: questo editor non è aggiornato. Ricarica la pagina.',
        RichTextEditor_saveInvalid:
            'Non salvato: il contenuto non è stato accettato. Copialo per conservare le tue modifiche.',
        RichTextEditor_saveOffline: 'Offline. Le modifiche verranno salvate quando tornerai online.',
        RichTextEditor_saveRetrying: 'Salvataggio non riuscito. Nuovo tentativo…',
        RichTextEditor_saveSaved: 'Tutte le modifiche salvate',
        RichTextEditor_saveSaving: 'Salvataggio…',
        RichTextEditor_saveUnsaved: 'Modifiche non salvate',
        RichTextEditor_slashInsert: 'Inserisci',
        RichTextEditor_slashTurnInto: 'Trasforma in',
        RichTextEditor_startNumbering: 'Inizia la numerazione da',
        RichTextEditor_strike: 'Barrato',
        RichTextEditor_submitEmpty: 'Inserisci del testo prima di inviare.',
        RichTextEditor_submitHint: 'Per inviare, premi ${submit}. Per andare a capo, premi ${newLine}.',
        RichTextEditor_submitHintSingleLine: 'Per inviare, premi ${submit}.',
        RichTextEditor_subscript: 'Pedice',
        RichTextEditor_suggestionOption: '${label}, ${position} di ${total}',
        RichTextEditor_suggestions: 'Suggerimenti',
        RichTextEditor_superscript: 'Apice',
        RichTextEditor_taskList: 'Elenco di attività',
        RichTextEditor_textStyle: 'Stile del testo',
        RichTextEditor_toolbar: 'Formattazione del testo',
        RichTextEditor_toolbarAlways: 'Mostra sempre la barra degli strumenti',
        RichTextEditor_toolbarOnSelection: 'Mostra la barra degli strumenti solo con una selezione',
        RichTextEditor_turnIntoCurrent: 'Trasforma in: ${type}',
        RichTextEditor_unavailable: 'Non disponibile per la selezione corrente',
        RichTextEditor_unavailableNotAllowed: 'Non consentito in questo editor',
        RichTextEditor_unavailableReadOnly: 'Il contenuto è di sola lettura',
        RichTextEditor_underline: 'Sottolineato',
        RichTextEditor_undo: 'Annulla',
        RichTextEditor_uploadCancel: 'Annulla caricamento',
        RichTextEditor_uploadCancelled: 'Caricamento annullato: ${name}',
        RichTextEditor_uploadCompleted: 'Caricato: ${name}',
        RichTextEditor_uploadCompletedNoAlt: 'Caricato: ${name}. L’immagine non ha ancora un testo alternativo.',
        RichTextEditor_uploadFailed: 'Caricamento non riuscito: ${name}',
        RichTextEditor_uploadRetry: 'Riprova caricamento',
        RichTextEditor_uploadStarted: 'Caricamento: ${name}',
        RichTextEditor_uploadStartedCount: 'Caricamento file: ${count}',
        RichTextEditor_uploadTooLarge:
            '${name} non è stato caricato perché il file è troppo grande. Scegli un file di tipo ${types} fino a ${size}.',
        RichTextEditor_uploadTooManyPixels:
            '${name} non è stato caricato perché l’immagine ha troppi pixel. Scegli un’immagine di al massimo ${megapixels} megapixel e ${side} pixel per lato.',
        RichTextEditor_uploadUnreadable:
            '${name} non è stato caricato perché non è possibile leggere le dimensioni dell’immagine. Scegli un file di tipo ${types} fino a ${size}.',
        RichTextEditor_uploadUnsafe:
            '${name} non è stato caricato perché l’SVG contiene uno script. Scegli un file di tipo ${types} fino a ${size}.',
        RichTextEditor_uploadWrongType:
            '${name} non è stato caricato perché questo tipo di file non è accettato. Scegli un file di tipo ${types} fino a ${size}.',
        ...(Object.assign({}, ...Object.values(pluginStrings)) as Record<string, string>),
    },
};
