class Header extends HTMLElement {
  constructor() {
    super();

    this.render();
  }
  render() {
    this.innerHTML = `
      
<header class="head_bar">
        <h1 class="head_bar_title"> Note Apps</h1>
        <p
        class="head_bar_desc">
    welcome, senang bertemu dengan anda
ada yang bisa kami bantu ? ayo mencatat</p>

</header>
    
`;
  }
}

customElements.define('main-header', Header);
