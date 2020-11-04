# Trello Amplify

Trello Clone built using React + AWS amplify as a Backend

## Tech used

Front-end libraries:

- React
- React Router
  
Backend:

- AWS amplify auth
- AWS amplify API

## Notes

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

## TODO

- [ ] Card Drag and Drop ( Front-end)
- [ ] Persist order in the Backend
