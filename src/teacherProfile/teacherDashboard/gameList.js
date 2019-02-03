import React from 'react';

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

  return (
    <div className='game-list'>
      {gameList}
    </div>
  )
}