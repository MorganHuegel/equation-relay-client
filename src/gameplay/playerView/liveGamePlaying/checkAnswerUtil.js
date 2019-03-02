export function checkAnswer(component, submittedAnswer){
  const questionData = component.state.currentQuestion;
  const questionArray = [questionData.equation1, questionData.equation2, questionData.equation3, questionData.equation4]
  const teamData = component.props.teamData;

  let sum = 0;
  teamData.players.forEach(player => {
    const playersAnswer = questionArray[player.assignedEquationIndex].answer;
    sum += Number(playersAnswer);
  });

  if (submittedAnswer === sum.toString()) {
    return true;
  } else {
    return false;
  }
}