import React from "react";

export default function Die(props) {
  let styles = {
    backgroundColor: props.isHeld ? "#59E391" : "white",
  };

  const dots = [];
  for (let i = 0; i < props.value; i++) {
    dots.push(<span key={i + 1}></span>);
  }

  return (
    <div
      className={`no-of-${props.value}-dots`}
      style={styles}
      onClick={props.holdDie}
    >
      {/* {props.value} */}
      {dots}
    </div>
  );
}
