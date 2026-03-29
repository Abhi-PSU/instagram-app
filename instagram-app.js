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
    // grab the index from the url if someone shared a link
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
    };
  }

  static get styles() {
    return [super.styles, css`
      :host {
        display: block;
        font-family: var(--ddd-font-navigation);
      }
      .card {
        max-width: 4200px;
        margin: 40px auto;
        border: 1px solid #dbdbdb;
        border-radius: 6px;
        overflow: hidden;
        background: white;
      }
      .card-header {
        display: flex;
        align-items: center;
        padding: 12px;
        gap: 10px;
      }
      .avatar {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        object-fit: cover;
      }
      .username {
        font-weight: bold;
        font-size: 14px;
        color: #262626;
      }
      .card-image img {
        width: 100%;
        display: block;
      }
      .card-actions {
        padding: 10px 12px;
        display: flex;
        gap: 12px;
        align-items: center;
      }
      .like-btn {
        background: none;
        border: 1px solid #dbdbdb;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
        padding: 4px 10px;
        color: #262626;
      }
      .caption {
        padding: 0 12px 4px;
        font-size: 14px;
        color: #262626;
      }
      .date {
        padding: 0 12px 12px;
        font-size: 12px;
        color: #8e8e8e;
      }
      .nav {
        display: flex;
        justify-content: space-between;
        padding: 10px 12px;
        border-top: 1px solid #dbdbdb;
      }
      .nav button {
        background: none;
        border: 1px solid #dbdbdb;
        border-radius: 4px;
        padding: 6px 14px;
        cursor: pointer;
        font-size: 14px;
        color: #262626;
      }
      .nav button:disabled {
        opacity: 0.3;
        cursor: default;
      }
      .counter {
        font-size: 13px;
        color: #8e8e8e;
        align-self: center;
      }
    `];
  }

  // fetch the fox data when the page loads
  async connectedCallback() {
    super.connectedCallback();
    await this.loadData();
  }

  async loadData() {
    const url = new URL("../lib/api.json", import.meta.url).href;
    const response = await fetch(url);
    const data = await response.json();
    this.images = data.images;
    this.author = data.author;
  }

  // see if this photo was already liked so it dosent reset 
  isLiked(id) {
    return localStorage.getItem(`liked-${id}`) === "true";
  }

  // flip the like and save it so it remembers
  toggleLike(id) {
    const current = this.isLiked(id);
    localStorage.setItem(`liked-${id}`, String(!current));
    this.requestUpdate();
  }

  // keep the url in sync with what slide ur on, holding its place 
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

  render() {
    const image = this.images[this.activeIndex];
    if (!image) return html`<p style="padding:20px">luring foxes...</p>`;

    return html`
      <div class="card">
        <div class="card-header">
          <img class="avatar" src="${this.author.image}" alt="author" />
          <span class="username">${this.author.channel}</span>
        </div>
        <div class="card-image">
          <img src="${image.thumbnail}" alt="${image.name}" />
        </div>
        <div class="card-actions">
          <button class="like-btn" @click="${() => this.toggleLike(image.id)}">
            ${this.isLiked(image.id) ? "♥ liked" : "♡ like"}
          </button>
        </div>
        <div class="caption">${image.name}</div>
        <div class="date">${image.description} · ${image.dateTaken}</div>
        <div class="nav">
          <button @click="${this.goPrev}" ?disabled="${this.activeIndex === 0}">Back</button>
          <span class="counter">${this.activeIndex + 1} / ${this.images.length}</span>
          <button @click="${this.goNext}" ?disabled="${this.activeIndex === this.images.length - 1}">Next</button>
        </div>
      </div>
    `;
  }
}

customElements.define(InstagramApp.tag, InstagramApp);