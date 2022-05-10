import React, { useEffect, useRef } from 'react';
import 'shaka-player/dist/controls.css';

import { generateLicenseToken } from '../../service/videoPlayer.service';
const shaka = require('shaka-player/dist/shaka-player.ui.js');

//Creating class component
const VideoPlayer =(props) => {


		const videoComponent = useRef();

		const videoContainer = useRef();

	const onErrorEvent=(event)=> {
	  // Extract the shaka.util.Error object from the event.
	  onError(event.detail);
	}

	const onError=(error)=> {
	  // Log the error.
	  console.error('Error code', error.code, 'object', error);
	}
	useEffect(async()=>{
			//Link to MPEG-DASH video
			var manifestUri = 'https://spark-courses.s3.ap-south-1.amazonaws.com/62272fbfc8ea4d8b75b76aa2/resources/output/manifest.mpd';

			//Getting reference to video and video container on DOM
			const video = videoComponent.current;
			const vc = videoContainer.current;
			const protection =  {
				drm :{
					servers: {
						"com.widevine.alpha": "https://drm-widevine-licensing.axprod.net/AcquireLicense"
					}
				}
			}
			const token= await generateLicenseToken("b4727cf3-00ef-402f-9765-33416bc9ee6c");
			//Initialize shaka player
			var player = new shaka.Player(video);
			player.configure(protection);
	
			player.getNetworkingEngine().registerRequestFilter(function (type, request) {
				if (type === shaka.net.NetworkingEngine.RequestType.LICENSE) {
					request.headers['X-AxDRM-Message'] = token.token;
				}
			});
	
			//Setting UI configuration JSON objectyuk
			
			const uiConfig = {};
	
			//Configuring elements to be displayed on video player control panel
			  uiConfig['controlPanelElements'] = ['mute', 'volume', 'time_and_duration', 'fullscreen', 'overflow_menu', ];
			  
			//Setting up shaka player UI
			  const ui = new shaka.ui.Overlay(player, vc, video);
	
			ui.configure(uiConfig); //configure UI
			  ui.getControls();
	
			// Listen for error events.
			  player.addEventListener('error',onErrorEvent);
	
			  // Try to load a manifest.
			  // This is an asynchronous process.
			  player.load(manifestUri).then(function() {
				// This runs if the asynchronous load is successful.
				console.log('The video has now been loaded!');
			  }).catch(onError); 
	},[])
	

		return(
			<div className="video-container" ref={videoContainer}>
				<video 
					className="video_preview"
					ref={videoComponent}
					
				/>
			</div>
		);
	
}

export default VideoPlayer;