import {createNewPlayingCards, Player, PlayStatus} from "@/assets/js/definitions";


export const store = {

	status: PlayStatus.SELECT_MY_CARDS,

	player: Player.ME,            // how needs to do an action currently

	soloPlayer: null,             // "Alleinspieler" in current round

	firstSeatPlayer: Player.RIGHT,  // FIXME  "Vorhand"

	cards: createNewPlayingCards(),

	statusName() {
		return Object.keys(PlayStatus).find(key => PlayStatus[key] === this.status)
	},

	cardsOwnedCount() {
		return this.cards.filter(card => card.owner).length
	}


}


export const storeFunctions = {

	resetStoreStatus() {
		store.cards.forEach(card => card.reset());
		store.status = PlayStatus.SELECT_MY_CARDS;
		store.player = Player.ME;
		store.soloPlayer = null;
		store.firstSeatPlayer = null;
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
			default:
				alert("playerClickedAction not defined for status '" + store.statusName() + "' and player: " + this.getPlayersName(player));
		}
		internalFunctions.checkStatus();
	},

	handGameClicked() {
		store.status = PlayStatus.PLAY;
	},


	/////////////// Player stuff ////////////////////

	countPlayerCars(player) {
		return store.cards.filter(card => card.owner === player).length;
	},

	isActivePlayer(player) {
		return player === store.player
	},

	getPlayersName(player) {
		return Object.keys(Player).find(key => Player[key] === player)
	}

}


const internalFunctions = {

	checkStatus() {
		switch (store.status) {
			case PlayStatus.SELECT_MY_CARDS:
				if (store.cardsOwnedCount() == 10) {
					store.status = PlayStatus.SELECT_PLAYER;
					store.player = null;
				}
				break;
			case PlayStatus.SELECT_PLAYER:
				if (store.cardsOwnedCount() < 10) {
					console.log("Going back to SELECT_MY_CARDS status...")
					store.status = PlayStatus.SELECT_MY_CARDS;
					store.player = Player.ME;
				} else if (store.soloPlayer) {
					if (store.soloPlayer === Player.ME) {
						store.status = PlayStatus.OPEN_SKAT;
						store.player = Player.ME;
					} else {
						store.status = PlayStatus.PLAY;
						store.player = store.firstSeatPlayer;
					}
				}
				break;
			case PlayStatus.OPEN_SKAT:
				if (store.cardsOwnedCount() == 12) {
					store.status = PlayStatus.CLOSE_SKAT;
				}
				break;
		}
	}
}

