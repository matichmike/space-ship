import React, {useEffect, useState} from 'react';
import axios from 'axios';

const jsonApiCall = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com'
})

function Container() {
  const [containerContent, setContainerContent] = useState({});
  const [fetchedUpperImage, setFetchUpperImage] = useState("");
  const [fetchedLogoImage, setFetchLogoImage] = useState("");

  const apiCall = function() {
    jsonApiCall.get("/posts/1")
    .then(res => setContainerContent(res.data))
    .catch((err) => console.log(err))
  };

  const imageFetch = function() {
    jsonApiCall.get("/photos/25")
    .then(res => setFetchUpperImage(res.data.url))
    .catch(err => console.log(err));
  };

  const logoFetch = function() {
    jsonApiCall.get("/photos/89")
    .then(res => setFetchLogoImage(res.data.thumbnailUrl))
    .catch(err => console.log(err));
  };

  useEffect(() => {
    apiCall();
    imageFetch();
    logoFetch();
  })

  return (
    <div className="container">
      <div className="card">
        <img alt="upper-container" className="upper-container" src={fetchedUpperImage}></img>
        <div className="logo-button">
          <img className="logo-img" alt="logo" src={fetchedLogoImage}></img>
          <button className="follow-button">Follow</button>
        </div>
        <div className="bottom-container">
          <p className="title-text">{containerContent.title
          ?
          containerContent.title.split(" ")[0]
          : "Loading..."
        }</p>
          <p className="body-text">{containerContent.body
          ? containerContent.body
          : "Loading..."
           }</p>
          <p className="footer-text">{containerContent.title 
          ? containerContent.title
          : "Loading..."}</p>
        </div>
      </div>
    </div>
  )
}

export default Container;