class HaciendolaMegaMenu extends HTMLElement {
  constructor() {
    super();
    const menuItems = [...document.querySelectorAll(".header .header__inline-menu li")]
    this.linkTitle = this.dataset.trigger.toLowerCase().trim()
    this.trigger = menuItems.find(item => {
      const search = item.textContent.toLowerCase().trim()
      return search === this.linkTitle
    })
    this.parent = this.trigger.closest(".header-wrapper")


    const background = window.getComputedStyle(this).background
    const color = window.getComputedStyle(this).color
    this.insertAdjacentHTML('beforeend',`<style>.bg-${this.linkTitle} {
      background: ${background} !important;
      --color-foreground: ${color.replace('rgb(','').replace(')','')} !important;
    }</style>`)
    
    if(this.trigger) {
      this.parent.appendChild(this)
      if(this.classList.contains("h-megamenu--centered")) {
        this.style.width = `${this.parent.offsetWidth}px`
      }
      
      this.trigger.addEventListener('click', e => {
        e.preventDefault()
      })

      this.trigger.addEventListener('mouseleave',(e) => this.hide(e))
      this.trigger.addEventListener('mouseenter',() => this.show())

      this.addEventListener('mouseenter',() => this.show())
      this.addEventListener('mouseleave',(e) => this.hide(e), false)
    }
  }

  show() {
    const top = this.trigger.offsetTop + (this.trigger.offsetHeight) - 10;
    this.style.setProperty("--top-position", `${top}px`)
    this.style.display = "grid"
    this.parent.classList.add(`bg-${this.linkTitle}`)
  }
  hide(e) {
    if(e.target === this || e.target === this.trigger) this.style.display = 'none'
    this.parent.classList.remove(`bg-${this.linkTitle}`)
  }
}

customElements.define("h-megamenu", HaciendolaMegaMenu)