class Footer extends HTMLElement {
  constructor() {
    super();

    this.render();
  }
  render() {
    this.innerHTML = `
<footer>
    <h3>Created By
        <a>TommyScientists</a>
    </h3>
</footer>
    
`;
  }
}

customElements.define('main-footer', Footer);
