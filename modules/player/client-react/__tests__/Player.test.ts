import { expect } from 'chai';

import { updateContent, Renderer } from '@gqlapp/testing-client-react';

describe('Player UI works', () => {
  const renderer = new Renderer({});
  const app = renderer.mount();
  renderer.history.push('/Player');
  const content = updateContent(app.container);

  it('Player page renders on mount', () => {
    // tslint:disable:no-unused-expression
    expect(content).to.not.be.empty;
  });

  it('Player page has title', async () => {
    expect(content.textContent).to.include('Hello, This is the Player module');
  });
});
