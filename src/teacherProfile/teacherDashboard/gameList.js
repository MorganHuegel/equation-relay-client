import React from 'react';

import { GameListItem } from './gameListItem';

export function GameList (props) {
  const gameList = props.games.map(game => {
    return <GameListItem title={game.title} description={game.description} key={game.id}/>
  });

  return (
    <div className='game-list'>
      {gameList}
    </div>
  )
}