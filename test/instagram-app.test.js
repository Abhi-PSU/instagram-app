import { html, fixture, expect } from '@open-wc/testing';
import "../instagram-app.js";

describe("InstagramApp test", () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`
      <instagram-app
        title="title"
      ></instagram-app>
    `);
  });

  it("basic will it blend", async () => {
    expect(element).to.exist;
  });

  it("passes the a11y audit", async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
