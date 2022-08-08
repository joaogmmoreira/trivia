import PropTypes from 'prop-types';
import React from 'react';
import Header from '../Components/Header';
import fetchQuestions from '../Services/fetchQuestions';

class Games extends React.Component {
  constructor() {
    super();

    this.state = {

    };
  }

  componentDidMount() {
    this.getQuestions();
  }

  getQuestions = async () => {
    const { history } = this.props;
    const questions = await fetchQuestions();
    console.log(questions);

    if (questions.response_code !== 0) {
      // console.log('oi');
      localStorage.removeItem('token');
      history.push('/');
    }
    return questions.results;
  }

  render() {
    return (
      <Header />
    );
  }
}

Games.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default Games;
