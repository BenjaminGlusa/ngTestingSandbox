import { NgtestingPage } from './app.po';

describe('ngtesting App', () => {
  let page: NgtestingPage;

  beforeEach(() => {
    page = new NgtestingPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
