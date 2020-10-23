import React, { useContext } from "react";
import { Link } from "react-router-dom";
import BoardsContext from "../contexts/BoardsContext";
import { CreateBoard } from "../components";

const Boards = () => {
  const { boardsState, boardsDispatch } = useContext(BoardsContext);
  const { boards, status } = boardsState;
  return (
    <>
      <div className="container mx-auto">
        {status === "loading" ? (
          <h1 className="text-6xl">Loading Boards...</h1>
        ) : (
          <>
            <div className="flex justify-between mt-12">
              <h2 className="text-3xl font-medium">Boards</h2>
              <CreateBoard dispatch={boardsDispatch} />
            </div>
            <ul className="flex flex-wrap">
              {boards.length === 0 ? (
                <h2 className="text-xl">You haven't create any boards yet</h2>
              ) : (
                boards.map((board, i) => {
                  return (
                    <Link
                      to={`/board/${board.id}`}
                      key={board.id ? board.id : i}
                      className="text-2xl mr-5 hover:text-blue-500  bg-white shadow rounded p-5 board-card my-5 max-w-xs"
                    >
                      <li>{board.name}</li>
                    </Link>
                  );
                })
              )}
            </ul>
          </>
        )}
      </div>
    </>
  );
};

export default Boards;
