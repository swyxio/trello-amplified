/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getBoard = /* GraphQL */ `
  query GetBoard($id: ID!) {
    getBoard(id: $id) {
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
export const listBoards = /* GraphQL */ `
  query ListBoards(
    $filter: ModelBoardFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBoards(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        lists {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getList = /* GraphQL */ `
  query GetList($id: ID!) {
    getList(id: $id) {
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
export const listLists = /* GraphQL */ `
  query ListLists(
    $filter: ModelListFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLists(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getCard = /* GraphQL */ `
  query GetCard($id: ID!) {
    getCard(id: $id) {
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
export const listCards = /* GraphQL */ `
  query ListCards(
    $filter: ModelCardFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCards(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        listID
        list {
          id
          title
          boardID
          createdAt
          updatedAt
          owner
        }
        content
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const listsByBoard = /* GraphQL */ `
  query ListsByBoard(
    $boardID: ID
    $sortDirection: ModelSortDirection
    $filter: ModelListFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listsByBoard(
      boardID: $boardID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
          items {
            content
            id
          }
        }
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const cardsByList = /* GraphQL */ `
  query CardsByList(
    $listID: ID
    $content: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelCardFilterInput
    $limit: Int
    $nextToken: String
  ) {
    cardsByList(
      listID: $listID
      content: $content
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        listID
        list {
          id
          title
          boardID
          createdAt
          updatedAt
          owner
        }
        content
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
