class MegaMenu extends HTMLElement {
  constructor() {
    super();
    this.targetLink = [...document.querySelectorAll("summary.header__menu-item")].find(
      (x) => {
        const link = x.textContent.trim().toLowerCase()
        const compare = this.dataset.targetLinkTitle.trim().toLowerCase()
        return link === compare
      }
    );
    if(this.targetLink) this.activeOnHover()

    switch (this.dataset.megaMenuType) {
      case "collection_two_level":
        this.initTwoLevelMegaMenu();
        break;
    }

    // setTimeout(() => this.open(), 500);
  }

  open = () => {
    this.calcTop()
    this.megaMenuContent.classList.add("active");
  };

  close = () => {
    this.megaMenuContent.classList.remove("active");
  };

  initTwoLevelMegaMenu = () => {
    const twoLevelMenuFirstLevelLinks = [
      ...this.megaMenuContent.querySelectorAll(
        ".two-level-menu__first-level-link"
      ),
    ];
    twoLevelMenuFirstLevelLinks.forEach((link) =>
      link.addEventListener("mouseenter", this.handleTwoLevelMegaMenuLinkHover)
    );
  };

  handleTwoLevelMegaMenuLinkHover = (event) => {
    const aux = [
      ...this.megaMenuContent.querySelectorAll(".second-level__links"),
    ];
    aux.forEach((div) => div.classList.remove("active"));
    this.megaMenuContent
      .querySelector(
        `#second-level__menu-${event.target.dataset.twoLevelMenuIndex}`
      )
      .classList.add("active");
    console.log();
  };

  calcTop = () => {
    const itemTop = this.targetLink.getBoundingClientRect().top + this.targetLink.offsetHeight
    this.header.style.setProperty('--header-top', `${itemTop}px`)
  }
  activeOnHover = () => {
    try {
      this.megaMenuContent = this.querySelector(".mega-menu__content");
      this.menuItem = this.targetLink.parentElement
      if(this.menuItem && this.megaMenuContent) this.menuItem.appendChild(this.megaMenuContent);
    } catch(err) {
      alert('Error: '+err.message)
    }



    const touchable = ('ontouchstart' in window)
    if(touchable) this.menuItem.addEventListener("click", this.toggle)
    else this.targetLink.parentNode.addEventListener("mouseenter", this.toggle, false);

    this.header = this.targetLink.closest('.header')
    this.calcTop()
  }
  toggle = (e) => {
    const opened = this.targetLink.parentNode.getAttribute('open') !== null
    const type = e.type
    if((type == 'click' && !opened) || (!type != 'click' && opened)) this.open()
    else this.close()
  }
}

customElements.define("mega-menu", MegaMenu);