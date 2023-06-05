import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const [newList, addNewList] = useState(null)

  const [lists, setList] = useState(null)
  const [IsPending, setIsPending] = useState(true)

  const [editList, setEditList] = useState(null)
  const [editID, setEditID] = useState(0)

  const [newListBox, setNewListBox] = useState(false)
  const [editListBox, setEditListBox] = useState(false)

  let url = 'http://localhost:8000/todo'

  useEffect(() => {
    fetch(url)
      .then((response) => {
        if (!response.ok) throw Error("Fetching lists failed...");
        else return response.json();
      })
      .then((list) => {
        setList(list);
        setIsPending(false);
        console.log(newList)
      })
      .catch((error) => console.log("Error occurred! -> " + error));

  }, [])



  const handleListDelete = (id) => {
    fetch(url + "/" + id, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) throw Error("Deleting list failed...");
        else return response.json();
      })
      .then(() => {
        console.log("TodoList deleted successfully.");
        fetch(url)
          .then((response) => {
            if (!response.ok) throw Error("Fetching lists failed...");
            else return response.json();
          })
          .then((list) => {
            setList(list);
          })
          .catch((error) => console.log("Error occurred! -> " + error));
      })
      .catch((error) => console.log("Couldn't delete list -> ", error.message));
  };

  const handleNewList = () => {
    const newTodo = { list: newList };

    fetch("http://localhost:8000/todo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTodo),
    })
      .then((response) => {
        if (!response.ok) throw Error("Adding a new list failed...");
        else return response.json();
      })
      .then(() => {
        console.log("New TodoList added successfully.");
        fetch(url)
          .then((response) => {
            if (!response.ok) throw Error("Fetching lists failed...");
            else return response.json();
          })
          .then((list) => {
            setList(list);
            setIsPending(false);
            console.log(newList);
          })
          .catch((error) => console.log("Error occurred! -> " + error));

        addNewList(null);
      })
      .catch((error) => console.log("Could not fetch! -> ", error.message));
  };


  const handleEditRequest = () => {
    const modifiedList = { list: editList }
    fetch(url + '/' + editID, {
      method: 'PUT',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(modifiedList)
    }).then(response => {
      if (!response.ok) throw Error("Fetching lists failed...");
      else return response.json();
    }).then(() => {

      console.log('List updated successfully!')

      fetch(url).then(response => {
        if (!response.ok) throw Error("Fetching lists failed...");
        else return response.json();
      }).then(() => {
        setEditID(0)
        setEditList(null)
        setList((prevLists) =>
          prevLists.map((list) => {
            if (list.id === editID) {
              return { ...list, list: editList };
            }
            return list;
          })
        );
      }).catch(error => console.log("Could not fetch! -> ", error.message));


    }).catch((error) => console.log("Could not fetch! -> ", error.message));
  }
  return (
    <div className="home">
      <title>TodoList - Your ToDo's</title>

      <div className="lists">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>List</th>
              <th>Modify</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {IsPending &&
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>Loading lists...</td>
              </tr>
            }

            {!IsPending && lists && lists.map((list) => (
              <tr key={list.id}>
                <td>{list.id}</td>
                <td>{list.list}</td>
                <td><button
                  className="modify"
                  key={list.id}
                  onClick={() => {
                    setEditID(list.id)
                    setEditListBox(true)
                  }}>Modify</button>
                </td>
                <td>
                  <button
                    className="delete"
                    onClick={() => handleListDelete(list.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button className="add-list" onClick={() => setNewListBox(true)}>Create a List</button>
      <div className="addList">
        <input
          type="text"
          placeholder="What's on your mind?"
          style={{ display: newListBox ? 'inline' : 'none' }}
          value={newList || ''}
          onChange={(e) => addNewList(e.target.value)}
        />

        <button className="add" onClick={() => {
          handleNewList()
          setNewListBox(false)
        }
        }
          style={{ display: newListBox ? 'inline' : 'none' }}>ADD</button>
      </div>
      <div className="editList">
        <input
          type="text"
          placeholder="Want to modify? Yes"
          style={{ display: editListBox ? 'inline' : 'none' }}
          value={editList || ''}
          onChange={(e) => setEditList(e.target.value)}
        />

        <button className="edit" onClick={() => {
          handleEditRequest()
          setEditListBox(false)
        }
        } style={{ display: editListBox ? 'inline' : 'none' }}>EDIT</button>
      </div>
    </div>
  );
}

export default Home;
