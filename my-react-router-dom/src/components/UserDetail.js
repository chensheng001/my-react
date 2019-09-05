import React, {Component} from 'react';

class UserDetail extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log(this.props.match.params)
  }

  render() {
    return (
      <div>
        UserDetail--{this.props.match.params.id}
      </div>
    );
  }
}

export default UserDetail;