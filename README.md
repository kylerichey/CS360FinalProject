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
![alt text](https://github.com/kylerichey/CS360FinalProject/blob/master/images/image07.png)
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

###Classes
The Classes tab is opened upon purchase of the player’s first book. Taking a class requires a
certain amount of books. It also unlocks a new resource called knowledge and grants a small
amount over time. Studying requires pencils and grants a fixed amount of knowledge. Taking a
class’s final grants a fixed amount of knowledge and unlocks new classes.

![alt text](https://github.com/kylerichey/CS360FinalProject/blob/master/images/image16.png)

###Employment
The Employment tab is unlocked when the player takes their first class. The player applies for a
job by using their knowledge. After applying at a place of employment, the player chooses a
position there. Once the player has chosen a position, an experience meter begins filling up,
unlocking new jobs that will provide more pennies over time. New jobs are opened up by taking
new classes.


![alt text](https://github.com/kylerichey/CS360FinalProject/blob/master/images/image06.png)


### Relationships
Relationships become available after taking a class. The game randomly generates a person to
date with a corresponding tooltip description from a list. After initial contact, the player has to
complete various tasks to move from Acquaintance, to New Friend, to Girlfriend. The tasks
begin by only consuming energy, but after leveling up to New Friend the tasks become less
defined. The player can choose which activities to complete to gain more experience. The
player may choose give the lucky girl gifts of flowers and chocolate, or hang out with her. Each
option requires different resources and increase a progress bar to the next level by a different
amount. Eventually the player can ask her out and she becomes your girlfriend. Currently, the
relationship tab is only fully implemented if a user is registered as male.

![alt text](https://github.com/kylerichey/CS360FinalProject/blob/master/images/image01.png)


### Store
The Store tab allows the player to purchase resources in areas other than education. The Store
is unlocked when the player first attempts to find engage in a relationship. The Store has
various items such as Gatorade or Yoga Mat, which are resources for the gym, 5 Hour Energy,
which instantly replenishes the players energy to 100%, Box of Chocolates or Flowers which
can be given as gifts in the relationship tab.

![alt text](https://github.com/kylerichey/CS360FinalProject/blob/master/images/image15.png)


### Gym
The Gym is unlocked when the player first attempts to find engage in a relationship. The gym
requires resources bought from the store, which are used to level up the player’s Body Type.
The scale begins at Total Wuss, then progresses to Weak, and then to Acceptable. When the
player’s Body Type reaches acceptable, they may gain a girlfriend after filling up the respective
progress bar in the Relationships tab.

![alt text](https://github.com/kylerichey/CS360FinalProject/blob/master/images/image09.png)


## Conclusion
We learned that creating a web application doesn’t not have to be a complex effort. Through the
aid of Mongo, Angular, Express, and Node the initial setup was straightforward. The
applications worked together very well. This created an environment with the tools necessary to
complete the incremental game as it was envisioned.

If we were to do the project again, it may have been beneficial to map out the more details of
the application before writing any code. This would have made it easier to equally divide the
work so that each member group had a more complete idea of their responsibilities. The
informal approach of coding often resulted in minor code and design collisions that could have
potentially been avoided.

None of the technologies used could be considered disappointments. The MEAN stack was
incredibly valuable. The frontend was implemented with HTML and Bootstrap. This was very
useful in providing a good UI. The backend code was all javascript, accessed using Angular.
