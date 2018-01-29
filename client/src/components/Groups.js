import React, { Component } from 'react';
import axios from 'axios';

class Groups extends Component {
  constructor(props) {
    super(props);

    this.state = {
      groups: [],
    };
  }

  componentDidMount() {
    axios.get('/groups', { headers: { authorization: `bearer ${localStorage.getItem('token')}` } })
      .then((response) => {
        this.setState({ groups: response.data });
      }).catch((err) => {
        this.props.history.push('/server-error');
      });
  }

  render() {
    const { groups } = this.state;
    return (
      <div>
        <h1>Your Groups</h1>
        <ul>
          {groups.map(group => <li key={group.id}>{group.name}</li>)}
        </ul>
      </div>
    );
  }
}

export default Groups;
