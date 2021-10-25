export {PlayingCard, createNewPlayingCards, PlayStatus, Player, PlayOptions};

const PlayStatus = Object.freeze(
	{
		"SELECT_FIRST_SEAT": 1,
		"SELECT_MY_CARDS" : 2,
		"SELECT_PLAYER": 3,
		"OPEN_SKAT": 4,
		"CLOSE_SKAT": 5,
		"SELECT_TRUMP" : 6,
		"PLAY" : 7
	}
)

const Player = Object.freeze(
	{
		"ME": 1,
		"LEFT": 2,
		"RIGHT": 3
	}
)

const PlayOptions = Object.freeze(
	{
		CLUB: "club",
		SPADE: "spade",
		HEART: "heart",
		DIAMOND: "diamond",
		GRAND: "grand"
		// NULL not implemented yet
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
		this.trump = (this.value === 'jack') ? true : false;   // Jacks are trump per default  (need to be changed for null-games)
		this.played = false;
	}

	name() {
		return this.color+" "+this.value;
	}
}


function createNewPlayingCards() {
	let cards = [];
	[PlayOptions.CLUB,PlayOptions.SPADE, PlayOptions.HEART, PlayOptions.DIAMOND].forEach(cardColor =>
		cardValues.forEach(cardValue => {
				let card = new PlayingCard(cardColor, cardValue.value);
				cards.push(card);
			}
		)
	)
	return cards;
}



// eslint-disable-next-line no-unused-vars
const cardColorPoints = [
	{
		name: PlayOptions.GRAND,
		baseValue: 24
	},
	{
		name: PlayOptions.CLUB,
		baseValue: 12
	},
	{
		name: PlayOptions.SPADE,
		baseValue: 11
	},
	{
		name: PlayOptions.HEART,
		baseValue: 10
	},
	{
		name: PlayOptions.DIAMOND,
		baseValue: 9
	}
]


const cardValues = [
	// TODO  use an JS object-definition instead of a map here and deal with "trump"; e.g. rankingNormal + 10
	{
		value:'ace',
		scoreValue: 11,
		rankingNormal: 6,
		rankingNull: 7
	},
	{
		value:'10',
		scoreValue: 10,
		rankingNormal: 5,
		rankingNull: 3,
	},
	{
		value:'king',
		scoreValue: 4,
		rankingNormal: 5,
		rankingNull: 6,
	},
	{
		value:'queen',
		scoreValue: 3,
		rankingNormal: 4,
		rankingNull: 5,
	},
	{
		value:'jack',
		scoreValue: 2,
		rankingNormal: 70,
		rankingNull: 4,
	},
	{
		value:'9',
		scoreValue: 0,
		rankingNormal: 2,
		rankingNull: 2,
	},
	{
		value:'8',
		scoreValue: 0,
		rankingNormal: 1,
		rankingNull: 1,
	},
	{
		value: '7',
		scoreValue: 0,
		rankingNormal: 0,
		rankingNull: 0,
	}
]

