/* (c) Copyright Frontify Ltd., all rights reserved. */

// Typed here because vite/client would change the type of the glob call.
type ViteImportMeta = ImportMeta & {
    glob: (pattern: string, options: { eager: true; import: string }) => Record<string, Record<string, string>>;
};

const pluginStrings = (import.meta as ViteImportMeta).glob('../plugins/*/locales/de-DE.ts', {
    eager: true,
    import: 'default',
});

export const deDE = {
    lang: 'de-DE',
    translationStrings: {
        RichTextEditor_announceBoth: '${first}. ${second}',
        RichTextEditor_apply: 'Anwenden',
        RichTextEditor_blockedInvalid: 'Bearbeiten ist nicht möglich, weil dieser Inhalt ungültig ist.',
        RichTextEditor_blockedLimit:
            'Bearbeiten ist nicht möglich, weil dieser Inhalt eine Größenbegrenzung überschreitet.',
        RichTextEditor_blockedMigration:
            'Bearbeiten ist nicht möglich, weil dieser Inhalt nicht auf die aktuelle Version aktualisiert werden kann.',
        RichTextEditor_blockedVersion:
            'Bearbeiten ist nicht möglich, weil dieser Inhalt ein unbekanntes Format oder Modell verwendet.',
        RichTextEditor_brandStyles: 'Markenstile',
        RichTextEditor_bubbleToolbar: 'Formatierung der Auswahl',
        RichTextEditor_cancel: 'Abbrechen',
        RichTextEditor_checkColorMeaningReview: 'Bedeutung durch Farbe',
        RichTextEditor_checkColorMeaningReviewHelp:
            'Prüfen Sie, ob die Farbe nicht das einzige Mittel ist, mit dem dieser Text eine Bedeutung zeigt, etwa einen Status oder ein Pflichtfeld. Ergänzen Sie Worte.',
        RichTextEditor_checkContrastLow: 'Geringer Textkontrast',
        RichTextEditor_checkContrastLowHelp:
            'Textfarbe und Hintergrund haben für viele Menschen zu wenig Kontrast. Wählen Sie eine Textfarbe, die das Menü für diesen Hintergrund anbietet.',
        RichTextEditor_checkContrastUnknown: 'Textkontrast, der sich nicht messen lässt',
        RichTextEditor_checkContrastUnknownHelp:
            'Der Editor kennt die Farbe dieses Textes oder seines Hintergrunds nicht. Prüfen Sie, ob der Text gut lesbar ist, mit einem Kontrast von mindestens 4,5 zu 1, oder 3 zu 1 für großen Text.',
        RichTextEditor_checkGenericImageWords:
            'bild|foto|fotografie|grafik|illustration|symbol|icon|logo|banner|bildschirmfoto|screenshot|platzhalter|ohne titel|vorschaubild|alternativtext',
        RichTextEditor_checkHeadingDescriptiveReview: 'Überschriftentext',
        RichTextEditor_checkHeadingDescriptiveReviewHelp:
            'Prüfen Sie, ob jede Überschrift sagt, worum es im Abschnitt geht, damit man einen Abschnitt allein über die Überschriften findet.',
        RichTextEditor_checkHeadingEmpty: 'Leere Überschrift',
        RichTextEditor_checkHeadingEmptyHelp:
            'Eine Überschrift ohne Text erscheint trotzdem in der Liste der Überschriften, die Screenreader anbieten. Fügen Sie Text hinzu oder machen Sie sie zu normalem Text.',
        RichTextEditor_checkHeadingSkippedLevel: 'Übersprungene Überschriftenebene',
        RichTextEditor_checkHeadingSkippedLevelHelp:
            'Die Überschriftenebenen bilden die Gliederung des Dokuments. Eine Überschrift sollte höchstens eine Ebene tiefer liegen als die vorherige.',
        RichTextEditor_checkImageAltMissing: 'Bild ohne Alternativtext',
        RichTextEditor_checkImageAltMissingHelp:
            'Entscheiden Sie, ob das Bild Informationen enthält. Wenn ja, beschreiben Sie in wenigen Worten, was es zeigt. Wenn es nur schmückt, markieren Sie es als dekorativ.',
        RichTextEditor_checkImageAltSuspicious: 'Alternativtext, der das Bild vielleicht nicht beschreibt',
        RichTextEditor_checkImageAltSuspiciousHelp:
            'Der Alternativtext sieht wie ein Dateiname oder ein allgemeines Wort aus. Wenn er nicht sagt, was das Bild zeigt oder wozu es da ist, schreiben Sie eine kurze Beschreibung.',
        RichTextEditor_checkImageContentReview: 'Bildinhalt',
        RichTextEditor_checkImageContentReviewHelp:
            'Prüfen Sie, ob das Bild Text zeigt, der ins Dokument gehört, ob es sich länger als fünf Sekunden bewegt oder blinkt oder ob es mehr als dreimal pro Sekunde aufblitzt.',
        RichTextEditor_checkLanguagePartsReview: 'Passagen in einer anderen Sprache',
        RichTextEditor_checkLanguagePartsReviewHelp:
            'Prüfen Sie, ob eine Passage in einer anderen Sprache als das Dokument steht. Ist ihre Sprache ausgezeichnet, sprechen Screenreader sie richtig aus.',
        RichTextEditor_checkLinkPurposeReview: 'Linkzweck',
        RichTextEditor_checkLinkPurposeReviewHelp:
            'Prüfen Sie, ob der Linktext mit seinem Satz sagt, wohin der Link führt und was beim Folgen geschieht.',
        RichTextEditor_checkLinkTextEmpty: 'Link ohne Text',
        RichTextEditor_checkLinkTextEmptyHelp:
            'Ein Link braucht Text, den ein Screenreader vorlesen kann. Fügen Sie Text hinzu, der sagt, wohin der Link führt.',
        RichTextEditor_checkLinkTextVague: 'Linktext, der das Ziel nicht nennt',
        RichTextEditor_checkLinkTextVagueHelp:
            'Lesen Sie den Linktext für sich allein, wie ihn eine Liste von Links zeigt. Wenn er nicht sagt, wohin der Link führt, wie bei „hier“ oder „weiterlesen“, nennen Sie stattdessen das Ziel.',
        RichTextEditor_checkSensoryReview: 'Anweisungen, die auf die Sinne setzen',
        RichTextEditor_checkSensoryReviewHelp:
            'Prüfen Sie, ob keine Anweisung nur auf Form, Farbe, Größe, Klang oder die Lage auf der Seite setzt. Nennen Sie das Element auch beim Namen, damit alle der Anweisung folgen können.',
        RichTextEditor_checkStructureReview: 'Struktur, die nur optisch erkennbar ist',
        RichTextEditor_checkStructureReviewHelp:
            'Prüfen Sie, ob eine Struktur nur optisch gezeigt wird, etwa fetter Text als Überschrift, Absätze mit Strich oder Zahl als Liste oder Einzüge als Zitat. Verwenden Sie dafür die Befehle für Überschrift, Liste und Zitat.',
        RichTextEditor_checkVagueLinkTexts:
            'hier klicken|klicken|hier|link|dieser link|mehr|weiterlesen|mehr erfahren|mehr infos|mehr informationen|infos|details|weiter|los|diese seite|website',
        RichTextEditor_close: 'Schließen',
        RichTextEditor_columnBreak: 'Spaltenumbruch',
        RichTextEditor_columnBreakInactive: 'Spaltenumbruch, inaktiv',
        RichTextEditor_contextMenu: 'Aktionen für die Auswahl',
        RichTextEditor_convertToText: 'In Text umwandeln',
        RichTextEditor_convertedToText: 'In Text umgewandelt',
        RichTextEditor_originalCopied: 'Original kopiert',
        RichTextEditor_copyContent: 'Inhalt kopieren',
        RichTextEditor_copyFailed:
            'Kopieren fehlgeschlagen. Wählen Sie den Inhalt aus und kopieren Sie ihn mit der Tastatur.',
        RichTextEditor_copyOriginal: 'Original kopieren',
        RichTextEditor_gapCursor: 'Zwischen Blöcken. Tippen Sie, um einen Absatz hinzuzufügen.',
        RichTextEditor_imageAltReviewPrompt:
            'Das Bild wurde geändert. Prüfen Sie, ob der Alternativtext es noch beschreibt.',
        RichTextEditor_imageReplaceRemoved: 'Das Bild wurde nicht ersetzt, weil es entfernt wurde.',
        RichTextEditor_imageTargetRemoved: 'Das Bild wurde nicht eingefügt, weil die Stelle dafür entfernt wurde.',
        RichTextEditor_imageUnavailable: 'Bild nicht verfügbar',
        RichTextEditor_mentionFailed: 'Suche fehlgeschlagen',
        RichTextEditor_mentionLoadMore: 'Mehr laden',
        RichTextEditor_mentionLoading: 'Suche läuft…',
        RichTextEditor_mentionNoResults: 'Keine Ergebnisse',
        RichTextEditor_mentionOption: '${label}, ${type}, ${position} von ${total}',
        RichTextEditor_mentionResults: 'Ergebnisse: ${count}',
        RichTextEditor_mentionSuggestions: 'Vorschläge zum Erwähnen',
        RichTextEditor_mentionUnavailable: 'nicht verfügbar',
        RichTextEditor_mentionUnknown: 'Unbekannt (${resourceType})',
        RichTextEditor_more: 'Mehr',
        RichTextEditor_nodeViewError: 'Dieser Teil des Inhalts kann nicht angezeigt werden',
        RichTextEditor_panelError: 'Dieses Panel konnte nicht angezeigt werden.',
        RichTextEditor_pasteFormattingRemoved: 'Einige Formatierungen wurden entfernt.',
        RichTextEditor_pasteMediaDropped: 'Medien nicht eingefügt: ${count}',
        RichTextEditor_pasteTooLarge: 'Der eingefügte Inhalt ist zu groß.',
        RichTextEditor_profileLoadFailed: 'Der Editor konnte nicht geladen werden.',
        RichTextEditor_readerBlockedInvalid: 'Dieser Inhalt kann nicht angezeigt werden',
        RichTextEditor_readerBlockedUnsupported: 'Dieser Inhalt kann hier nicht angezeigt werden',
        RichTextEditor_readerIslandFeature: 'Nicht unterstützter Inhalt: ${feature}',
        RichTextEditor_readerIslandGeneric: 'Nicht unterstützter Inhalt',
        RichTextEditor_readerIslandNotice: 'Einige Inhalte werden hier nicht unterstützt.',
        RichTextEditor_recoveryMessage:
            'Der Editor funktioniert nicht mehr. Ihre letzten Änderungen werden unten angezeigt.',
        RichTextEditor_retry: 'Erneut versuchen',
        RichTextEditor_saveConflict:
            'Jemand anderes hat diesen Inhalt geändert. Ihre Änderungen bleiben erhalten, sind aber nicht gespeichert.',
        RichTextEditor_saveFailed: 'Speichern fehlgeschlagen. Ihre Änderungen sind nicht gespeichert.',
        RichTextEditor_saveForbidden:
            'Nicht gespeichert: Sie dürfen diesen Inhalt nicht bearbeiten. Fordern Sie Zugriff an oder melden Sie sich erneut an.',
        RichTextEditor_saveIncompatible: 'Nicht gespeichert: Dieser Editor ist veraltet. Laden Sie die Seite neu.',
        RichTextEditor_saveInvalid:
            'Nicht gespeichert: Der Inhalt wurde nicht angenommen. Kopieren Sie ihn, um Ihre Änderungen zu behalten.',
        RichTextEditor_saveOffline: 'Offline. Änderungen werden gespeichert, sobald Sie wieder online sind.',
        RichTextEditor_saveRetrying: 'Speichern fehlgeschlagen. Neuer Versuch…',
        RichTextEditor_saveSaved: 'Alle Änderungen gespeichert',
        RichTextEditor_saveSaving: 'Wird gespeichert…',
        RichTextEditor_saveUnsaved: 'Nicht gespeicherte Änderungen',
        RichTextEditor_slashInsert: 'Einfügen',
        RichTextEditor_slashTurnInto: 'Umwandeln in',
        RichTextEditor_submitEmpty: 'Geben Sie Text ein, bevor Sie absenden.',
        RichTextEditor_submitHint: 'Zum Absenden ${submit} drücken. Für eine neue Zeile ${newLine} drücken.',
        RichTextEditor_submitHintSingleLine: 'Zum Absenden ${submit} drücken.',
        RichTextEditor_suggestionOption: '${label}, ${position} von ${total}',
        RichTextEditor_suggestions: 'Vorschläge',
        RichTextEditor_textStyle: 'Textstil',
        RichTextEditor_toolbar: 'Textformatierung',
        RichTextEditor_toolbarAlways: 'Symbolleiste immer anzeigen',
        RichTextEditor_toolbarOnSelection: 'Symbolleiste nur bei Auswahl anzeigen',
        RichTextEditor_turnIntoCurrent: 'Umwandeln in: ${type}',
        RichTextEditor_unavailable: 'An der aktuellen Auswahl nicht verfügbar',
        RichTextEditor_unavailableNotAllowed: 'In diesem Editor nicht erlaubt',
        RichTextEditor_unavailableReadOnly: 'Der Inhalt ist schreibgeschützt',
        RichTextEditor_uploadCancel: 'Upload abbrechen',
        RichTextEditor_uploadCancelled: 'Upload abgebrochen: ${name}',
        RichTextEditor_uploadCompleted: 'Hochgeladen: ${name}',
        RichTextEditor_uploadCompletedNoAlt: 'Hochgeladen: ${name}. Das Bild hat noch keinen Alternativtext.',
        RichTextEditor_uploadFailed: 'Upload fehlgeschlagen: ${name}',
        RichTextEditor_uploadRetry: 'Upload wiederholen',
        RichTextEditor_uploadStarted: 'Wird hochgeladen: ${name}',
        RichTextEditor_uploadStartedCount: 'Dateien werden hochgeladen: ${count}',
        RichTextEditor_uploadTooLarge:
            '${name} wurde nicht hochgeladen, weil die Datei zu groß ist. Wählen Sie eine Datei vom Typ ${types} mit höchstens ${size}.',
        RichTextEditor_uploadTooManyPixels:
            '${name} wurde nicht hochgeladen, weil das Bild zu viele Pixel hat. Wählen Sie ein Bild mit höchstens ${megapixels} Megapixeln und ${side} Pixeln pro Seite.',
        RichTextEditor_uploadUnreadable:
            '${name} wurde nicht hochgeladen, weil die Bildgröße nicht gelesen werden kann. Wählen Sie eine Datei vom Typ ${types} mit höchstens ${size}.',
        RichTextEditor_uploadUnsafe:
            '${name} wurde nicht hochgeladen, weil das SVG Skript enthält. Wählen Sie eine Datei vom Typ ${types} mit höchstens ${size}.',
        RichTextEditor_uploadWrongType:
            '${name} wurde nicht hochgeladen, weil dieser Dateityp nicht akzeptiert wird. Wählen Sie eine Datei vom Typ ${types} mit höchstens ${size}.',
        ...(Object.assign({}, ...Object.values(pluginStrings)) as Record<string, string>),
    },
};
