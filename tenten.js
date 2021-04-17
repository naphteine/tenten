// Functions
function shuffle(array) {
	let currentIndex = array.length, temporaryValue, randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}

function openCard(id) {
	cards[id].innerHTML = "<p style='text-align: center; font-size: 48px;'>&#x" + cardInfos[id] + ";</p>";
	cards[id].style.background = "hsl(37, 18%, 91%)";
	cardOpen[id] = true;
}

function closeCard(id) {
	cards[id].innerHTML = "";
	cards[id].style.background = "hsl(37, 18%, 61%)";
	cardOpen[id] = false;
}

// Variables
var cards = document.querySelectorAll(".closed-card");
var cardOpen = new Array(cards.length);
var cardClickable = new Array(cards.length);
var previousCard = -1;

var cardInfos = [
	"1F600", "1F603", "1F604", "1F923", "1F607", "1F61A", "1F911", "1F47F", "1F971", "1F47A", "1F63A", "1F64A",
	"1F600", "1F603", "1F604", "1F923", "1F607", "1F61A", "1F911", "1F47F", "1F971", "1F47A", "1F63A", "1F64A",
];

// Main code
cardInfos = shuffle(cardInfos);

for (let i = 0; i < cards.length; i++) {
	// Initialize values
	cardOpen[i] = false;
	cardClickable[i] = true;

	// Add onclick listener
	cards[i].onclick = function() {
		// If card is not clickable, do nothing
		if (cardClickable[i] == false) {
			return;
		}

		// Close the card, if it's already opened
		if (cardOpen[i] == true) {
			// Close the card
			closeCard(i);
			previousCard = -1;
		}

		// Display the card
		openCard(i);

		// Compare with previous one
		if (previousCard == -1) { // There are no cards opened before.
			previousCard = i;
		} else if (cardInfos[previousCard] == cardInfos[i] && i != previousCard) {
			cardClickable[previousCard] = false;
			cardClickable[i] = false;
			previousCard = -1;
		} else { // Cards not match
			// Wait 500ms and close them both
			setTimeout(function () {
				closeCard(i);
				closeCard(previousCard);
				previousCard = -1;
			}, 500);
		}
	}
}