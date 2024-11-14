import logo79thn from '../../logo79thn.jpg';

class ImageFigure extends HTMLElement {
  constructor() {
    super();

    this.render();
  }
  render() {
    this.innerHTML = `
    <figure>
    <img src= ${logo79thn}>
    <figcaption>HUT RI ke-79, Nusantara Baru Indonesia Maju</figcaption>
    </figure>
`;
  }
}

customElements.define('image-figure', ImageFigure);
