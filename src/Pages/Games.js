import PropTypes from 'prop-types';
import React from 'react';
import Header from '../Components/Header';
import fetchQuestions from '../Services/fetchQuestions';

class Games extends React.Component {
  constructor() {
    super();

    this.state = {
      questions: [],
      questionNumber: 0,
    };
  }

  componentDidMount() {
    this.saveQuestionsToState();
  }

  saveQuestionsToState = async () => {
    const { history } = this.props;
    const questions = await fetchQuestions();
    // console.log(questions.results);

    if (questions.response_code !== 0) {
      // console.log('oi');
      localStorage.removeItem('token');
      history.push('/');
    }

    return this.setState({
      questions: questions.results,
    });
    // console.log(this.state);
  }

  renderQuestionsAndAnswers = () => {
    const { questions, questionNumber } = this.state;
    // console.log(this.state);

    return questions.map((element, index) => (
      <>
        <div key={ index } data-testid="question-category">
          { element.category }
        </div>
        <div data-testid="question-text">
          {element.question}
        </div>
        <button type="button" data-testid="answer-options">
          {element.incorrect_answers}
        </button>
      </>
    ))[questionNumber];
  }

  render() {
    return (
      <div>
        <Header />
        <div>
          {this.renderQuestionsAndAnswers()}
        </div>
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
