import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { apiResponse: "" };
    }

    callAPI() {
        fetch("http://localhost:8000/")
            .then(res => res.text())
            .then(res => this.setState({ apiResponse: res }))
            .catch(err => err);
    }

    componentDidMount() {
        this.callAPI();
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <p>TEMOS MUITO QUE APRENDER Wingmanos</p>
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <p className="App-intro">{this.state.apiResponse}</p>
            </div>
        );
    }
}


/* class LoginForm extends Component {
    render() {
        return (
            <div>
                <form>
                    <label>
                        Email:
                        <input type="text" name="email" />
                    </label>
                    <label>
                        Password:
                        <input type="text" name="password" />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}

class RegisterForm extends Component {
    render() {
        return (
            <div>
                <form>
                    <label>
                        Email:
                        <input type="text" name="email"/>
                    </label>
                    <label>
                        Password:
                        <input type="text" name="password"/>
                    </label>
                    <label>
                        Name:
                        <input type="text" name="name"/>
                    </label>
                    <label>
                        Birthdate:
                        <input type="text" name="birthdate"/>
                    </label>
                    <label>
                        <input type="number" name="savings"></input>
                    </label>
                    <label>
                        <input type="text" name="gender"></input>
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}
          */   




            




export default App;