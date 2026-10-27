/* (c) Copyright Frontify Ltd., all rights reserved. */

// Typed here because vite/client would change the type of the glob call.
type ViteImportMeta = ImportMeta & {
    glob: (pattern: string, options: { eager: true; import: string }) => Record<string, Record<string, string>>;
};

const pluginStrings = (import.meta as ViteImportMeta).glob('../plugins/*/locales/fr-FR.ts', {
    eager: true,
    import: 'default',
});

export const frFR = {
    lang: 'fr-FR',
    translationStrings: {
        RichTextEditor_alignCenter: 'Centrer',
        RichTextEditor_alignJustify: 'Justifier',
        RichTextEditor_alignLeft: 'Aligner à gauche',
        RichTextEditor_alignRight: 'Aligner à droite',
        RichTextEditor_announceBoth: '${first}. ${second}',
        RichTextEditor_apply: 'Appliquer',
        RichTextEditor_blockedInvalid: 'La modification est impossible, car ce contenu n’est pas valide.',
        RichTextEditor_blockedLimit: 'La modification est impossible, car ce contenu dépasse une limite de taille.',
        RichTextEditor_blockedMigration:
            'La modification est impossible, car ce contenu ne peut pas être mis à niveau vers la version actuelle.',
        RichTextEditor_blockedVersion:
            'La modification est impossible, car ce contenu utilise un format ou un modèle inconnu.',
        RichTextEditor_bold: 'Gras',
        RichTextEditor_brandStyles: 'Styles de marque',
        RichTextEditor_bubbleToolbar: 'Mise en forme de la sélection',
        RichTextEditor_bulletList: 'Liste à puces',
        RichTextEditor_cancel: 'Annuler',
        RichTextEditor_checkColorMeaningReview: 'Sens exprimé par la couleur',
        RichTextEditor_checkColorMeaningReviewHelp:
            'Vérifiez que la couleur n’est pas le seul moyen par lequel ce texte exprime un sens, comme un statut ou un élément obligatoire. Ajoutez aussi des mots.',
        RichTextEditor_checkContrastLow: 'Contraste du texte insuffisant',
        RichTextEditor_checkContrastLowHelp:
            'La couleur du texte et son arrière-plan ne contrastent pas assez pour de nombreuses personnes. Choisissez une couleur de texte que le menu propose pour cet arrière-plan.',
        RichTextEditor_checkContrastUnknown: 'Contraste du texte impossible à mesurer',
        RichTextEditor_checkContrastUnknownHelp:
            'L’éditeur ne connaît pas la couleur de ce texte ou de son arrière-plan. Vérifiez que le texte se lit facilement, avec un contraste d’au moins 4,5 pour 1, ou 3 pour 1 pour un grand texte.',
        RichTextEditor_checkGenericImageWords:
            'image|photo|photographie|illustration|graphique|icône|logo|bannière|capture d’écran|capture|texte alternatif|espace réservé|sans titre|vignette',
        RichTextEditor_checkHeadingDescriptiveReview: 'Texte du titre',
        RichTextEditor_checkHeadingDescriptiveReviewHelp:
            'Vérifiez que chaque titre dit de quoi parle sa section, pour qu’on trouve une section à partir des seuls titres.',
        RichTextEditor_checkHeadingEmpty: 'Titre vide',
        RichTextEditor_checkHeadingEmptyHelp:
            'Un titre sans texte apparaît quand même dans la liste des titres que proposent les lecteurs d’écran. Ajoutez son texte ou transformez-le en texte normal.',
        RichTextEditor_checkHeadingSkippedLevel: 'Niveau de titre sauté',
        RichTextEditor_checkHeadingSkippedLevelHelp:
            'Les niveaux de titre forment le plan du document. Un titre ne devrait pas descendre de plus d’un niveau par rapport au titre précédent.',
        RichTextEditor_checkImageAltMissing: 'Image sans texte alternatif',
        RichTextEditor_checkImageAltMissingHelp:
            'Décidez si l’image apporte une information. Si oui, décrivez en quelques mots ce qu’elle montre. Si elle est purement décorative, marquez-la comme décorative.',
        RichTextEditor_checkImageAltSuspicious: 'Texte alternatif qui ne décrit peut-être pas l’image',
        RichTextEditor_checkImageAltSuspiciousHelp:
            'Le texte alternatif ressemble à un nom de fichier ou à un mot générique. S’il ne dit pas ce que montre l’image ni pourquoi elle est là, écrivez plutôt une courte description.',
        RichTextEditor_checkImageContentReview: 'Contenu de l’image',
        RichTextEditor_checkImageContentReviewHelp:
            'Vérifiez si l’image montre du texte qui a sa place dans le document, bouge ou clignote plus de cinq secondes, ou flashe plus de trois fois par seconde.',
        RichTextEditor_checkLanguagePartsReview: 'Passages dans une autre langue',
        RichTextEditor_checkLanguagePartsReviewHelp:
            'Vérifiez si un passage est dans une autre langue que le document. Indiquer sa langue permet aux lecteurs d’écran de bien le prononcer.',
        RichTextEditor_checkLinkPurposeReview: 'Fonction du lien',
        RichTextEditor_checkLinkPurposeReviewHelp:
            'Vérifiez que le texte du lien, avec sa phrase, dit où mène le lien et ce qui se passe quand on le suit.',
        RichTextEditor_checkLinkTextEmpty: 'Lien sans texte',
        RichTextEditor_checkLinkTextEmptyHelp:
            'Un lien a besoin d’un texte qu’un lecteur d’écran peut lire. Ajoutez un texte qui dit où mène le lien.',
        RichTextEditor_checkLinkTextVague: 'Texte de lien qui ne dit pas où il mène',
        RichTextEditor_checkLinkTextVagueHelp:
            'Lisez le texte du lien seul, comme le montre une liste de liens. S’il ne dit pas où mène le lien, comme «\u00A0ici\u00A0» ou «\u00A0lire la suite\u00A0», nommez plutôt la destination.',
        RichTextEditor_checkSensoryReview: 'Instructions qui reposent sur les sens',
        RichTextEditor_checkSensoryReviewHelp:
            'Vérifiez qu’aucune instruction ne repose seulement sur la forme, la couleur, la taille, le son ou l’emplacement sur la page. Nommez aussi l’élément, pour que chacun puisse suivre l’instruction.',
        RichTextEditor_checkStructureReview: 'Structure seulement visuelle',
        RichTextEditor_checkStructureReviewHelp:
            'Vérifiez si une structure n’est montrée que visuellement, comme du texte en gras utilisé comme titre, des paragraphes commençant par un tiret ou un chiffre utilisés comme liste, ou un retrait qui marque une citation. Utilisez plutôt les commandes de titre, de liste et de citation.',
        RichTextEditor_checkVagueLinkTexts:
            'cliquez ici|cliquer ici|cliquez|ici|lien|ce lien|plus|lire la suite|en savoir plus|plus d’infos|plus d’informations|infos|détails|continuer|cette page|site web',
        RichTextEditor_checks: 'Vérifications d’accessibilité',
        RichTextEditor_clearFormatting: 'Effacer la mise en forme',
        RichTextEditor_close: 'Fermer',
        RichTextEditor_code: 'Code',
        RichTextEditor_codeBlock: 'Bloc de code',
        RichTextEditor_codeLanguageMenu: 'Langage du code',
        RichTextEditor_colorMenu: 'Couleur',
        RichTextEditor_columnBreak: 'Saut de colonne',
        RichTextEditor_columnBreakInactive: 'Saut de colonne, inactif',
        RichTextEditor_contextMenu: 'Actions sur la sélection',
        RichTextEditor_convertToText: 'Convertir en texte',
        RichTextEditor_convertedToText: 'Converti en texte',
        RichTextEditor_originalCopied: 'Original copié',
        RichTextEditor_copyContent: 'Copier le contenu',
        RichTextEditor_copyFailed: 'La copie a échoué. Sélectionnez le contenu et copiez-le avec le clavier.',
        RichTextEditor_copyOriginal: 'Copier l’original',
        RichTextEditor_defaultStyle: 'Style par défaut',
        RichTextEditor_divider: 'Séparateur',
        RichTextEditor_emoji: 'Emoji',
        RichTextEditor_gapCursor: 'Entre deux blocs. Saisissez du texte pour ajouter un paragraphe.',
        RichTextEditor_image: 'Image',
        RichTextEditor_imageAlignMenu: 'Alignement de l’image',
        RichTextEditor_imageAltEdit: 'Texte alternatif',
        RichTextEditor_imageAltReviewPrompt: 'L’image a changé. Vérifiez que son texte alternatif la décrit toujours.',
        RichTextEditor_imageReplace: 'Remplacer l’image',
        RichTextEditor_imageReplaceRemoved: 'L’image n’a pas été remplacée, car elle a été supprimée.',
        RichTextEditor_imageSizeCustom: 'Largeur personnalisée…',
        RichTextEditor_imageSizeMenu: 'Taille de l’image',
        RichTextEditor_imageTargetRemoved: 'L’image n’a pas été insérée, car son emplacement a été supprimé.',
        RichTextEditor_imageUnavailable: 'Image indisponible',
        RichTextEditor_italic: 'Italique',
        RichTextEditor_language: 'Langue',
        RichTextEditor_link: 'Lien',
        RichTextEditor_linkNewWindow: '(s’ouvre dans une nouvelle fenêtre)',
        RichTextEditor_mention: 'Mentionner',
        RichTextEditor_mentionFailed: 'La recherche a échoué',
        RichTextEditor_mentionLoadMore: 'Charger plus',
        RichTextEditor_mentionLoading: 'Recherche en cours…',
        RichTextEditor_mentionNoResults: 'Aucun résultat',
        RichTextEditor_mentionOption: '${label}, ${type}, ${position} sur ${total}',
        RichTextEditor_mentionResults: 'Résultats\u00A0: ${count}',
        RichTextEditor_mentionSuggestions: 'Suggestions de mention',
        RichTextEditor_mentionUnavailable: 'indisponible',
        RichTextEditor_mentionUnknown: 'Inconnu (${resourceType})',
        RichTextEditor_more: 'Plus',
        RichTextEditor_moveDown: 'Déplacer vers le bas',
        RichTextEditor_moveUp: 'Déplacer vers le haut',
        RichTextEditor_nodeViewError: 'Cette partie du contenu ne peut pas être affichée',
        RichTextEditor_normalText: 'Texte normal',
        RichTextEditor_numberedList: 'Liste numérotée',
        RichTextEditor_outline: 'Plan',
        RichTextEditor_panelError: 'Ce panneau n’a pas pu s’afficher.',
        RichTextEditor_pasteFormattingRemoved: 'Une partie de la mise en forme a été supprimée.',
        RichTextEditor_pasteMediaDropped: 'Médias non collés\u00A0: ${count}',
        RichTextEditor_pasteTooLarge: 'Le contenu collé est trop volumineux.',
        RichTextEditor_profileLoadFailed: 'Impossible de charger l’éditeur.',
        RichTextEditor_quote: 'Citation',
        RichTextEditor_readerBlockedInvalid: 'Ce contenu ne peut pas être affiché',
        RichTextEditor_readerBlockedUnsupported: 'Ce contenu ne peut pas être affiché ici',
        RichTextEditor_readerIslandFeature: 'Contenu non pris en charge\u00A0: ${feature}',
        RichTextEditor_readerIslandGeneric: 'Contenu non pris en charge',
        RichTextEditor_readerIslandNotice: 'Certains contenus ne sont pas pris en charge ici.',
        RichTextEditor_recoveryMessage:
            'L’éditeur a cessé de fonctionner. Vos dernières modifications sont affichées ci-dessous.',
        RichTextEditor_redo: 'Rétablir',
        RichTextEditor_retry: 'Réessayer',
        RichTextEditor_saveConflict:
            'Quelqu’un d’autre a modifié ce contenu. Vos modifications sont conservées mais pas enregistrées.',
        RichTextEditor_saveFailed: 'L’enregistrement a échoué. Vos modifications ne sont pas enregistrées.',
        RichTextEditor_saveForbidden:
            'Non enregistré\u00A0: vous ne pouvez pas modifier ce contenu. Demandez l’accès ou reconnectez-vous.',
        RichTextEditor_saveIncompatible: 'Non enregistré\u00A0: cet éditeur n’est plus à jour. Rechargez la page.',
        RichTextEditor_saveInvalid:
            'Non enregistré\u00A0: le contenu n’a pas été accepté. Copiez-le pour conserver vos modifications.',
        RichTextEditor_saveOffline: 'Hors ligne. Les modifications seront enregistrées dès votre retour en ligne.',
        RichTextEditor_saveRetrying: 'L’enregistrement a échoué. Nouvelle tentative…',
        RichTextEditor_saveSaved: 'Toutes les modifications sont enregistrées',
        RichTextEditor_saveSaving: 'Enregistrement…',
        RichTextEditor_saveUnsaved: 'Modifications non enregistrées',
        RichTextEditor_slashInsert: 'Insérer',
        RichTextEditor_slashTurnInto: 'Transformer en',
        RichTextEditor_startNumbering: 'Commencer la numérotation à',
        RichTextEditor_strike: 'Barré',
        RichTextEditor_submitEmpty: 'Saisissez du texte avant d’envoyer.',
        RichTextEditor_submitHint:
            'Pour envoyer, appuyez sur ${submit}. Pour une nouvelle ligne, appuyez sur ${newLine}.',
        RichTextEditor_submitHintSingleLine: 'Pour envoyer, appuyez sur ${submit}.',
        RichTextEditor_subscript: 'Indice',
        RichTextEditor_suggestionOption: '${label}, ${position} sur ${total}',
        RichTextEditor_suggestions: 'Suggestions',
        RichTextEditor_superscript: 'Exposant',
        RichTextEditor_taskList: 'Liste de tâches',
        RichTextEditor_textStyle: 'Style de texte',
        RichTextEditor_toolbar: 'Mise en forme du texte',
        RichTextEditor_toolbarAlways: 'Toujours afficher la barre d’outils',
        RichTextEditor_toolbarOnSelection: 'Afficher la barre d’outils uniquement lors d’une sélection',
        RichTextEditor_turnIntoCurrent: 'Transformer en\u00A0: ${type}',
        RichTextEditor_unavailable: 'Non disponible pour la sélection actuelle',
        RichTextEditor_unavailableNotAllowed: 'Non autorisé dans cet éditeur',
        RichTextEditor_unavailableReadOnly: 'Le contenu est en lecture seule',
        RichTextEditor_underline: 'Souligné',
        RichTextEditor_undo: 'Annuler',
        RichTextEditor_uploadCancel: 'Annuler le téléversement',
        RichTextEditor_uploadCancelled: 'Téléversement annulé\u00A0: ${name}',
        RichTextEditor_uploadCompleted: 'Téléversé\u00A0: ${name}',
        RichTextEditor_uploadCompletedNoAlt: 'Téléversé\u00A0: ${name}. L’image n’a pas encore de texte alternatif.',
        RichTextEditor_uploadFailed: 'Échec du téléversement\u00A0: ${name}',
        RichTextEditor_uploadRetry: 'Réessayer le téléversement',
        RichTextEditor_uploadStarted: 'Téléversement\u00A0: ${name}',
        RichTextEditor_uploadStartedCount: 'Téléversement de fichiers\u00A0: ${count}',
        RichTextEditor_uploadTooLarge:
            '${name} n’a pas été téléversé, car le fichier est trop volumineux. Choisissez un fichier de type ${types} de ${size} au maximum.',
        RichTextEditor_uploadTooManyPixels:
            '${name} n’a pas été téléversé, car l’image a trop de pixels. Choisissez une image de ${megapixels} mégapixels au maximum et de ${side} pixels par côté.',
        RichTextEditor_uploadUnreadable:
            '${name} n’a pas été téléversé, car la taille de l’image est illisible. Choisissez un fichier de type ${types} de ${size} au maximum.',
        RichTextEditor_uploadUnsafe:
            '${name} n’a pas été téléversé, car le SVG contient un script. Choisissez un fichier de type ${types} de ${size} au maximum.',
        RichTextEditor_uploadWrongType:
            '${name} n’a pas été téléversé, car ce type de fichier n’est pas accepté. Choisissez un fichier de type ${types} de ${size} au maximum.',
        ...(Object.assign({}, ...Object.values(pluginStrings)) as Record<string, string>),
    },
};
