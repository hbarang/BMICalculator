import React from "react";
import ReactDOM from "react-dom";
import bootstrap from "bootstrap"; // eslint-disable-line no-unused-vars
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

class ParentComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { height: 0, weight: 0, bmi: 0 };
  }

  callbackFunctionHeight = msg => {
    this.setState({ height: msg });
  };

  callbackFunctionWeight = msg => {
    this.setState({ weight: msg });
  };

  calculateBMI = () => {
    this.setState({
      bmi: (this.state.weight * 10000) / this.state.height / this.state.height
    });
  };

  conditionCalc = () => {
    if (this.state.bmi < 18.5) {
      return "Underweight";
    }
    if (this.state.bmi >= 18.5 && this.state.bmi < 24.9) {
      return "Normal";
    }
    if (this.state.bmi >= 24.9 && this.state.bmi < 29.9) {
      return "Overweight";
    }
    if (this.state.bmi >= 29.9) {
      return "Obese";
    }
  };

  render() {
    return (
      <div className="container">
        <h1>BMI CALCULATOR</h1>
        <HeightContainer parentCallback={this.callbackFunctionHeight} />
        <WeightContainer parentCallback={this.callbackFunctionWeight} />
        <button
          type="button"
          className="btn btn-secondary btn-lg"
          onClick={this.calculateBMI}
        >
          CALCULATE
        </button>
        {this.state.bmi === 0 ? (
          <p>Enter your height and weight</p>
        ) : (
          <div>
            <p>Your BMI is: {this.state.bmi.toFixed(1)}</p>
            <p>Your condition is: {this.conditionCalc()}</p>
          </div>
        )}
      </div>
    );
  }
}

class WeightContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { weight: "0" };
  }

  sendData = event => {
    this.setState({ weight: event.target.value }, function() {
      this.props.parentCallback(this.state.weight);
    });
  };

  render() {
    return (
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text" id="basic-addon1">
            Weight
          </span>
        </div>
        <input min="0" className="form-control" onChange={this.sendData} />
      </div>
    );
  }
}

class HeightContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { height: "0" };
  }

  sendData = event => {
    this.setState({ height: event.target.value }, function() {
      this.props.parentCallback(this.state.height);
    });
  };

  render() {
    return (
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text" id="basic-addon1">
            Height
          </span>
        </div>
        <input className="form-control" onChange={this.sendData} />
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<ParentComponent />, rootElement);
