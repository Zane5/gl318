import React from 'react';

import ClientModule from '@gqlapp/module-client-react';
import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';
import loadable from '@loadable/component';

import { Route, NavLink } from 'react-router-dom';
import { MenuItem } from '@gqlapp/look-client-react';
import resources from './locales';

const NavLinkWithI18n = translate('player')(({ t }: { t: TranslateFunction }) => (
  <NavLink to="/player" className="nav-link" activeClassName="active">
    {t('player:navLink')}
  </NavLink>
));

export default new ClientModule({
  route: [<Route exact path="/player" component={loadable(() => import('./containers/Player').then(c => c.default))} />],
  navItem: [
    <MenuItem key="/player">
      <NavLinkWithI18n />
    </MenuItem>
  ],
  localization: [{ ns: 'player', resources }]
});
