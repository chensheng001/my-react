import React, {Component} from 'react';
import info from "./TestData";

class Home extends Component {

  componentDidMount() {
    console.log(info)
  }

  render() {
    return (
      <div>
        home
      </div>
    );
  }
}

export default Home;