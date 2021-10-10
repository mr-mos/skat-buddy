import { createNewPlayingCards} from "@/assets/js/definitions";


export const store = {

	cards :	createNewPlayingCards(),

	resetStatus() {
		this.cards.forEach( card => card.reset());
	}

}

