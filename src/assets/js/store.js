import { createNewPlayingCards, PlayStatus, Player} from "@/assets/js/definitions";


export const store = {

	status : PlayStatus.SELECT_MY_CARDS,

	player : Player.ME,

	cards : createNewPlayingCards(),

	statusName() {
		return Object.keys(PlayStatus).find(key => PlayStatus[key] === this.status)
	},

	cardsOwnedCount() {
		return this.cards.filter( card => card.owner).length
	}


}


export const storeFunctions = {

	resetStoreStatus() {
		store.cards.forEach( card => card.reset());
		store.status = PlayStatus.SELECT_MY_CARDS;
		store.player = Player.ME;
	},

	cardClickedAction(card) {
		if (card.owner) {
			// delete owner
			card.owner = null;
		} else {
			switch (store.status) {
				case PlayStatus.SELECT_MY_CARDS:
					card.owner = store.player;
					break;
				default:
					alert("cardClickedAction not defined for status '"+store.statusName()+"' and card: "+card.name());
			}
		}
		internalFunctions.checkStatus();
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
				}
				break;
			case PlayStatus.SELECT_PLAYER:
				if (store.cardsOwnedCount() < 10) {
					store.status = PlayStatus.SELECT_MY_CARDS;
				}
				break;
		}
	}
}

