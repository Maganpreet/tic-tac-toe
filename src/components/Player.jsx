import { useState } from "react";

export default function Player({ initialName, symbol, isActive, onNameChange }){
    const [isEditing, setIsEditing] = useState(false);
    const [playerName, setPlayerName] = useState(initialName);

    const onClickHandler = (event) => {
        setIsEditing(currState => !currState);
    }

    const onNameChangeHandler = (event) => {
      setPlayerName(event.target.value);
      if (isEditing) {
        onNameChange(symbol, event.target.value)
      }
    }

    let player_name = <span className='player-name'>{playerName}</span>;

    if (isEditing) {
        player_name = (
          <input
            type="text"
            required
            className="player-name"
            value={playerName}
            onChange={onNameChangeHandler}
          ></input>
        );
    }

    return (
      <li className={isActive ? "active" : undefined}>
        <span className="player">
          {player_name}
          <span className="player-symbol">{symbol}</span>
        </span>
        <button onClick={onClickHandler}>{isEditing ? "Save" : "Edit"}</button>
      </li>
    );
}