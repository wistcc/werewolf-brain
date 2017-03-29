const assert = require('assert');
const cards = require('./src/cards');
const decks = require('./src/decks');
const moderator = require('./src/moderator');
const game = require('./src/game');
const languages = require('./src/languages');

exports.getCards = cards.getAll;
exports.getDecks = decks.getAll;
exports.gameModes = game.mode;
exports.getDeck = decks.get;
exports.getScriptFromDeck = moderator.getScriptFromDeck;
exports.getLanguages = languages.getLanguages;
exports.translateDeck = languages.translateDeck;

exports.getGame = (players, options) => {
    const language = options.language || 'en';
    const mode = options.mode || game.mode.NORMAL;
    const deck = options.deck || decks.get.all;
    let deckName = options.deckName || 'custom';
    deckName = deckName.toLowerCase();

    assert(players > 0, 'Players must be greater than 0.');
    assert(!decks[deckName] && deckName !== 'custom', `Deck ${deckName} is not defined.`);

    if (decks[deckName]) return game.create(players, language, cards.inDeck(deckName), mode);
    return game.create(players, language, cards.inCustomDeck(deck), mode);
};
