export const cardColors = [
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


export const cardValues = {
	// TODO  use an JS object-definition instead of a map here and deal with "trump"; e.g. rankingNormal + 10
	'7' : {
		scoreValue: 0,
		rankingNormal: 0,
		rankingNull: 0,
	},
	'8' : {
		scoreValue: 0,
		rankingNormal: 1,
		rankingNull: 1,
	},
	'9' : {
		scoreValue: 0,
		rankingNormal: 2,
		rankingNull: 2,
	},
	'10' : {
		scoreValue: 10,
		rankingNormal: 5,
		rankingNull: 3,
	},
	'jack' : {
		scoreValue: 2,
		rankingNormal: 70,
		rankingNull: 4,
	},
	'queen' : {
		scoreValue: 3,
		rankingNormal: 4,
		rankingNull: 5,
	},
	'king' : {
		scoreValue: 4,
		rankingNormal: 5,
		rankingNull: 6,
	},
	'ace' : {
		scoreValue: 11,
		rankingNormal: 6,
		rankingNull: 7
	}
}

