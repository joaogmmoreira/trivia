import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import fetchQuestions from '../Services/fetchQuestions';
import Timer from './Timer';
import { decreaseCountdown, resetCountdown } from '../Redux/actions';

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
      buttonDisabled: false,
      timerCountDown: 0,
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
    console.log(timer);
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
    }, () => { this.updateCountdown(); this.startTime(); });
  }

  handleButtons(disabled) {
    clearInterval(this.setUpdateTimer);
    this.setState({
      buttonDisabled: disabled,
    });
  }

  handleClickAnswer = () => {
    this.setState({ buttonNext: true });
  }

  handleOnClickNext = () => {
    clearInterval(this.setTimer);
    const { questionNumber, questions } = this.state;
    const { history, resetTimerCountdown } = this.props;

    if (questionNumber === questions.length - 1) {
      console.log('fim');
      console.log(history);
      history.push('/feedback');
    }
    console.log('clicou');
    console.log(questionNumber);
    this.handleButtons(false);
    resetTimerCountdown();
    this.updateCountdown();
    this.startTime();
    this.setState((prevState) => ({ questionNumber: prevState.questionNumber + 1,
      timerCountDown: 30,
     }));
    // this.updateCountdown(); // reseta timer
    // atualizar display contador de pontos
  }

  startTime() {
    const timer = 30000;
    this.setTimer = setTimeout(() => this.handleButtons(true), timer);
  }

  updateCountdown() {
    const { decreaseTimerCountdown } = this.props;
    const timerDecrease = 1000;
    this.setUpdateTimer = setInterval(() => decreaseTimerCountdown(), timerDecrease);
  }

  renderQuestionsAndAnswers = () => {
    const { questions, questionNumber, buttonDisabled, timerCountDown } = this.state;

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
                  onClick={ this.handleClickAnswer }
                  handleButtons={ this.handleButtons }
                  timer={ timerCountDown }
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

    return (
      <>
        <div>
          { this.renderQuestionsAndAnswers()}
        </div>
        
        <Timer />
        { buttonNext && (
          <button
            type="button"
            data-testid="btn-next"
            onClick={ this.handleOnClickNext }
          >
            Next
          </button>
        )}
    </>
    );
  }
}

QuestionAnswers.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  decreaseTimerCountdown: () => dispatch(decreaseCountdown()),
  resetTimerCountdown: () => dispatch(resetCountdown()),
});

const mapStateToProps = (state) => ({
  timer: state.timer.timer,
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionAnswers);
