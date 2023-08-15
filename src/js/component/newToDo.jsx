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
    })
    .then(response => {
      setItems(newTaskArray)
    })
    .catch(error => console.log(error))
}

  console.log(items, "data")

    function removeListItem(index) {
        const newList = items.filter((item, currentIndex) => index !== currentIndex);
        fetch("https://playground.4geeks.com/apis/fake/todos/user/theresearch", {
            method: "PUT",
            body: JSON.stringify(newList),
            headers: {
                "content-Type": "application/json",
            }
        })
        .then( response => {
            if(!response.ok) throw Error(response.statusText);
        return response.json();
        }
        )
        .then(result => {
            console.log("Success:", result);
            setItems(newList);
        })
        .catch(error => console.log(error));
      }

    useEffect(() => {
      fetch("https://playground.4geeks.com/apis/fake/todos/user/theresearch")
      .then(response => response.json())
      .then(data => {
        console.log(data) // always do this, because you won't always know what is there
        setItems(data)
      })
      .catch(
        error => console.error("This is an error: ", error)
      )
  }, [])
    
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
                </li>
            </ul>
          </div>
        </>
      );
    };
    
    export default NewToDo;