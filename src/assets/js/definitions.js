import {storeFunctions} from "@/assets/js/store";

export {PlayingCard, createNewPlayingCards, PlayStatus, Player, PlayOptions};

const PlayStatus = Object.freeze(
	{
		"SELECT_FIRST_SEAT": 1,
		"SELECT_MY_CARDS" : 2,
		"SELECT_PLAYER": 3,
		"OPEN_SKAT": 4,
		"CLOSE_SKAT": 5,
		"SELECT_TRUMP" : 6,
		"PLAY" : 7,
		"END" : 8
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
	constructor(color, value, score, ranking) {
		this.color = color;
		this.value = value;
		this.scoreValue = score;
		this.baseRanking = ranking;
		this.reset();
		//  Object.seal(this);      CAUTION:  This breaks the reactivity in Vue.js if used as data in components
	}

	reset() {
		this.owner = null;                  // primary owner when given the cards
		this.played = false;
		this.wonPlayer = null;              // owner after a "round" was made
		this.trump = (this.value === 'jack') ? true : false;   // Jacks are trump per default  (need to be changed for null-games)
		this.ranking = this.baseRanking;
	}

	name() {
		return this.color+" "+this.value;
	}

	toString() {
		return "("+this.name()+")|ranking:"+this.ranking+ "|owner:"+storeFunctions.getPlayersName(this.owner)
	}

}


function createNewPlayingCards() {
	let cards = [];
	[PlayOptions.CLUB,PlayOptions.SPADE, PlayOptions.HEART, PlayOptions.DIAMOND].forEach(cardColor =>
		cardValues.forEach(cardValue => {
				let card = new PlayingCard(cardColor, cardValue.value, cardValue.scoreValue, cardValue.rankingNormal);
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
	{
		value:'ace',
		scoreValue: 11,
		rankingNormal: 7,
		rankingNull: 7
	},
	{
		value:'10',
		scoreValue: 10,
		rankingNormal: 6,
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
		rankingNormal: 50,
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

