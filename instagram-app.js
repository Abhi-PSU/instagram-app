import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

export class InstagramApp extends DDDSuper(LitElement) {
// IST 256 Project 1 
  static get tag() {
    return "instagram-app";
  }

  constructor() {
    super();
    this.imageUrl = "";
    this.imageLink = "";
    this.liked = false;
  }

  static get properties() {
    return {
      ...super.properties,
      imageUrl: { type: String },
      imageLink: { type: String },
      liked: { type: Boolean },
    };
  }

  static get styles() {
    return [super.styles, css`
      :host {
        display: block;
        font-family: var(--ddd-font-navigation);
      }
      .card {
        max-width: 400px;
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
        background: linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888);
      }
      .username {
        font-weight: bold;
        font-size: 14px;
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
      button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  padding: 4px 10px;
  color: #262626;
  border: 1px solid #dbdbdb;
  border-radius: 4px;
}
      .caption {
        padding: 0 12px 12px;
        font-size: 14px;
      }
      a {
        color: #00376b;
        font-size: 12px;
        padding: 0 12px 12px;
        display: block;
      }
    `];
  }

  async connectedCallback() {
    super.connectedCallback();
    await this.loadFox();
  }
// gets a random fox image from the API and updates the component state with the image URL and link.
  async loadFox() {
    const response = await fetch("https://randomfox.ca/floof/");
    const data = await response.json();
    this.imageUrl = data.image;
    this.imageLink = data.link;
  }
// toggles the liked state when the like button is clicked, couldnt figure out how to add emojis to the button so it just changes the text for now.
  toggleLike() {
    this.liked = !this.liked;
  }

  render() {
    return html`
      <div class="card">
        <div class="card-header">
          <div class="avatar"></div>
          <span class="username">fox_gallery</span>
        </div>
        <div class="card-image">
          ${this.imageUrl
            ? html`<img src="${this.imageUrl}" alt="A random fox" />`
            : html`<p style="padding:20px">Loading fox...</p>`}
        </div>
        <div class="card-actions">
          <button @click="${this.toggleLike}">
            ${this.liked ? " liked" : " like"}
          </button>
        </div>
        <div class="caption">Fox of the day</div>
        ${this.imageLink
          ? html`<a href="${this.imageLink}" target="_blank">View source</a>`
          : ""}
      </div>
    `;
  }
}

customElements.define(InstagramApp.tag, InstagramApp);