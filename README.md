# Trello Amplify

Trello Clone built using React + AWS amplify as a Backend

## Tech used

Front-end libraries:

- React
- React Router
  

Backend:

- AWS amplify auth
- AWS amplify API

## getting started

edit board name

- [x] Display Each user's boards & lists
- [ ] Boards
  - [x] Create Board
  - [x] delete Board
  - [ ] update board name (have edit mode, display form with the board's name, onSubmit, updateBoard)
  - [x] route for each board
  - [x] handle case of wrong board id and route to 404
  - [ ] Change boards order and save it to backend?
  - [ ] display notification when board is successfully deleted (probably using dispatch)
  - [ ] add loading skeleton for board list
  - [x] Add Board modal ( figure out how to manage state and pass it to the Boards page)
- [ ] Lists
  - [x] fetch lists
  - [x] filter using graphql instead of JS
  - [x] create new lists
  - [ ] add loading skeleton  for individual board (kanban)
- [ ] Cards
  - [x] fetch cards
  - [x] create new cards
  - [ ] update cards
  - [x] delete cards
- [ ] add drag and drop (Hard)

- [ ] About Page
- [ ] Write Docs
- [ ] Add comments
- [ ] Refactor and make sure I'm using best practices

- [ ] 404

ideas

- Personal Mood Board
- collaborative drawing app. you have a list of colors, a canvas and you're drawing. people with link can see what you're doing and can add stuff.
if there's authentication, add users' names but for simplicty you can have random names and no Auth
- feedback app. user can create a feedback form which is accessible by a URL, people can submit like wachstum.space
make it a saas by limiting number of feedbacks you can create


```js
// filter for board id

// this doesn't work
// const listData = await API.graphql(graphqlOperation(listLists), {
//   variables: { filter: { boardID: { eq: boardID } } },
// });
const listData = await API.graphql({
  query: listLists,
  variables: { filter: { boardID: { eq: boardID } } },
});
```

- useUser hook to display their username
- landing page

Features

- [ ] Home page when user is unauthenticated
- [ ] Edit Card, Edit Board Name, Edit List Name
- [ ] Dark Mode
- [ ] Good Responsive Design (add scroll snapping)
