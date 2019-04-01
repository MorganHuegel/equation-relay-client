import React from 'react';

import '../../stylesheets/teacherProfile/teacherDashboard/gameList.css';

import { GameListItem } from './gameListItem';

export function GameList (props) {
  const gameList = props.games.map(game => {
    return <GameListItem 
      title={game.title} 
      description={game.description} 
      key={game.id} 
      onEditClick={props.onEditClick} 
      id={game.id} 
      numOfQuestions={game.numOfQuestions}
      deleteGameClick={props.deleteGameClick}
      toggleDeletingState={props.toggleDeletingState}
      clickPlayLive={props.clickPlayLive}
      />
  });

  if (gameList.length === 0) {
    return <p style={{fontStyle: 'italic'}}>Click "Create New" to add your  first game!</p>
  }

  return (
    <ul className='game-list'>
      {gameList}
    </ul>
  )
}