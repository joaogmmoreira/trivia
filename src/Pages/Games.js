import React from 'react';
import PropTypes from 'prop-types';
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
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default Games;
