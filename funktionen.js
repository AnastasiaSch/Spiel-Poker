'use strict'

// 1:Pruefung auf Name und Kartenfarbe
const SUITS = '♠♥♦♣'
const NAMES = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']

const toName = card => card.substring(0, 2) === '10' ? '10' : card.substring(0, 1)
const toSuit = card => card[card.length - 1] 

// 2:Validierung
const isValidCard = card => 
    NAMES.includes(toName(card)) && SUITS.split('').includes(toSuit(card)) ? true : false
const allCardsHand = cards => cards.map(el => isValidCard(el) === true ? el : false).includes(false) ? false : true
const isValidHand = cards => cards.length === 5 && allCardsHand(cards) === true

// 3: Sortierung
const sortHand = cards => cards.sort(compareCards)
const compareCards = (a, b) => {
  const namesIndexA = NAMES.indexOf(toName(a))
  const namesIndexB = NAMES.indexOf(toName(b))
  const suitsIndexA = SUITS.split('').indexOf(toSuit(a))
  const suitsIndexB = SUITS.split('').indexOf(toSuit(b))
  const suitsLength = SUITS.length

  return (suitsLength * namesIndexA + suitsIndexA) - (suitsLength * namesIndexB + suitsIndexB)
}

// 4: Kategorisierung
const isFlush = card => card.every((i) => {
    const suitA = card => card.filter((i) => toSuit(i) === "♠") 
    const suitB = card => card.filter((i) => toSuit(i) === "♥") 
    const suitC = card => card.filter((i) => toSuit(i) === "♦") 
    const suitD = card => card.filter((i) => toSuit(i) === "♣") 
   
    return (suitA(card).length || suitB(card).length || suitC(card).length || suitD(card).length) === 5 
})

const isStraight = card => {
    const cardsName = card => card.map((el) => toName(el)) 
    const cardsNameSort = card => cardsName(card).sort((a, b) => NAMES.indexOf(toName(a)) - NAMES.indexOf(toName(b))) //['5', '10', 'J', 'Q', 'A']
    const cardsNameString = cardsNameSort(card).join('')
    const allNamesString = NAMES.join('')

    return allNamesString.includes(cardsNameString)
}

const isStraightFlush = card => isFlush(card) && isStraight(card)

const isRoyalFlush = card => {
    const cardsName = card => card.map((el) => toName(el)) 
    const cardsNameHoch = '10' && 'J' && 'Q' && 'K' && 'A'
    const iscardsNameHoch = card => cardsName(card).includes(cardsNameHoch)
    return  isFlush(card) && iscardsNameHoch(card)
}


