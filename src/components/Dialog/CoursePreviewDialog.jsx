import * as React from "react";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

import "./DialogComponent.css";
import VideoPlayer from "../VideoPlayer/VideoPlayer";

const CoursePreviewDialog = React.forwardRef((props, ref) => {
  const [open, setOpen] = React.useState(false);
  const [src, setSrc] = React.useState();

  React.useImperativeHandle(ref, () => ({
    handleClickOpen(src) {
      handleClickOpen(src);
    },
    handleClose() {
      handleClose();
    },
  }));

  const handleClickOpen = (src) => {
    setOpen(true);
    setSrc(src);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOkay = () => {
    // setOpen(false);
    props.handleOkay && props.handleOkay();
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} className="dialog">
        <DialogContent>
          <VideoPlayer src={"https://spark-courses.s3.ap-south-1.amazonaws.com/62272fbfc8ea4d8b75b76aa2/encoded/concepts/WhatisaLinearEquation/manifest.m3u8"} />
        </DialogContent>
      </Dialog>
    </div>
  );
});
export default CoursePreviewDialog;
