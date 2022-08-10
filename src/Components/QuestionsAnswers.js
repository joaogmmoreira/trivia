import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import fetchQuestions from '../Services/fetchQuestions';
import Timer from './Timer';
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

  handleClickAnswer = () => {
    this.setState({ buttonNext: true });
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
              return (
                <button
                  key={ answer.text }
                  type="button"
                  data-testid={ testId }
                  disabled={ buttonDisabled }
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
      </div>

        <div>
          { buttonNext === true && (<NextButton />) }
        </div>
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
});

const mapStateToProps = (state) => ({
  timer: state.timer.timer,
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionAnswers);
