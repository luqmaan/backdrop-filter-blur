import React, { Component } from 'react';
import {Motion, StaggeredMotion, spring, presets} from 'react-motion';
import range from 'lodash/range';

import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {x: 250, y: 300};
  }

  componentDidMount = () => {
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('touchmove', this.handleTouchMove);
  }

  handleMouseMove = ({pageX: x, pageY: y}) => {
    this.setState({x, y});
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
    const {x, y} = this.state;
    const distance = Math.max(Math.hypot(x - (window.innerWidth / 2), y - (window.innerHeight / 2)), 120);
    // const blur = Math.max(distance / 10) - 12;
    return (
      <div className="App">
        <Motion
          defaultStyle={{x: 12}}
          style={{x: spring(distance, presets.wobbly)}}
        >
          {({x}) => (
            <div
              className={`demo1-ball ball-0`}
              style={{
                width: `${x}px`,
                height: `${x}px`,
                borderRadius: `${x /  2}px`,
                WebkitBackdropFilter: `blur(${ Math.max(x / 10) - 12}px)`,
              }}
            />
          )}
        </Motion>
      </div>
    );
  }
}

export default App;
