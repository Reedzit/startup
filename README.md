# Deck of Death
Startup application for BYU CS260 class
## Elevator Pitch

Sometimes it is really hard to get to the gym. You may have a busy schedule or you may have responsibilities at home that keep you away. Whatever the reason mya be, you should still be able to get the exercise you need and want. The Deck of Death application uses a virtual deck of cards where you assign four workouts that typically can be done in your home to each suit. The app will randomly shuffle the cards and you complete the specified number of repetitions on the card. You can keep track of your workouts, the time it takes to complete them, and you can even workout with friends! 

## Tecnologies

- **HTML** - Uses correct HTML structure for application. Three HTML pages. One for login, one choosing a workout, and one during the workout.
- **CSS** - Application styling that looks good on different screen sizes, uses good whitespace, color choice and contrast.
- **JS** - Automate the buttons and performs the actions prompted in CSS/HTML. Will have a virtual deck of cards that it will run through. 
- **React** - Routing the components of the program, provides login, workouts you can do, and friends list.
- **Service** - Backend service with endpoints for:
  - login
  - retrieving workout history
  - submitting workout data
  - retrieving workout data from friends
  - uses a service to generate pictures of workouts.
- **DB/Login** - Store users, friends, and data from each workout.
- **WebSocket** - You will receive a notification when a friend is participating, completes a workout/online. 
