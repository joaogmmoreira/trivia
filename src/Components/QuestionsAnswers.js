import React from 'react';
import PropTypes from 'prop-types';
import fetchQuestions from '../Services/fetchQuestions';
import NextButton from './NextButton';

// https://stackoverflow.com/questions/64522159/shuffle-the-array-of-objects-without-picking-the-same-item-multiple-times
function shuffle(array) {
  let currentIndex = array.length; let
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

class QuestionAnswers extends React.Component {
  constructor() {
    super();

    this.state = {
      questions: [],
      questionNumber: 0,
      buttonNext: false,
    };
  }

  componentDidMount() {
    this.saveQuestionsToState();
  }

  saveQuestionsToState = async () => {
    const { history } = this.props;
    const questions = await fetchQuestions();

    if (questions.response_code !== 0) {
      localStorage.removeItem('token');
      history.push('/');
    }

    return this.setState({
      questions: questions.results,
    });
  }

  handleClickAnswer = () => {
    this.setState({ buttonNext: true });
  }

  renderQuestionsAndAnswers = () => {
    const { questions, questionNumber } = this.state;

    return questions.map((element, index) => {
      let answers = [];
      answers.push({
        text: element.correct_answer,
        wrong: false,
      });
      element.incorrect_answers.forEach((incorrectAns) => answers.push({
        text: incorrectAns,
        wrong: true,
      }));

      answers = shuffle(answers);
      let wrongIndex = 0;

      return (
        <>
          <div key={ index } data-testid="question-category">
            {element.category}
          </div>
          <div data-testid="question-text">
            {element.question}
          </div>
          <div type="button" data-testid="answer-options">
            {answers.map((answer) => {
              const testId = answer.wrong
                ? `wrong-answer-${wrongIndex}`
                : 'correct-answer';
              if (answer.wrong) {
                wrongIndex += 1;
              }
              return (
                <button
                  key={ answer.text }
                  type="button"
                  data-testid={ testId }
                  onClick={ this.handleClickAnswer }
                >
                  {answer.text}
                </button>
              );
            })}
          </div>
        </>
      );
    })[questionNumber];
  }

  render() {
    const { buttonNext } = this.state;

    if (buttonNext === true) return (<NextButton />);
    return (
      <div>
        {this.renderQuestionsAndAnswers()}
      </div>
    );
  }
}

QuestionAnswers.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default QuestionAnswers;
