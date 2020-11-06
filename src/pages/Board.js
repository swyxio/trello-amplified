import React, { useState } from "react";
import { useParams, 
  // useHistory,
   Link } from "react-router-dom";
// import { notificationError } from "../utils";
import { List, DeleteBoard, CreateList, 
  // Loader
 } from "../components";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { List as ListModel, Board as BoardModel } from '../models'
import { DataStore } from '@aws-amplify/datastore'

async function fetchList(boardID, setLists) {
  const _Lists = (await DataStore.query(ListModel)).filter(list => {
    return list.board.id === boardID
  })
  // const _Lists = await DataStore.query(ListModel, c => c.board({id: boardID}))
  // // TODO
  // if (!board.data.getBoard) {
  //   history.push("/NotFound");
  // }
  console.log('todo check ', {_Lists})
  setLists(_Lists)
}
async function fetchBoard(boardID, setBoard) {
  const _Board = await DataStore.query(BoardModel, boardID)
  setBoard(_Board)
}

const Board = () => {
  const [lists, setLists] = React.useState([])
  const { id } = useParams();
  const boardID = id;
  // const history = useHistory();
  const [board, setBoard] = useState({});

  React.useEffect(() => {
    fetchList(boardID, setLists)
    const subscription = DataStore.observe(ListModel).subscribe(fetchList)
    return () => subscription.unsubscribe()
  }, [boardID])

  React.useEffect(() => {
    fetchBoard(boardID, setBoard)
    const subscription = DataStore.observe(BoardModel).subscribe(fetchBoard)
    return () => subscription.unsubscribe()
  }, [boardID])

  const onDragEnd = (result) => {
    const { destination, source, type } = result;
    console.log(type);
    // dropped outside the list
    if (!destination) {
      return;
    }
    if (type === "COLUMN") {
      // Prevent update if nothing has changed
      if (source.index !== destination.index) {
        alert('to be implemented')
        // listsDispatch({
        //   type: "MOVE_LIST",
        //   value: {
        //     oldListIndex: source.index,
        //     newListIndex: destination.index,
        //     boardId: source.droppableId,
        //   },
        // });
      }
      return;
    }

    if (
      source.index !== destination.index ||
      source.droppableId !== destination.droppableId
    ) {
      // dispatch({
      //   type: "MOVE_CARD",
      //   value: {
      //     sourceListId: source.droppableId,
      //     destListId: destination.droppableId,
      //     oldCardIndex: source.index,
      //     newCardIndex: destination.index,
      //     boardID
      //   }
      // });
    }
  };
  return (
    <div className="bg-gray-900 text-white">
      {/* {status === "loading" ? (
        <div className="h-screen w-full flex items-center justify-center">
          <Loader />
        </div>
      ) : ( */}
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="py-10 pl-10 md:px-24 mx-auto container h-screen">
            <h1 className="text-3xl font-medium my-5">
              <span>
                <Link className="" to="/boards">
                  Boards /
                </Link>{" "}
              </span>
              {board?.data?.getBoard.name}
            </h1>
            {lists.length === 0 ? (
              <h1>You don't have any lists, start by creating one</h1>
            ) : null}
            <Droppable
              droppableId={boardID}
              type="COLUMN"
              direction="horizontal"
            >
              {(provided) => (
                <div
                  className="py-10 flex items-start w-full overflow-y-scroll"
                  ref={provided.innerRef}
                >
                  {lists.map((list, index) => {
                    console.log('1', {list})
                    return (
                      <List
                        onDragEnd={onDragEnd}
                        index={index}
                        key={list.id}
                        title={list.title}
                        listId={list.id}
                        cards={list.cards?.items}
                      />
                    );
                  })}
                  {provided.placeholder}
                  <CreateList
                    boardID={boardID}
                    lists={lists}
                  />
                </div>
              )}
            </Droppable>
            <DeleteBoard boardID={boardID} />
          </div>
        </DragDropContext>
      {/* )} */}
    </div>
  );
};

export default Board;
