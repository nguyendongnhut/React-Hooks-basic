import React, { useState, useEffect } from "react";
import queryString from "query-string";
import "./App.scss";
import ColorBox from "./components/ColorBox";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import PostList from "./components/PostList";
import Pagination from "./components/Pagination";
import PostFilterForm from "./components/PostFilterForm";
import Clock from "./components/Clock";
import BetterClock from "./components/BetterClock";
import MagicBox from "./components/MagicBox";

function App() {
  const [todoList, setTodoList] = useState([
    { id: 1, title: "Đi chơi" },
    { id: 2, title: "Đi ăn" },
    { id: 3, title: "Đi ngủ" },
  ]);

  const [postList, setPostList] = useState([]);
  const [pagination, setPagination] = useState({
    _page: 1,
    _limit: 10,
    _totalRows: 1,
  });

  const [filters, setFilters] = useState({
    _limit: 10,
    _page: 1,
  });

  useEffect(() => {
    async function fetchPostList() {
      try {
        const paramsString = queryString.stringify(filters);
        const requestUrl = `http://js-post-api.herokuapp.com/api/posts?${paramsString}`;
        const response = await fetch(requestUrl);
        const responseJSON = await response.json();
        console.log({ responseJSON });

        const { data, pagination } = responseJSON;
        setPostList(data);
        setPagination(pagination);
      } catch (error) {
        console.log("Failed to fetch post list: ", error.message);
      }
    }

    fetchPostList();
  }, [filters]);

  function handlePageChange(newPage) {
    console.log("new page: ", newPage);
    setFilters({
      ...filters,
      _page: newPage,
    });
  }

  function handleTodoClick(todo) {
    console.log(todo);
    const index = todoList.findIndex((x) => x.id === todo.id);
    if (index < 0) return;

    const newTodoList = [...todoList];

    newTodoList.splice(index, 1);

    setTodoList(newTodoList);
  }

  function handleTodoFormSubmit(formValue) {
    console.log("form submit: ", formValue);

    const newTodo = {
      id: todoList.length + 1,
      ...formValue,
    };

    const newTodoList = [...todoList];
    newTodoList.push(newTodo);

    setTodoList(newTodoList);
  }

  function handleFiltersChange(newFilters) {
    console.log("new filters: ", newFilters);
    setFilters({
      ...filters,
      _page: 1,
      title_like: newFilters.searchTerm,
    });
  }

  const [showClock, setShowClock] = useState(true);

  function handleHideClock() {
    setShowClock(false);
  }

  function handleShowClock() {
    setShowClock(true);
  }

  return (
    <div className="app">
      <h1>React Hooks - TodoList</h1>

      <MagicBox />
      {/* <TodoForm onSubmit={handleTodoFormSubmit} />
      <TodoList todos={todoList} onTodoClick={handleTodoClick} /> */}

      {/* <PostFilterForm onSubmit={handleFiltersChange} />
      <PostList posts={postList} />
      <Pagination pagination={pagination} onPageChange={handlePageChange} /> */}

      {/* {showClock && <Clock />}
      {showClock && <button onClick={handleHideClock}>Hide Clock</button>}
      {!showClock && <button onClick={handleShowClock}>Show Clock</button>} */}

      {/* <BetterClock /> */}
    </div>
  );
}

export default App;
