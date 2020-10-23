# tiger on a Hunt

import random
randomnumber = random.randint(1,6)
tries = 1

import sys

max_val = 100

tiger = {
    8: 4,
    18: 1,
    26: 10,
    39: 5,
    51: 6,
    54: 36,
    56: 1,
    60: 23,
    75: 28,
    83: 45,
    85: 59,
    90: 48,
    92: 25,
    97: 87,
    99: 63
}

slide = {
    3: 20,
    6: 14,
    11: 28,
    15: 34,
    17: 74,
    22: 37,
    38: 59,
    49: 67,
    57: 76,
    61: 78,
    73: 86,
    81: 98,
    88: 91   
}


player1 ={
    "name": "player1",
    "score": 0,
    "location": "start"
}

player2 ={
    "name": "player2",
    "score": 0,
    "loaction": "start"
}

def reactions(name):
    if (name == "bite"):
        print ("  /\/|  _____          _   _  _____   _____ _______   /\/| ")
        print (" |/\/  |  __ \   /\   | \ | |/ ____| |_   _|__   __| |/\/ ")
        print ("       | |  | | /  \  |  \| | |  __    | |    | |         ")
        print ("       | |  | |/ /\ \ | . ` | | |_ |   | |    | |         ")
        print ("       | |__| / ____ \| |\  | |__| |  _| |_   | |         ")
        print ("       |_____/_/    \_\_| \_|\_____| |_____|  |_|         ")

    if (name == "slide"):
        print (" /\/| __          ______   ____  _    _  ____   ____    /\/| ")
        print ("|/\/  \ \        / / __ \ / __ \| |  | |/ __ \ / __ \  |/\/ ")
        print ("       \ \  /\  / / |  | | |  | | |__| | |  | | |  | |      ")
        print ("        \ \/  \/ /| |  | | |  | |  __  | |  | | |  | |        ")
        print ("         \  /\  / | |__| | |__| | |  | | |__| | |__| |      ")
        print ("          \/  \/   \____/ \____/|_|  |_|\____/ \____/       ")

def printGraphics(name):
    if (name == "tittle"):
         print ("-----------------------------------------------------------------------------")
         print ("-----------------------------------------------------------------------------")
         print ("  _______ _                                         _                 _   ")
         print (" |__   __(_)                                       | |               | |  ")
         print ("    | |   _  __ _  ___ _ __    ___  _ __     __ _  | |__  _   _ _ __ | |_  ")
         print ("    | |  | |/ _` |/ _ \ '__|  / _ \| '_ \   / _` | | '_ \| | | | '_ \| __| ")
         print ("    | |  | | (_| |  __/ |    | (_) | | | | | (_| | | | | | |_| | | | | |_  ")
         print ("    |_|  |_|\__, |\___|_|     \___/|_| |_|  \__,_| |_| |_|\__,_|_| |_|\__| ")
         print ("            __/  |                                                           ")
         print ("           |____/                                                         ")
         print ("-----------------------------------------------------------------------------")
         print ("-----------------------------------------------------------------------------")

    if (name == "rules"):
        print ("Rules:")
        print ("1. We need 2 playes to play this game. ")
        print ("2. Each player rolls the dice to move forward")
        print ("3. First player to get to the finish line is the winner. ")

def introStory():
    print ("Hello there. Good to see you!")
    player1["name"] = input("Player1, please enter your name >")
    player2["name"] = input("Player2, enter your name >")
    print ("Match will be played between " + str(player1["name"]) + " and " + str(player2["name"]) + ". Lets see who wins!!")

def rollDice():
    result = random.randint(1,6)
    print ("It's a: " + str(result))
    return result

def got_tiger_bite(old_result, current_result):
    print (reactions("bite"))
    print ( " Got a Tiger bite. Down from " + str(old_result) + " to " + str(current_result))

def got_slide_up(old_result, current_result):
    print (reactions("slide"))
    print (" SLIDE!! Going up from " + str(old_result) + " to " + str(current_result))

def huntPlayer1(current_result, result):
    old_result = current_result
    current_result = current_result + result

    if current_result > max_val:
        print ("You need " + str(max_val - old_result) + " to win this game. Keep trying! ")
        return old_result

    print (str(player1["name"]) + " moved from " + str(old_result) + " to " + str(current_result))
    if current_result in tiger:
        final_result = tiger.get(current_result)
        got_tiger_bite(current_result, final_result)
    
    elif current_result in slide:
        final_result = slide.get(current_result)
        got_slide_up(current_result, final_result)

    else:
        final_result = current_result

    return final_result

def huntPlayer2(current_result, result):
    old_result = current_result
    current_result = current_result + result

    if current_result > max_val:
        print ("You need " + str(max_val - old_result) + " to win this game. Keep trying! ")
        return old_result

    print (str(player2["name"]) + " moved from " + str(old_result) + " to " + str(current_result))
    if current_result in tiger:
        final_result = tiger.get(current_result)
        got_tiger_bite(current_result, final_result)
    
    elif current_result in slide:
        final_result = slide.get(current_result)
        got_slide_up(current_result, final_result)

    else:
        final_result = current_result

    return final_result

def check_win(position):
    if max_val == position:
       print ("The End. You won the game!!! ")
       print("Thank you for playing the game. Congratulations!! ")
       sys.exit(1)

def main(): 
    printGraphics("tittle")
    printGraphics("rules")
    introStory()

    player1_current_position = 0
    player2_current_position = 0
    
    while True:
        input_1 = input( str(player1["name"]) + " Hit enter to roll dice: ")
        print("Rolling dice...")
        result = rollDice()
        print (str(player1["name"]) + " moving... ")
        player1_current_position = huntPlayer1(player1_current_position, result)

        check_win(player1_current_position)

        input_2 = input( str(player2["name"]) + " Hit enter to roll dice: ")
        print("Rolling dice...")
        result = rollDice()
        print (str(player2["name"]) + " moving... ")
        player2_current_position = huntPlayer2(player2_current_position, result)



main()



