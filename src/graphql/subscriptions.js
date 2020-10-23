/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateBoard = /* GraphQL */ `
  subscription OnCreateBoard($owner: String!) {
    onCreateBoard(owner: $owner) {
      id
      name
      lists {
        items {
          id
          title
          boardID
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateBoard = /* GraphQL */ `
  subscription OnUpdateBoard($owner: String!) {
    onUpdateBoard(owner: $owner) {
      id
      name
      lists {
        items {
          id
          title
          boardID
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteBoard = /* GraphQL */ `
  subscription OnDeleteBoard($owner: String!) {
    onDeleteBoard(owner: $owner) {
      id
      name
      lists {
        items {
          id
          title
          boardID
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onCreateList = /* GraphQL */ `
  subscription OnCreateList($owner: String!) {
    onCreateList(owner: $owner) {
      id
      title
      boardID
      board {
        id
        name
        lists {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      cards {
        items {
          id
          listID
          content
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateList = /* GraphQL */ `
  subscription OnUpdateList($owner: String!) {
    onUpdateList(owner: $owner) {
      id
      title
      boardID
      board {
        id
        name
        lists {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      cards {
        items {
          id
          listID
          content
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteList = /* GraphQL */ `
  subscription OnDeleteList($owner: String!) {
    onDeleteList(owner: $owner) {
      id
      title
      boardID
      board {
        id
        name
        lists {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      cards {
        items {
          id
          listID
          content
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onCreateCard = /* GraphQL */ `
  subscription OnCreateCard($owner: String!) {
    onCreateCard(owner: $owner) {
      id
      listID
      list {
        id
        title
        boardID
        board {
          id
          name
          createdAt
          updatedAt
          owner
        }
        cards {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      content
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateCard = /* GraphQL */ `
  subscription OnUpdateCard($owner: String!) {
    onUpdateCard(owner: $owner) {
      id
      listID
      list {
        id
        title
        boardID
        board {
          id
          name
          createdAt
          updatedAt
          owner
        }
        cards {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      content
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteCard = /* GraphQL */ `
  subscription OnDeleteCard($owner: String!) {
    onDeleteCard(owner: $owner) {
      id
      listID
      list {
        id
        title
        boardID
        board {
          id
          name
          createdAt
          updatedAt
          owner
        }
        cards {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      content
      createdAt
      updatedAt
      owner
    }
  }
`;
