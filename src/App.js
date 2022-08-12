import React, { useEffect, useState } from "react";
import "./App.css";
import Images from "./Avatar";
import { useDispatch, useSelector } from "react-redux";
import { reset, selectUser, update } from "./features/counterUserSlice";

function App() {
  const [userid, setUserid] = useState("");
  const [nickname, setNickname] = useState("");
  const [biography, setBiography] = useState("");
  const [useravatar, setUserAvatar] = useState();
  const [err, setErr] = useState(false);

  const [resetCounter, setResetCounter] = useState(false);

  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const resetuser = () => {
    if (user !== null) {
      setResetCounter(true);
      dispatch(reset());
      setBiography("");
      setNickname("");
    }
  };

  const updateuser = () => {
    var RndNum = Math.floor(Math.random() * 3);

    if (RndNum === 0) {
      if (nickname !== "" && biography !== "") {
        setErr(false);
        dispatch(update({ userid, useravatar, nickname, biography }));
        setBiography("");
        setNickname("");
      } else if (nickname === "" && biography === "") {
        setErr(false);
      }
    } else {
      setErr(true);
    }
  };

  useEffect(() => {
    var key = "";
    for (let j = 0; j < 1; j++) {
      key += Math.floor(Math.random() * 15) + 1;
    }
    setUserAvatar(key);
  }, []);

  useEffect(() => {
    var codeId = "";
    for (let i = 0; i < 5; i++) {
      codeId += Math.floor(Math.random() * 10);
    }
    setUserid("user#" + codeId);
  }, []);

  return (
    <div className="App">
      <div className="App_container">
        <h1 className="App_title">(User Update Form)</h1>
        <div className="App_id_name">
          <div className="App_input">
            <label>User ID</label>
            <input
              disabled
              placeholder={`${userid === "" ? "00000" : userid}`}
              className="userInput userID"
            />
          </div>
          <div className="App_input">
            <label>Nickname*</label>
            <input
              placeholder="Nickname"
              className="userInput"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
          </div>
        </div>
        <div className="Biography">
          <label>Biography</label>
          <textarea
            name="Biography"
            placeholder="Tell use about yourself in less than 140 characters"
            className="userInputBiography"
            value={biography}
            onChange={(e) => setBiography(e.target.value)}
          />
        </div>
        <div className="App_button">
          <input
            disabled={resetCounter}
            type="button"
            className="Reset_btn"
            value="Reset"
            onClick={() => resetuser()}
          />
          <input
            type="button"
            className="success_btn"
            value={err ? "Try again" : "Success!"}
            onClick={() => updateuser()}
          />
        </div>
      </div>
      <div className="App_display">
        <img
          src={
            Images !== undefined
              ? Images[useravatar !== undefined ? useravatar : 1].ImagePath
              : require("./media/1.jpg")
          }
          alt=""
        />
        <div className="App_info">
          <h3 className="App_info_text">
            {user === null ? "Unnamed" : user.nickname}
          </h3>
          <p>{user === null ? "No boigraphy " : user.biography}</p>
          <p>{`(${userid})`}</p>
        </div>
      </div>
      {err && (
        <div className="err">Error! Randonly rejected by the backend</div>
      )}
    </div>
  );
}

export default App;
