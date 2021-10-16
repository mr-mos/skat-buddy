export {PlayingCard, createNewPlayingCards, PlayStatus, Player};

const PlayStatus = Object.freeze(
	{
		"SELECT_MY_CARDS" : 1,
		"SELECT_PLAYER": 2,
		"OPEN_SKAT": 3,
		"CLOSE_SKAT": 4,
		"PLAY" : 5
	}
)

const Player = Object.freeze(
	{
		"LEFT": 1,
		"ME": 2,
		"RIGHT": 3
	}
)

class PlayingCard {
	constructor(color, value) {
		this.color = color;
		this.value = value;
		this.reset();
		//  Object.seal(this);      CAUTION:  This breaks the reactivity in Vue.js if used as data in components
	}

	reset() {
		this.owner = null;
		this.trump = false;
		this.played = false;
	}

	name() {
		return this.color+" "+this.value;
	}
}


function createNewPlayingCards() {
	let cards = [];
	cardColors.forEach(cardColor =>
		cardValues.forEach(cardValue => {
				let card = new PlayingCard(cardColor.name, cardValue.value);
				if (card.value === 'jack') {              // Jacks are trump per default  (need to be changed for null-games)
					card.trump = true;
				}
				cards.push(card);
			}
		)
	)
	return cards;
}


const cardColors = [
	{
		name: 'club',
		baseValue: 12
	},
	{
		name: 'spade',
		baseValue: 11
	},
	{
		name: 'heart',
		baseValue: 10
	},
	{
		name: 'diamond',
		baseValue: 9
	}
]


const cardValues = [
	// TODO  use an JS object-definition instead of a map here and deal with "trump"; e.g. rankingNormal + 10
	{
		value: '7',
		scoreValue: 0,
		rankingNormal: 0,
		rankingNull: 0,
	},
	{
		value:'8',
		scoreValue: 0,
		rankingNormal: 1,
		rankingNull: 1,
	},
	{
		value:'9',
		scoreValue: 0,
		rankingNormal: 2,
		rankingNull: 2,
	},
	{
		value:'10',
		scoreValue: 10,
		rankingNormal: 5,
		rankingNull: 3,
	},
	{
		value:'jack',
		scoreValue: 2,
		rankingNormal: 70,
		rankingNull: 4,
	},
	{
		value:'queen',
		scoreValue: 3,
		rankingNormal: 4,
		rankingNull: 5,
	},
	{
		value:'king',
		scoreValue: 4,
		rankingNormal: 5,
		rankingNull: 6,
	},
	{
		value:'ace',
		scoreValue: 11,
		rankingNormal: 6,
		rankingNull: 7
	}
]

