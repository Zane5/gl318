import React from 'react';

import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';
import PlayerView from '../components/PlayerView';

interface PlayerProps {
  t: TranslateFunction;
}

class Player extends React.Component<PlayerProps> {
  public render() {
    return <PlayerView {...this.props} />;
  }
}

export default translate('player')(Player);
