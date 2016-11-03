import React, { Component } from 'react';
import {Motion, StaggeredMotion, spring, presets} from 'react-motion';
import range from 'lodash/range';

import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {x: 0, y: 0};
  }

  componentDidMount = () => {
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('touchmove', this.handleTouchMove);
    window.addEventListener('deviceorientation', this.handleOrientation, true);
    window.addEventListener('devicemotion', this.handleMotion, true);
  }

  handleMouseMove = ({pageX: x, pageY: y}) => {
    this.setState({x, y});
  }

  handleOrientation = ({beta, gamma}) => {
    this.setState({
      x: ((2 * gamma) / 180) * window.innerWidth,
      y: ((2 * beta) / 90) * window.innerHeight,
    })
  }

  handleTouchMove = ({touches}) => {
    this.handleMouseMove(touches[0]);
  }

  getStyles = (prevStyles) => {
    // `prevStyles` is the interpolated value of the last tick
    const endValue = prevStyles.map((_, i) => {
      return i === 0
        ? this.state
        : {
            x: spring(prevStyles[i - 1].x, presets.gentle),
            y: spring(prevStyles[i - 1].y, presets.gentle),
          };
    });
    return endValue;
  }

  render() {
    const xDistance = Math.max(Math.abs(this.state.x - (window.innerWidth / 2)), 120);
    const yDistance = Math.abs(this.state.y - (window.innerHeight / 2));
    console.log(this.state.x, xDistance)
    return (
      <div>
        <div id="ytplayer"></div>
          <div className="App">
            <Motion
              defaultStyle={{
                x: 0,
                y: 0,
              }}
              style={{
                x: spring(xDistance, presets.wobbly),
                y: spring(yDistance, presets.wobbly),
              }}
            >
              {({x, y}) => (
                <div
                  className={`demo1-ball ball-0`}
                  style={{
                    width: `${x}px`,
                    height: `${x}px`,
                    borderRadius: `${x/2}px`,
                    WebkitBackdropFilter: `blur(${y / 10}px)`,
                  }}
                />
            )}
            </Motion>
          </div>
      </div>
    );
  }
}

export default App;
