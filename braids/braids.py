# April Shen

# TODO:
# - better error checking / messages
# - more levels
# - GUI (D3)

import pico  # for calling from JS
from copy import copy

class BraidGame:

    def __init__(self):
        # This string gives the order in which we define actions, from
        # left to right.  E.g., 'a' corresponds to swapping the
        # leftmost two letters, etc.
        self.dictionary = 'ateoinshrdlucmfwypvbgkjqxz'
        # This gives the initial and target strings for each level.
        self.all_levels = [
            (['t', 'a'], ['a', 't']),
            (['o', 'e', 't'], ['t', 'o', 'e'])
            ]
        self.level = 0
        self.reset()

    def reset(self):
        # Resets current and target to the strings in levels.
        self.current = copy(self.all_levels[self.level][0])
        self.target = copy(self.all_levels[self.level][1])

    def advance(self):
        # Advances one level and returns true if successful.
        self.level += 1
        if self.level >= len(self.all_levels):
            return False
        else:
            self.reset()
            return True
        
    def swap(self, i, j):
        # Swaps current[i] with current[j].
        temp = self.current[i]
        self.current[i] = self.current[j]
        self.current[j] = temp

    def unscramble(self, word):
        # Unscrambles current using the actions defined by word.
        # Returns true if current == target, otherwise resets
        # and returns false.
        for char in word:
            i = self.dictionary.index(char)
            if i > -1 and i < len(self.current)-1:
                self.swap(i, i+1)
        if self.current == self.target:
            return True
        else:
            self.reset()
            return False

### end class BraidGame

def play_round(game):
    # Returns true if this level not won yet.
    line = raw_input(''.join(game.current) + '?: ')
    if game.unscramble(line):
        print ''.join(game.current), '==> good job!'
        return False
    else:
        print 'try again!'
        return True

def main():
    game = BraidGame()
    while True:
        while play_round(game):
            pass
        if not game.advance():
            print 'you win it all! :)'
            break

if __name__ == '__main__':
    main()
