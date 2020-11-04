import React, { useContext } from "react";
import { Link } from "react-router-dom";
import BoardsContext from "../contexts/BoardsContext";
import { CreateBoard, Loader } from "../components";

const Boards = () => {
  const { boardsState, boardsDispatch } = useContext(BoardsContext);
  const { boards, status } = boardsState;
  return (
    <div className="bg-gray-900 text-white h-screen">
      <div className="container mx-auto px-10 md:px-24">
        {status === "loading" ? (
          <div className="h-screen w-full flex items-center justify-center">
            <Loader />
          </div>
        ) : (
          <>
            <div className="flex justify-between pt-12">
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
                      className="w-full max-w-xs text-2xl mr-5 transition duration-100 ease-in-out transform hover:scale-105 hover:bg-gray-800 bg-gray-700 shadow rounded p-5 board-card my-5"
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
    </div>
  );
};

export default Boards;
