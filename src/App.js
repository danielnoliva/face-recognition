import React, { Component } from "react";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Particles from "react-particles-js";
import Clarifai from "clarifai";

import "./App.css";

const app = new Clarifai.App({
  apiKey: process.env.REACT_APP_CLARIFAI_API_KEY
});

const particlesParams = {
  particles: {
    number: {
      value: 70,
      density: {
        enable: true,
        value_area: 700
      }
    }
  }
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      imageUrl: ""
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleUrlSubmit = this.handleUrlSubmit.bind(this);
  }

  handleInputChange(event) {
    this.setState({
      input: event.target.value
    });
    console.log(event.target.value);
  }

  handleUrlSubmit(event) {
    this.setState({ imageUrl: this.state.input });
    app.models
      .predict("a403429f2ddf4b49b307e318f00e528b", this.state.input)
      .then(
        function(response) {
          console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
        },
        function(err) {
          // there was an error
        }
      );
  }
  

  render() {
    return (
      <div className="App">
        <Particles className="particles" params={particlesParams} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm
          onInputChange={this.handleInputChange}
          onUrlSubmit={this.handleUrlSubmit}
        />
        <FaceRecognition imageUrl={this.state.imageUrl} />
      </div>
    );
  }
}

export default App;
