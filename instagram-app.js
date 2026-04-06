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
    this.showModal = false;

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
          showModal: { type: Boolean },

    };
  }

  static get styles() {
    return [super.styles, css`
      :host {
  display: block;
  font-family: var(--ddd-font-navigation);
  max-width: 420px;
  margin: 0 auto;
}
      .card {
        max-width: 420px;
        margin: 40px auto;
        border: 1px solid var(--ddd-theme-default-limestoneLight);
        border-radius: 6px;
        overflow: hidden;
        background: var(--ddd-theme-default-white);
  border: 1px solid var(--ddd-theme-default-limestoneLight);
  
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
        color:var(--ddd-theme-default-coalyGray);
      }
      .card-image img {
  width: 100%;
  max-height: 500px;
  object-fit: cover;
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
        border: 1px solid var(--ddd-theme-default-limestoneLight);
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
        padding: 4px 10px;
        color: var(--ddd-theme-default-coalyGray);
      }
      .share-btn {
  background: none;
  border: 1px solid var(--ddd-theme-default-limestoneLight);
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  padding: 4px 10px;
  color: var(--ddd-theme-default-coalyGray);
}
      .caption {
        padding: 0 12px 4px;
        font-size: 14px;
         color: var(--ddd-theme-default-coalyGray); 
      }
      .date {
        padding: 0 12px 12px;
        font-size: 12px;
        color: var(--ddd-theme-default-limestoneGray);
      }
      .nav {
        display: flex;
        justify-content: space-between;
        padding: 10px 12px;
        border-top: 1px solid var(--ddd-theme-default-limestoneLight);
      }
      .nav button {
        background: none;
        border: 1px solid var(--ddd-theme-default-limestoneLight);
        border-radius: 4px;
        padding: 6px 14px;
        cursor: pointer;
        font-size: 14px;
        color:  var(--ddd-theme-default-coalyGray);
      }
      .nav button:disabled {
        opacity: 0.3;
        cursor: default;
      }
      .counter {
        font-size: 13px;
        color: var(--ddd-theme-default-limestoneGray);
        align-self: center;
      }
      .modal-overlay {
        position: fixed;
        top: 0; left: 0;
        width: 100%; height: 100%;
        background: rgba(0,0,0,0.85);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 100;
      }
      .modal-overlay img {
        max-width: 90%;
        max-height: 90vh;
        border-radius: 6px;
      }
      .modal-close {
        position: fixed;
        top: 16px; right: 16px;
        background: none;
        border: none;
        color: white;
        font-size: 28px;
        cursor: pointer;
      }
      .card-image img {
        cursor: pointer;
      }
    `];       
  }
  async connectedCallback() {
    super.connectedCallback();
    await this.loadData();
  }

  async loadData() {
const url = new URL("./api.json", import.meta.url).href;    const response = await fetch(url);
    const data = await response.json();
    this.images = data.images;
    this.author = data.author;
  }

  isLiked(id) {
    return localStorage.getItem(`liked-${id}`) === "true";
  }

  toggleLike(id) {
    const current = this.isLiked(id);
    localStorage.setItem(`liked-${id}`, String(!current));
    this.requestUpdate();
  }

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

share() {
  navigator.clipboard.writeText(window.location.href);
  alert("Link copied to clipboard!");
}

  goPrev() {
    if (this.activeIndex > 0) {
      this.activeIndex -= 1;
      this.updateURL(this.activeIndex);
    }
  }

  render() {
    const image = this.images[this.activeIndex];
   if (!image) return html`<p style="padding:20px">Loading...</p>`;

    return html`
      <div class="card">
        <div class="card-header">
          <img class="avatar" src="${this.author.image}" alt="author" />
          <span class="username">${this.author.channel}</span>
        </div>
       <div class="card-image">
  <img src="${image.thumbnail}" alt="${image.name}" loading="lazy"
    @click="${() => this.showModal = true}" />
</div>
</div>

${this.showModal ? html`
  <div class="modal-overlay" @click="${() => this.showModal = false}">
    <button class="modal-close" @click="${() => this.showModal = false}">✕</button>
    <img src="${image.fullSize}" alt="${image.name}" />
  </div>
` : ""}
  
    
        <div class="card-actions">
          <button class="like-btn" @click="${() => this.toggleLike(image.id)}">
            ${this.isLiked(image.id) ? "♥ liked" : "♡ like"}
          </button>
          <button class="share-btn" @click="${this.share}">Share</button>
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