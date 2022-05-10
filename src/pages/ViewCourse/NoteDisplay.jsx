import { Interweave } from "interweave";
import React, { useEffect, useState } from "react";

const NoteDisplay = (props) => {
  return (
    <div className="note-container">
      <Interweave content={props.note}  />
    </div>
  );
};
export default NoteDisplay;
