import { LensTwoTone } from "@mui/icons-material";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import "shaka-player/dist/controls.css";
import moment from "moment";

import { generateLicenseToken } from "../../service/videoPlayer.service";
import { courseActions } from "../../store/course-slice";
import { useTracking } from "react-tracking";
const shaka = require("shaka-player/dist/shaka-player.ui.js");

//Creating class component
const VideoPlayer = (props) => {
  const [player, setPlayer] = useState();
  const { trackEvent } = useTracking();

  const videoComponent = useRef();

  const videoContainer = useRef();

  const onErrorEvent = (event) => {
    // Extract the shaka.util.Error object from the event.
    onError(event.detail);
  };

  const onError = (error) => {
    // Log the error.
    console.error("Error code", error.code, "object", error);
  };

  const onEnded = (e) => {
    props.setOverlay(true);
    trackEvent({
      action: "end_video",
      time: moment().format("DD-MM-YYYY hh:mm:ss"),
    });
  };
  const onPlay = (e) => {
    trackEvent({
      action: "play_video",
      time: moment().format("DD-MM-YYYY hh:mm:ss"),
    });
  };
  const onPause = (e) => {
    trackEvent({
      action: "pause_video",
      time: moment().format("DD-MM-YYYY hh:mm:ss"),
    });
  };
  const onSeek = (e) => {
    trackEvent({
      action: "seek_video",
      time: moment().format("DD-MM-YYYY hh:mm:ss"),
    });
  };
  const onRateChange = (e) => {
    trackEvent({
      action: "speed_change",
      time: moment().format("DD-MM-YYYY hh:mm:ss"),
    });
  };
  const onFullScreen = (e) => {
    var isFullscreenNow = document.webkitFullscreenElement !== null;
    if (isFullscreenNow) {
      trackEvent({
        action: "full_screen_video",
        time: moment().format("DD-MM-YYYY hh:mm:ss"),
      });
    } else {
      trackEvent({
        action: "exit_full_screen_video",
        time: moment().format("DD-MM-YYYY hh:mm:ss"),
      });
    }
  };

  useEffect(async () => {
    //Getting reference to video and video container on DOM
    const video = videoComponent.current;
    const vc = videoContainer.current;
    video.addEventListener("ended", onEnded);
    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);
    video.addEventListener("seeking", onSeek);
    video.addEventListener("ratechange", onRateChange);
    document.addEventListener("fullscreenchange", onFullScreen);

    trackEvent({
      action: "view_video",
      time: moment().format("DD-MM-YYYY hh:mm:ss"),
    });

    const protection = {
      drm: {
        servers: {
          "com.widevine.alpha": "https://drm-widevine-licensing.axprod.net/AcquireLicense",
        },
      },
    };
    //Initialize shaka player
    const player = new shaka.Player(video);
    player.configure(protection);

    //Setting UI configuration JSON objectyuk

    const uiConfig = {};

    //Configuring elements to be displayed on video player control panel
    uiConfig["controlPanelElements"] = ["play_pause", "mute", "volume", "time_and_duration", "fullscreen", "overflow_menu"];

    //Setting up shaka player UI
    const ui = new shaka.ui.Overlay(player, vc, video);

    ui.configure(uiConfig); //configure UI
    ui.getControls();

    // Listen for error events.
    player.addEventListener("error", onErrorEvent);

    //Link to MPEG-DASH video
    var manifestUri = props.src;
    // var manifestUri = 'https://spark-courses.s3.ap-south-1.amazonaws.com/62272fbfc8ea4d8b75b76aa2/resources/output/manifest.mpd';

    const token = await generateLicenseToken("b4727cf3-00ef-402f-9765-33416bc9ee6c");

    player.getNetworkingEngine().registerRequestFilter(function (type, request) {
      if (type === shaka.net.NetworkingEngine.RequestType.LICENSE) {
        request.headers["X-AxDRM-Message"] = token.token;
      }
    });

    player
      .load(manifestUri)
      .then(function () {
        // This runs if the asynchronous load is successful.
        console.log("The video has now been loaded!");
      })
      .catch(onError);
    setPlayer(player);
  }, [videoContainer]);

  useEffect(async () => {
    //Link to MPEG-DASH video
    var manifestUri = props.src;
    // var manifestUri = 'https://spark-courses.s3.ap-south-1.amazonaws.com/62272fbfc8ea4d8b75b76aa2/resources/output/manifest.mpd';

    const token = await generateLicenseToken("b4727cf3-00ef-402f-9765-33416bc9ee6c");

    player.getNetworkingEngine().registerRequestFilter(function (type, request) {
      if (type === shaka.net.NetworkingEngine.RequestType.LICENSE) {
        request.headers["X-AxDRM-Message"] = token.token;
      }
    });

    player
      .load(manifestUri)
      .then(function () {
        // This runs if the asynchronous load is successful.
        console.log("The video has now been loaded!");
        videoComponent.current.play();
      })
      .catch(onError);
  }, [props.src]);

  return (
    <div className="video-container" ref={videoContainer}>
      <video className="video_preview" ref={videoComponent} />
    </div>
  );
};

export default VideoPlayer;
