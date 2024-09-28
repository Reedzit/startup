# Deck of Death
Startup application for BYU CS260 class
## Elevator Pitch

Sometimes it is really hard to get to the gym. You may have a busy schedule or you may have responsibilities at home that keep you away. Whatever the reason mya be, you should still be able to get the exercise you need and want. The Deck of Death application uses a virtual deck of cards where you assign four workouts that typically can be done in your home to each suit. The app will randomly shuffle the cards and you complete the specified number of repetitions on the card. You can keep track of your workouts, the time it takes to complete them, and you can even workout with friends! 

## Key Features
- Secure login over HTTPS
- Ability to select workouts for each suit.
- Displays the current card, how many are left, and the time elapsed during your workout.
- Ability to connect with friends and receive notifications when they have started/completed a workout. 
- Workouts are persistently stored. 

## Design
This is a rough design of what the UI will look like during the workout.
![image](deckOfDeathUI.jpg)
The backend will randomly go through all the cards in the deck and send notifications to your friends when you are starting/completing a workout if they have connected to the server. 

## Technologies

- **HTML** - Uses correct HTML structure for application. Three HTML pages. One for login, one choosing a workout, and one during the workout.
- **CSS** - Application styling that looks good on different screen sizes, uses good whitespace, color choice and contrast.
- **JS** - Automate the buttons and performs the actions prompted in CSS/HTML. Will have a virtual deck of cards that it will run through. 
- **React** - Routing the components of the program, provides login, workouts you can do, and friends list.
- **Service** - Backend service with endpoints for:
  - login
  - retrieving workout history
  - submitting workout data
  - retrieving workout data from friends
  - uses a service to generate pictures of cards.
- **DB/Login** - Store users, friends, and data from each workout.
- **WebSocket** - You will receive a notification when a friend is participating, completes a workout/online. 

## Startup HTML Deliverable
- **HTML Pages**
  - index.html is the page to login where you can sign in or sign up. You can access this page by navigating to startup.deckofdeath.click or clicking on "Home" on the navigation menu in the application. 
  - newWorkout.html is the page to configure your workout and begin. You can access this page by clicking on the "Begin New Workout" button on the navigation menu.
  - workoutbegins.html is the page that shows up as you are completing the workout. It displays the current workout with the corresponding card and a stop watch to track your time. You can access this page by going to New Workout and pressing the begin button.
  - history.html is the page where you can track your workout history with the time it took to complete it and the date you completed it. You can access this page by clicking on "Workout History" in the navigation menu.
  - friends.html is the page where you can connect with friends and see the progress your friends have made. You can access this page by clicking on "Friends" in the navigation menu.
  - about.html is the page that gives information about what the deck of death is and the goal and capabilities of the deck of death web application. You can access this page by clicking "About" in the navigation menu. 
- **Simon HTML** is deployed to simon.deckofdeath.click
- **Application Images** were generated using Imagen 3 AI software.
- **Database** will be implemented to keep track of signed up users and friends of each users along with their workout data. 
- **WebSocket** will be implemented to let friends know when they are working out. This is shown with a notification ribbon at the bottom of each page. 



