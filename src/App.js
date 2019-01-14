import React, { Component } from "react";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import SignIn from "./components/SignIn/SignIn";
import Register from "./components/Register/Register";

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
      imageUrl: "",
      box: "",
      route: "signin",
      isSignedIn: false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleUrlSubmit = this.handleUrlSubmit.bind(this);
    this.calculateFaceLocation = this.calculateFaceLocation.bind(this);
    this.displayFacebox = this.displayFacebox.bind(this);
    this.handleRouteChange = this.handleRouteChange.bind(this);
  }

  calculateFaceLocation(data) {
    const faceData = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.querySelector("#inputImage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: faceData.left_col * width,
      topRow: faceData.top_row * height,
      rightCol: width - faceData.right_col * width,
      bottomRow: height - faceData.bottom_row * height
    };
  }

  displayFacebox(box) {
    this.setState({ box: box });
    console.log(box);
  }

  handleInputChange(event) {
    this.setState({
      input: event.target.value
    });
  }

  handleUrlSubmit(event) {
    this.setState({ imageUrl: this.state.input });
    app.models
      .predict("a403429f2ddf4b49b307e318f00e528b", this.state.input)
      .then(response =>
        this.displayFacebox(this.calculateFaceLocation(response))
      )
      .catch(err => console.log(err));
  }

  handleRouteChange(route) {
    if (route === "signout") {
      this.setState({ isSignedIn: false });
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  }

  render() {
    const { route, box, isSignedIn, imageUrl } = this.state;
    return (
      <div className="App">
        <Particles className="particles" params={particlesParams} />
        <Navigation
          onRouteChange={this.handleRouteChange}
          isSignedIn={isSignedIn}
        />
        {route === "home" ? (
          <main>
            <Logo />
            <Rank />
            <ImageLinkForm
              onInputChange={this.handleInputChange}
              onUrlSubmit={this.handleUrlSubmit}
            />
            <FaceRecognition box={box} imageUrl={imageUrl} />
          </main>
        ) : route === "signin" ? (
          <SignIn onRouteChange={this.handleRouteChange} />
        ) : (
          <Register onRouteChange={this.handleRouteChange} />
        )}
      </div>
    );
  }
}

export default App;
