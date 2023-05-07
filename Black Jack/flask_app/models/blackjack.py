import random


class Card:
    def __init__(self, suit, value):
        self.suit = suit
        self.value = value

    def __repr__(self):
        return f"{self.value} of {self.suit}"

class Deck:
    def __init__(self):
        self.cards = [Card(s, v) for s in ['Spades', 'Clubs', 'Diamonds', 'Hearts']
                    for v in ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']]
        self.shuffle()

    def shuffle(self):
        random.shuffle(self.cards)

    def draw(self):
        return self.cards.pop()

def get_card_value(card):
    if card.value in ['J', 'Q', 'K']:
        return 10
    elif card.value == 'A':
        return 11
    else:
        return int(card.value)

def get_card_count(card):
    if card.value in ['2', '3', '4', '5', '6']:
        return 1
    elif card.value in ['7', '8', '9']:
        return 0
    else:
        return -1

def main():
    deck = Deck()
    running_count = 0
    true_count = 0
    num_decks = 1

    # Simulate playing some hands
    for _ in range(10):
        player_hand = [deck.draw(), deck.draw()]
        print("Player hand:", player_hand)

        running_count += sum(get_card_count(card) for card in player_hand)
        true_count = running_count // ((len(deck.cards) / 52) * num_decks)
        print("Running count:", running_count)
        print("True count:", true_count)
        print()