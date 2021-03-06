import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class LyricList extends Component {
  onLike(id, likes) {
    this.props.mutate({
      variables: { id },
      optimisticResponse: {
        __typename: 'Mutation',
        likeLyric: {
          id,
          __typename: 'LyricType',
          likes: likes + 1,
        },
      },
    });
  }

  renderLyrics() {
    return this.props.lyrics.map(({ id, content, likes }) => (
      <ul className='collection-item' key={id}>
        {content}
        <div className='right'>
          <i onClick={() => this.onLike(id, likes)} className='material-icons'>
            thumb_up
          </i>
          <span className='count'>{likes}</span>
        </div>
      </ul>
    ));
  }

  render() {
    return (
      <div>
        <ul className='collection'>{this.renderLyrics()}</ul>
      </div>
    );
  }
}

const mutation = gql`
  mutation LikeLyric($id: ID) {
    likeLyric(id: $id) {
      id
      likes
    }
  }
`;

export default graphql(mutation)(LyricList);
