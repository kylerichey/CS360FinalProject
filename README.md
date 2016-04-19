# CS360FinalProject

##Executive Summary
The goal of this project was to create an incremental game about the life of a college student using the MEAN stack. Although other games of this type exist, this project is unique because it
uses user authentication to store and save the game state. This allows players to save the
game at any point and return to it on any computer. This goal resulted in a complete and
enjoyable game with potential for additional content.

##Functional Description
The goal this application is to be a fun and addicting game. Games of this type are not meant to
always be actively played. Instead it is intended that it runs in the background for some interval
of time. When the player returns to the game, he can quickly spend the accumulated resources
and queue up new activities for the next time. It is intended that the player is able to spend as
much time as he wants in the game during any given session, while still enjoying an engaging
experience. 
This is accomplished by creating short and long term activities within the game.
Some resources accumulate quickly and cap out, while others generate slowly without any limit. This results in a meaningful experience every time you log in, whether it be for 30 seconds or an
hour.

## Methods
###Login and Registration
This page serves as the entry point into the application. Registration is required to play the
game. The user creates an account and then may enter the game. This ensures that when the
game autosaves the game state is stored and connected to the correct user. This allows the
user to play the game on any computer.

The login and registration views have been refined. Any errors are rendered to the page using
EJS. The page validates that a username exists, passwords match, and that after registration,
that username is unique. It also validates that passwords are not empty.

![alt text](https://github.com/kylerichey/CS360FinalProject/blob/master/images/image10.png)

###Self
The Self tab is the primary tab of the Student Game. In the center column, the buttons on
display a single unique resource. An item’s cost will increase based on the quantity already
purchased of that item. The number on the button updates to reflect the current cost. In the left
column, the primary game data is displayed. This includes the player's name, the current date,
current energy level, and the current amount of various resources, with their respective
automatically generating rates. In the rightmost column, the game displays important
information, error messages, and progress.

In the top right corner is the Save Game button. Pressing this button stores the entire state of
the game on the Mongo database. This allows the player to resume play where they left off. The
game autosaves every minute, and notifies the user in the Output pane. Next to the save button
there is a drop down tab providing basic options. These include a reset button that clears the
entire game, a debug button that provides immediate access to all of the game’s content and a
large amount of resources, and a change log which shows the development roadmap. Last is
the logout button which saves the game and returns the user to the login screen.


![alt text](https://github.com/kylerichey/CS360FinalProject/blob/master/images/image05.png)

###Side Jobs
New tabs are unlocked based on gameplay. Discovering which activities unlock a new tab is
part of the game. Side Jobs are opened when the player buys their first book. Side jobs use
energy, a resource which refills at a fixed rate and cannot be upgraded. Like every button in the
game, the specific job will switch between active or disabled based on current availability of the
required resource. In the screencap below, the Summer Sales job is not illuminated because the
player only has 25 energy at that moment and it requires 35. However the Tutor job only
requires 25 energy so it is available to click. Jobs trade player energy for pennies. The reward
from a job scales based on the current amount of resources. The total reward is automatically
calculated and displayed in the hover over tooltip.


![alt text](https://github.com/kylerichey/CS360FinalProject/blob/master/images/image12.png)



