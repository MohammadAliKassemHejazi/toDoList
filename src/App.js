import "./App.css";
import { useState, useEffect } from "react";
import Axios from "axios";

function App() {
  const [room, setRoom] = useState("");
  const [pass, setPass] = useState("");
  const [ListOfRooms, setListOfRooms] = useState([]);
  const addFriend = () => {
    Axios.post("http://localhost:3001/addfriend", {
      room: room,
      pass: pass,
    })
      .then(() => {
        setListOfRooms([
          ...ListOfRooms,
          {
            name: room,
            pass: pass,
          },
        ]);
        console.log(ListOfRooms);
      })
      .catch((e) => {
        alert(e);
      });
  };
  useEffect(() => {
    Axios.get("http://localhost:3001/read", {
      room: room,
      pass: pass,
    })
      .then((response) => {
        setListOfRooms(response.data);
      })
      .catch((e) => {
        alert(e);
      });
  }, []);
  const deleteR = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then(() => {
      setListOfRooms(
        ListOfRooms.filter((val) => {
          return val._id != id;
        })
      );
    });
  };
  return (
    <div className="App">
      <div className="inputs">
        <input
          type="number"
          onChange={(event) => {
            setRoom(event.target.value);
          }}
        ></input>
        <input
          type="password"
          onChange={(event) => {
            setPass(event.target.value);
          }}
        ></input>
        <button onClick={addFriend}>Submit</button>
      </div>
      <div className="listOfRooms">
        {ListOfRooms.map((val) => {
          return (
            <div className="roomContainer">
              <div className="room">
                <h3> Name: {val.name}</h3>
                <h3> Pass:{val.pass}</h3>
              </div>
              <button
                onClick={() => {
                  deleteR(val._id);
                }}
              >
                X
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
