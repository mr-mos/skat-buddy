import { createNewPlayingCards, PlayStatus, Player} from "@/assets/js/definitions";


export const store = {

	status : PlayStatus.SELECT_MY_CARDS,

	player : Player.ME,

	cards : createNewPlayingCards(),

	statusName() {
		return Object.keys(PlayStatus).find(key => PlayStatus[key] === this.status)
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
			return;
		}
		switch (store.status) {
			case PlayStatus.SELECT_MY_CARDS:
				card.owner = store.player;
				break;
			default:
				alert("cardClickedAction not defined for status '"+store.statusName()+"' and card: "+card.name());
		}
	}
}

