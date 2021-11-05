import {createNewPlayingCards, Player, PlayOptions, PlayStatus} from "@/assets/js/definitions";


export const store = {

	status: PlayStatus.SELECT_FIRST_SEAT,

	player: null,            // how needs to do an action currently

	soloPlayer: null,             // "Alleinspieler" in current round

	selectedTrump: null,          // from PlayOptions

	firstSeatPlayer: null,

	gameCounter: 1,

	roundCount: 0,

	roundCards: [],             // cards played in this round (0 to 3 cards)

	cards: createNewPlayingCards(),

	statusName() {
		return Object.keys(PlayStatus).find(key => PlayStatus[key] === this.status)
	},

	cardsOwnedCount(player) {
		return this.cards.filter(card => card.owner === player).length
	},

	cardsPlayedCount(player) {
		return this.cards.filter(card => card.owner === player && card.played).length
	}


}


export const storeFunctions = {

	resetStoreStatus(includeFirstSeatPlayer = false) {
		store.cards.forEach(card => card.reset());
		store.soloPlayer = null;
		store.player = null;
		store.gameCounter++;
		store.status = PlayStatus.SELECT_FIRST_SEAT;
		store.firstSeatPlayer = (store.firstSeatPlayer != null && includeFirstSeatPlayer) ? (store.firstSeatPlayer % 3) + 1 : null;
		store.roundCards = [];
		store.roundCount = 0;
		internalFunctions.checkStatus();
	},

	cardClickedAction(card) {
		switch (store.status) {
			case PlayStatus.SELECT_MY_CARDS:
			case PlayStatus.OPEN_SKAT:
				if (card.owner) {
					card.owner = null;
				} else {
					card.owner = store.player;
				}
				break;
			case PlayStatus.SELECT_PLAYER:
				if (card.owner) {
					card.owner = null;
				}
				break;
			case PlayStatus.CLOSE_SKAT:
				if (card.owner === Player.ME) {
					card.played = true;
					card.wonPlayer = Player.ME;
				}
				break;
			case PlayStatus.SELECT_TRUMP:
				if (card.value === 'jack') {
					store.selectedTrump = PlayOptions.GRAND;
				} else {
					store.selectedTrump = card.color;
					store.cards.forEach(card => {
							if (card.color === store.selectedTrump) {
								card.trump = true;
							}
						}
					);
				}
				internalFunctions.increaseRankingForTrumpCards();
				break;
			case PlayStatus.PLAY:
				if (card.played) {
					alert("Die Karte wurde schon gespielt!")
				} else if (card.owner && card.owner !== store.player) {
					alert("Die Karte gehört " + storeFunctions.getPlayersName(card.owner) + " und kann nicht von " + storeFunctions.getPlayersName(store.player) + " gespielt werden.");
				} else if (store.player === Player.ME && card.owner !== store.player) {
					alert("Du kannst nur deine eigenen Karten spielen!")
				} else {
					card.played = true;
					card.owner = store.player;
					store.roundCards.push(card);
					console.log("Round Nr:" + store.roundCount + " & cards: " + store.roundCards.map(c => c.toString()).join("   "))
					if (store.roundCards.length === 3) {
						let currentWinner = internalFunctions.setRoundWinner();
						store.player = currentWinner
					} else {
						store.player = (store.player % 3) + 1
					}
				}
				break;
			default:
				alert("cardClickedAction not defined for status '" + store.statusName() + "' and card: " + card.name());
		}
		internalFunctions.checkStatus();
	},

	playerClickedAction(player) {
		switch (store.status) {
			case PlayStatus.SELECT_PLAYER:
				store.soloPlayer = player;
				break;
			case PlayStatus.SELECT_FIRST_SEAT:
				store.firstSeatPlayer = player;
				break;
			default:
				alert("playerClickedAction not defined for status '" + store.statusName() + "' and player: " + this.getPlayersName(player));
		}
		internalFunctions.checkStatus();
	},

	handGameClicked() {
		store.status = PlayStatus.SELECT_TRUMP;
	},


	/////////////// Player stuff ////////////////////

	countPlayerCars(player) {
		return store.cards.filter(card => card.owner === player).length;
	},

	isActivePlayer(player) {
		return player === store.player
	},

	isFirstSeat(player) {
		return player === store.firstSeatPlayer
	},

	getSoloPlayer() {
		return store.soloPlayer;
	},

	getPlayersName(player) {
		return Object.keys(Player).find(key => Player[key] === player)
	},


	/////////////// Others ////////////////////

	getPointsSoloplayer() {
		return store.cards.filter(card => card.wonPlayer === store.soloPlayer).reduce((sum, prevCard) => sum + prevCard.scoreValue, 0);
	},

	getPointsOthers() {
		return store.cards.filter(card => card.wonPlayer != null && card.wonPlayer !== store.soloPlayer).reduce((sum, prevCard) => sum + prevCard.scoreValue, 0);
	},

	translatePlayOption(playOption) {
		switch (playOption) {
			case PlayOptions.CLUB:
				return "Kreuz";
			case PlayOptions.SPADE:
				return "Pik";
			case PlayOptions.HEART:
				return "Herz";
			case PlayOptions.DIAMOND:
				return "Karo";
			case PlayOptions.GRAND:
				return "Grand";
		}
	}

}


const internalFunctions = {

	checkStatus() {
		switch (store.status) {
			case PlayStatus.SELECT_FIRST_SEAT:
				if (store.firstSeatPlayer != null) {
					store.status = PlayStatus.SELECT_MY_CARDS;
					store.player = Player.ME;
				}
				break;
			case PlayStatus.SELECT_MY_CARDS:
				if (store.cardsOwnedCount(Player.ME) == 10) {
					store.status = PlayStatus.SELECT_PLAYER;
					store.player = null;
				}
				break;
			case PlayStatus.SELECT_PLAYER:
				if (store.cardsOwnedCount(Player.ME) < 10) {
					console.log("Going back to SELECT_MY_CARDS status...")
					store.status = PlayStatus.SELECT_MY_CARDS;
					store.player = Player.ME;
				} else if (store.soloPlayer) {
					if (store.soloPlayer === Player.ME) {
						store.status = PlayStatus.OPEN_SKAT;
						store.player = Player.ME;
					} else {
						store.status = PlayStatus.SELECT_TRUMP;
					}
				}
				break;
			case PlayStatus.OPEN_SKAT:
				if (store.cardsOwnedCount(Player.ME) == 12) {
					store.status = PlayStatus.CLOSE_SKAT;
				}
				break;
			case PlayStatus.CLOSE_SKAT:
				if (store.cardsPlayedCount(Player.ME) == 2) {
					store.status = PlayStatus.SELECT_TRUMP;
				}
				break;
			case PlayStatus.SELECT_TRUMP:
				if (store.selectedTrump) {
					this.setPlayStatus();
				}
				break;
			case PlayStatus.PLAY:
				if (store.roundCount == 10) {
					store.status = PlayStatus.END;
					this.assignUnkownSkat();
				}
				break;
		}
	},

	setPlayStatus() {
		store.status = PlayStatus.PLAY;
		store.player = store.firstSeatPlayer;
	},

	increaseRankingForTrumpCards() {
		store.cards.forEach(card => {
				if (card.trump) {
					card.ranking = card.baseRanking + 10;
					if (card.value === 'jack') {
						card.ranking += [PlayOptions.DIAMOND, PlayOptions.HEART, PlayOptions.SPADE, PlayOptions.CLUB].indexOf(card.color);
					}
				}
			}
		);
		store.cards.sort((a, b) => b.ranking - a.ranking)
	},

	setRoundWinner() {
		if (store.roundCards.length !== 3) {
			console.error("Three cards need to be played")
			return;
		}
		let firstCard = store.roundCards[0];
		store.roundCards.sort((a, b) => b.ranking - a.ranking);      // sort cards in ranking order
		let winnerCard;
		if (store.roundCards[0].trump) {
			winnerCard = store.roundCards[0];           // trump always wins
		} else {
			winnerCard = store.roundCards.find(c => c.color === firstCard.color);   // highest card with round-color wins
		}
		store.roundCards.forEach(card =>
			card.wonPlayer = winnerCard.owner
		);
		console.log("Winner: " + storeFunctions.getPlayersName(winnerCard.owner) + "  (Points:" + store.roundCards.reduce((sum, prevCard) => sum + prevCard.scoreValue, 0) + ")");
		store.roundCards = [];
		store.roundCount++;
		return winnerCard.owner;
	},

	assignUnkownSkat() {
		let notPlayedCards = store.cards.filter(card => !card.played)
		if (notPlayedCards.length == 2) {
			notPlayedCards.forEach(card => {
					card.played = true;
					card.owner = store.soloPlayer;
					card.wonPlayer = storeFunctions.getSoloPlayer();
				}
			)
		}
	}

}

