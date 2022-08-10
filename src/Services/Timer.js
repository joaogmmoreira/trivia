export const startTime = () =>  {
    const timer = 30000;
    this.setTimer = setTimeout(() => this.handleButtons(true), timer);
  }

 export const handleButtons = (disabled) => {
    clearInterval(this.setUpdateTimer);
    this.setState({
      buttonDisabled: disabled,
    });
  }

export const updateCountdown = () => {
  const { decreaseTimerCountdown } = this.props;
  const timerDecrease = 1000;
  this.setUpdateTimer = setInterval(() => decreaseTimerCountdown(), timerDecrease);
}
