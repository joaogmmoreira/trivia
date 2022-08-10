import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import fetchQuestions from '../Services/fetchQuestions';
import Timer from './Timer';
import { decreaseCountdown, setAssertions, setScore } from '../Redux/actions';
import '../Pages/Games.css';

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
    }, () => { this.updateCountdown(); this.startTime(); });
  }

  colorizeAnswer = (target) => {
    const parentElement = target.parentNode;
    const childrenElements = parentElement.children;
    for (let i = 0; i < childrenElements.length; i += 1) {
      const elementClass = (childrenElements[i].classList);
      if (elementClass.value === 'red') {
        elementClass.add('redd');
      }
      if (elementClass.value === 'green') {
        elementClass.add('greenn');
      }
    }
  }

  pointsCalculator = (timer, difficulty) => {
    const fixedPoint = 10;
    const easy = 1;
    const medium = 2;
    const hard = 3;
    let points;

    if (difficulty === 'easy') {
      points = fixedPoint + (timer * easy);
    }
    if (difficulty === 'medium') {
      points = fixedPoint + (timer * medium);
    }
    if (difficulty === 'hard') {
      points = fixedPoint + (timer * hard);
    }

    return points;
  }

  handleClickAnswer = ({ target }) => {
    this.counthePoints(target);
    this.colorizeAnswer(target);
    this.setState({ buttonNext: true });
  }

  counthePoints = (target) => {
    const { value: clickedAnswerDifficulty } = target;
    const dataTestId = target.getAttribute('data-testid');
    const { timer, dispatchScore, score, dispatchAssertions, assertions } = this.props;
    if (dataTestId === 'correct-answer') {
      const points = this.pointsCalculator(timer, clickedAnswerDifficulty);
      dispatchScore(score + points);
      dispatchAssertions(assertions + 1);
    }
  }

  handleOnClickNext = () => {
    const { questionNumber, questions } = this.state;
    const { history } = this.props;

    if (questionNumber === questions.length - 1) {
      console.log('fim');
      console.log(history);
      history.push('/feedback');
    }
    console.log('clicou');
    console.log(questionNumber);
    this.setState((prevState) => ({ questionNumber: prevState.questionNumber + 1 }));
    // this.updateCountdown(); // reseta timer
    // atualizar display contador de pontos
  }

  startTime() {
    const timer = 30000;
    setTimeout(() => this.setState({
      buttonDisabled: true,
    }), timer);
  }

  updateCountdown() {
    const { decreaseTimerCountdown } = this.props;
    const timerDecrease = 1000;
    this.setUpdateTimer = setInterval(() => decreaseTimerCountdown(), timerDecrease);
  }

  renderQuestionsAndAnswers = () => {
    const { questions, questionNumber, buttonDisabled } = this.state;

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
              const answerClass = answer.wrong
                ? 'red'
                : 'green';
              return (
                <button
                  key={ answer.text }
                  className={ answerClass }
                  type="button"
                  data-testid={ testId }
                  disabled={ buttonDisabled }
                  onClick={ this.handleClickAnswer }
                  value={ element.difficulty }
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
      <div>

        <div>
          { this.renderQuestionsAndAnswers()}
        </div>

        <div>
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
        </div>

      </div>

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
  dispatchScore: (points) => dispatch(setScore(points)),
  dispatchAssertions: (assertion) => dispatch(setAssertions(assertion)),
});

const mapStateToProps = (state) => ({
  timer: state.timer.timer,
  score: state.player.score,
  assertions: state.player.assertions,
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionAnswers);
