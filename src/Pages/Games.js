import React from 'react';
import { connect } from 'react-redux';
import Header from '../Components/Header';
import QuestionsAnswers from '../Components/QuestionsAnswers';

class Games extends React.Component {

import fetchQuestions from '../Services/fetchQuestions';
import Timer from '../Components/Timer';
import { decreaseCountdown } from '../Redux/actions';

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

class Games extends React.Component {
  constructor() {
    super();

    this.state = {
      questions: [],
      questionNumber: 0,
      buttonDisabled: false,
    };
  }

  componentDidMount() {
    this.saveQuestionsToState();
  }

  componentDidUpdate() {
    const { timer } = this.props;
    if (timer <= 0) {
      clearInterval(this.setUpdateTimer);
    }
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
                  disabled={ buttonDisabled }
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
    return (
      <div>
        <Header />
        <QuestionsAnswers />
        
        <div>
          {this.renderQuestionsAndAnswers()}
          <Timer />
        </div>

      </div>
    );
  }
}

export default Games;

Games.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  decreaseTimerCountdown: () => dispatch(decreaseCountdown()),
});

const mapStateToProps = (state) => ({
  timer: state.timer.timer,
});

export default connect(mapStateToProps, mapDispatchToProps)(Games);
