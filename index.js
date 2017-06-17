"use strict";
function Bataille(nbCartes, nbCouleurs) {
    this.deck = [];
	this.deck1 = [];
	this.deck2 = [];

    for (var c = 1; c <= nbCouleurs; c++) {
        for (var i = 1; i <= nbCartes; i++) {
            this.deck.push(i);
        }
    }
}
  
Bataille.prototype.getDeck = function() {
    return this.deck;
};

/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items The array containing the items.
 */
Array.prototype.shuffle = function() {
	let counter = this.length;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        let temp = this[counter];
        this[counter] = this[index];
        this[index] = temp;
    }

    return this;
}

Bataille.prototype.distribute = function() {
	for (var c = 0; c < this.deck.length; c++) {
		this.deck1.push(this.deck[c]);
		this.deck2.push(this.deck[c+1]);
		c++;
	}
}

Bataille.prototype.transferCards = function(d) {
    var cards = [];
    for (var i = 0; i <= d; i++) {
        cards.push(this.deck1.shift());
        cards.push(this.deck2.shift());
    }
    cards.shuffle();
    if(this.deck1[d] > this.deck2[d]) {
        this.deck1 = this.deck1.concat(cards);
    } else {
        this.deck2 = this.deck2.concat(cards);
    }
}



Bataille.prototype.go = function() {
	this.deck.shuffle();
	this.distribute();


    var t = 0;
    var nbToursMax = 10000;
    var pat = false;

    do {
        var d = 0;
        while (this.deck1[d] === this.deck2[d] && d < this.deck1.length && d < this.deck2.length){
            d = d + 2;
        }
        if (d >= this.deck1.length || d >= this.deck2.length) {
            pat = true;
        } else {
            this.transferCards(d);
        }

        //console.log('Deck1: ' + this.deck1.length + ', Deck2: ' + this.deck2.length + ', niveau de bataille: ' + d/2 + ' Deck1: ' + this.deck1 + ', Deck2: ' + this.deck2);

    } while (!pat && ++t < nbToursMax && this.deck1.length > 0 && this.deck2.length > 0 && this.deck1.length + this.deck2.length === 52);

    if (pat) {
        console.log('PAT!');
    }

    console.log('Nombre de tours: ' + t);

    if (t === nbToursMax) {
        //console.log('Deck1: ' + this.deck1 + ', Deck2: ' + this.deck2);
    }
};


for (var i = 0; i < 100; i++) {
    var b = new Bataille(13, 4);
    b.go();
}


