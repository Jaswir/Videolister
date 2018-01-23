import React from 'react';
import ReactDOM from 'react-dom';
import request from 'superagent';

// Constants used for listing videos playlist URL
const key = 'AIzaSyBN375Q2yTEVg2cOybnzFtVJDKjItUOnYA';
const playlistUrl = 'https://www.googleapis.com/youtube/v3/playlistItems';
const youtubeVidPrefix = 'https://www.youtube.com/embed/';

var Videolist = {
  constructor: function () {
    this.getVideoIds = this.getVideoIds.bind(this);
    this.VideoItem = this.VideoItem.bind(this);
    this.VideoList = this.VideoList.bind(this);
  }

  ,

  //Gets video ids from playlist
  getVideoIds: function (response) {
    let items = response.body.items;
    let unwrapped_videoIds = [];
    for(let property in items) {
      let item = items[property];
      unwrapped_videoIds.push(item.contentDetails.videoId);
    }

    return unwrapped_videoIds;
  }

  ,

  //Video item component
  VideoItem: function (props) {
    return(
      <li>
        <iframe
        width = "420"
        height = "315"
        src = {youtubeVidPrefix + props.vidId}>
        </iframe>
      </li>);
  }

  ,

  //Videolist component
  VideoList: function (props) {
    const vidIds = props.vidIds;
    const videoList = vidIds.map(vidId =>
      <this.VideoItem key = {vidId} vidId = {vidId}/>);
    return <ol> {videoList} </ol>;
  }

  ,

  //Displays the VideoList on the screen
  handlePlaylistItemDisplay: function (url){
    //Gets playlist id from submitted url
    let playlistId = url.split("=")[1];
    let playlistPackage = {part: "contentDetails", playlistId: playlistId, maxResults: "50", key: key}

    //Gets playlistitems using youtube public API
    request
    .get(playlistUrl,
      playlistPackage)
    .end((err, response)=>{

      //If valid playlist URL: Lists the videos on the webpage
      const vidIds = this.getVideoIds(response);
      ReactDOM.render(
        <this.VideoList vidIds = {vidIds} />,
        document.getElementById('vid_details')
      );

      //Otherwise alerts user of invalid playlist URL
      if(err) alert("Invalid playlist URL:");
    });
  }

}

export default Videolist;
