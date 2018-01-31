import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import GroupDetail from './GroupDetail';

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
      }).catch(() => {
        this.props.history.push('/server-error');
      });
  }

  render() {
    const { groups } = this.state;
    return (
      <div>
        <h1>Your Groups</h1>
        {groups.length > 0 ?
          <ul>
            {groups.map(group => <li key={group.id}><GroupDetail group={group} /></li>)}
          </ul>
        :
          <p>Your Christmas is looking pretty lonely!
          Why don&apos;t you <a href="/create-group">create a new group</a>.
          </p>
        }
      </div>
    );
  }
}

Groups.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Groups;
