import { Title } from "@mui/icons-material";
import { InputLabel } from "@mui/material";
import React, { useState } from "react";
import CustomButton from "../../components/Button/CustomButton";
import Input from "../../components/Input/Input";
import RichEditor from "../../components/RichEditor/RichEditor";

const ForumQuestion = () => {
  const [title, setTitle] = useState();
  const [details, setDetails] = useState();
  const clickPublish = () => {};
  const handleDetailChange = (value) => {
    setDetails(value);
  };
  const onTitleChange = () => {};
  return (
    <div className="mt-2">
      <Input
        id="Title"
        placeholder="Why we need force "
        value={title}
        onChange={onTitleChange}
        label="Title or summary"
      ></Input>
      <div>
        <h3 className="detail-label mt-1" shrink>
          Details
        </h3>
        <RichEditor
          style="quiz"
          callback={handleDetailChange}
          content={details}
        />
      </div>
      <div className="mt-2">
        <CustomButton
          color="light-orange-bordered "
          name="publish"
          onclick={clickPublish}
        />
      </div>
    </div>
  );
};
export default ForumQuestion;
