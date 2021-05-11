import './App.css';
import './index.css';
import Clarifai from 'clarifai'
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Particles from 'react-particles-js';
import 'tachyons';
import React, { Component } from 'react';

const particlesOptions = {
    particle: {
        line_linked: {
            shadow: {
                enable: true,
                color: "#3CA901",
                blur: 1
            }
        }
    }
}

const app = new Clarifai.App({
    apiKey: '76259e7ad8f54022a9a8631ed2a7bdb4'
});

class App extends Component {

    constructor() {
        super()
        this.state = {
            input: '',
            imageUrl: '',
            box: {}
        }
    }

    calculateFaceLocation = (data) => {

        const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
        const image = document.getElementById('inputimage');
        const width = Number(image.width);
        const height = Number(image.height);

        return {
            leftCol: clarifaiFace.left_col * width,
            topRow: clarifaiFace.top_row * height,
            rightCol: height - (clarifaiFace.right_col * width),
            bottomRow: height - (clarifaiFace.bottom_row * height)
        }

    }

    displayFaceBox = (box) => {
        console.log(box);
        this.setState({ box: box });
    }

    onInputChange = (event) => {
        this.setState({ input: event.target.value })
    }

    onButtonSubmit = () => {
        this.setState({ imageUrl: this.state.input });
        app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
            .then(response => this.displayFaceBox(this.calculateFaceLocation(response))
                // console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
                .catch(err => console.log(err))

            )
    }

    render() {
        return (

            <div className="App">

                <Particles className='particles'
                    params={particlesOptions} />
                <Navigation />
                <Logo />
                <Rank />
                <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
                <FaceRecognition imageUrl={this.state.imageUrl} box={this.state.box} />
            </div>
        );
    }
}


export default App;
