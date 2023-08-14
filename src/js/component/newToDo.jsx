import React, {useEffect, useState} from "react";
import InputField from "./inputField";
import ToDoItem from "./toDoItem";

const NewToDo = () => {
    const[input, setInput] = useState("");
    const [items, setItems] = useState([]);


    function addItem(newItem) {
      let newTaskArray = [...items, { label: newItem, done: false }];
      fetch("https://playground.4geeks.com/apis/fake/todos/user/theresearch", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newTaskArray)
    })
    .then( response => {
        if(!response.ok) throw Error(response.statusText);
    return response.json();
    }
    )
    .then(response => {
      response.status == 200 ? setItems(newTaskArray) : ""
    })
    .catch(error => console.log(error))
}

    function getTask() {
      fetch("https://playground.4geeks.com/apis/fake/todos/user/theresearch", {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
          }
      })
      .then( response => {
          if(!response.ok) throw Error(response.statusText);
      return response.json();
      }
      )
      .then(result => {
        setItems(result);
      })
      .catch(error => console.log(error))
  }
  console.log(items, "data")

    function assignNewTask(input) { 
        fetch("https://playground.4geeks.com/apis/fake/todos/user/theresearch", {
            method: "PUT",
            body: JSON.stringify(input),
            headers: {
                "content-Type": "application/json",
            }
        })
        .then( response => {
            if(!response.ok) throw Error(response.statusText);
        return response.json();
        }
        )
        .then(response => {
            console.log("Success:", response);
        })
        .catch(error => console.log(error))
    }

    function removeListItem(index) {
        const newList = items.filter((item, currentIndex) => index !== currentIndex);
        setItems(newList);
        assignNewTask(newList);
      }

    // useEffect(() => {
    //   fetch("https://playground.4geeks.com/apis/fake/todos/user/theresearch")
    //   .then(response => response.json())
    //   .then(data => 
    //     setInput(data[0].label),
    //     // setInput(data)
    // )}, [])
    
    return(
        <>
        <div className="inputWrapper">
            <InputField input={input} setInput={setInput} />
            <button className="createNewTask" onClick={() => {
              if (input == "") {
                  return alert("You can't create an empty task!")
              } else {
                addItem(input)
                setInput("") }
              }}>
              create new task
            </button>
          </div>
          <div className="listWrapper">
            <ul>
              {items && items.map((item, index) => (
                <ToDoItem
                  key={index}
                  item={item}
                  index={index}
                  removeListItem={removeListItem}
                />
              ))}
              <hr></hr>
              <li className="footer">{
                items.length == 1 
                ? `${items.length} task left`
                : items.length > 1 
                ? `${items.length} tasks left` 
                : "Do or do not, there is no try."}
                <p>{getTask()}</p>
                </li>
            </ul>
          </div>
        </>
      );
    };
    
    export default NewToDo;