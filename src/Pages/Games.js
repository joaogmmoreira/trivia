import React from 'react';
import propTypes from 'prop-types';
import Header from '../Components/Header';
import QuestionsAnswers from '../Components/QuestionsAnswers';
class Games extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <div>
        <Header />
        <QuestionsAnswers history={ history } />
      </div>
    );
  }
}

Games.propTypes = {
  history: propTypes.shape({
    push: propTypes.func,
  }).isRequired,
};

export default Games;
