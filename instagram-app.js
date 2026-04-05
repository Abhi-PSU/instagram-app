// Re-formatted the entire color schme of the app to be light/dark mode compatible, 
// added a few more details to the image cards, and made the images link to the full size version when clicked. 
// Also added a counter to show which image you're on out of the total.


import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

export class InstagramApp extends DDDSuper(LitElement) {

  static get tag() {
    return "instagram-app";
  }

  constructor() {
    super();
    this.images = [];
    this.author = {};
    this.activeIndex = 0;
    this.showCopied = false;
  
    const params = new URLSearchParams(window.location.search);
    const urlIndex = params.get("activeIndex");
    if (urlIndex !== null) {
      this.activeIndex = parseInt(urlIndex);
    }
  }

  static get properties() {
    return {
      ...super.properties,
      images: { type: Array },
      author: { type: Object },
      activeIndex: { type: Number },
      showCopied: { type: Boolean },
    };
  }

  static get styles() {
    return [super.styles, css`
      :host {
        display: flex;
        justify-content: center;
        font-family: var(--ddd-font-navigation);
        padding: 32px 16px;
        color: light-dark(#111, #f0f0f0);
      }
      .card {
        width: 100%;
        max-width: 400px;
        border: 1px solid light-dark(#e0e0e0, #2a2a2a);
        border-radius: 3px;
        background: light-dark(#fff, #111);
        overflow: hidden;
      }
      .card-header {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px 12px;
        border-bottom: 1px solid light-dark(#e0e0e0, #2a2a2a);
      }
      .avatar {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        object-fit: cover;
        filter: grayscale(100%);
      }
      .username {
        font-size: 13px;
        font-weight: 600;
        letter-spacing: 0.3px;
        color: light-dark(#111, #f0f0f0);
      }
      .user-since {
        font-size: 11px;
        color: light-dark(#999, #666);
        margin-left: auto;
      }
      .card-image {
        width: 100%;
        aspect-ratio: 1 / 1;
        background: light-dark(#f5f5f5, #1a1a1a);
        overflow: hidden;
      }
      .card-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
        filter: grayscale(20%);
      }
      .card-body {
        padding: 12px;
      }
      .image-name {
        font-size: 13px;
        font-weight: 600;
        margin-bottom: 4px;
        color: light-dark(#111, #f0f0f0);
      }
      .image-desc {
        font-size: 12px;
        color: light-dark(#555, #aaa);
        margin-bottom: 4px;
        line-height: 1.5;
      }
      .image-date {
        font-size: 11px;
        color: light-dark(#bbb, #555);
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
      .card-actions {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 10px 12px;
        border-top: 1px solid light-dark(#e0e0e0, #2a2a2a);
      }
      .like-btn, .share-btn {
        background: none;
        border: none;
        cursor: pointer;
        font-size: 12px;
        padding: 0;
        color: light-dark(#111, #f0f0f0);
        letter-spacing: 0.3px;
      }
      .like-btn:hover, .share-btn:hover {
        text-decoration: underline;
      }
      .share-btn {
        margin-left: auto;
        color: light-dark(#999, #666);
      }
      .copied-msg {
        font-size: 11px;
        color: light-dark(#999, #666);
      }
      .nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 12px;
        border-top: 1px solid light-dark(#e0e0e0, #2a2a2a);
      }
      .nav button {
        background: none;
        border: none;
        cursor: pointer;
        font-size: 12px;
        color: light-dark(#111, #f0f0f0);
        padding: 0;
        letter-spacing: 0.3px;
      }
      .nav button:hover {
        text-decoration: underline;
      }
      .nav button:disabled {
        opacity: 0.2;
        cursor: default;
        text-decoration: none;
      }
      .counter {
        font-size: 11px;
        color: light-dark(#bbb, #555);
        letter-spacing: 0.5px;
      }
    `];
  }

  async connectedCallback() {
    super.connectedCallback();
    await this.loadData();
  }

  // pulls image + author data, falls back to local json when developing
  async loadData() {
  const response = await fetch("/api.json");
  const data = await response.json();
  this.images = data.images;
  this.author = data.author;

}

  isLiked(id) {
    return localStorage.getItem(`liked-${id}`) === "true";
  }

  // saves like state to localstorage so it persists on refresh
  toggleLike(id) {
    const current = this.isLiked(id);
    localStorage.setItem(`liked-${id}`, String(!current));
    this.requestUpdate();
  }

  // keeps the url updated so you can share a specific slide
  updateURL(index) {
    const url = new URL(window.location.href);
    url.searchParams.set("activeIndex", index);
    history.pushState(null, "", url.toString());
  }

  goNext() {
    if (this.activeIndex < this.images.length - 1) {
      this.activeIndex += 1;
      this.updateURL(this.activeIndex);
    }
  }

  goPrev() {
    if (this.activeIndex > 0) {
      this.activeIndex -= 1;
      this.updateURL(this.activeIndex);
    }
  }

  sharePhoto() {
    const url = new URL(window.location.href);
    url.searchParams.set("activeIndex", this.activeIndex);
    navigator.clipboard.writeText(url.toString());
    this.showCopied = true;
    setTimeout(() => {
      this.showCopied = false;
    }, 2000);
  }

  render() {
    const image = this.images[this.activeIndex];
    if (!image) return html`<p style="padding:20px;font-size:13px">loading...</p>`;

    return html`
      <div class="card">
        <div class="card-header">
          <img class="avatar" src="${this.author.image}" alt="avatar" />
          <span class="username">${this.author.channel}</span>
          <span class="user-since">since ${this.author.userSince}</span>
        </div>
        <div class="card-image">
  <a href="${image.fullSize}" target="_blank">
    <img
      loading="lazy"
      src="${image.thumbnail}"
      alt="${image.name}"
    />
  </a>
</div>
        <div class="card-body">
          <div class="image-name">${image.name}</div>
          <div class="image-desc">${image.description}</div>
          <div class="image-date">${image.dateTaken}</div>
        </div>
        <div class="card-actions">
          <button class="like-btn" @click="${() => this.toggleLike(image.id)}">
            ${this.isLiked(image.id) ? "♥ liked" : "♡ like"}
          </button>
          ${this.showCopied
            ? html`<span class="copied-msg">link copied</span>`
            : ""}
          <button class="share-btn" @click="${this.sharePhoto}">share</button>
        </div>
        <div class="nav">
          <button @click="${this.goPrev}" ?disabled="${this.activeIndex === 0}">prev</button>
          <span class="counter">${this.activeIndex + 1} / ${this.images.length}</span>
          <button @click="${this.goNext}" ?disabled="${this.activeIndex === this.images.length - 1}">next</button>
        </div>
      </div>
    `;
  }
}

customElements.define(InstagramApp.tag, InstagramApp);