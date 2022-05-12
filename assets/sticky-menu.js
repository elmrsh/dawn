class StickyProductOptions extends HTMLElement {
  constructor() {
    super();
    this.modalClass = 'confirm'
    this.BP = parseInt(this.dataset.bp||768)
    this.initUI()
  }
  initUI() {
    this.sendBtn = this.querySelector('#submit')
    this.incrementBtn = this.querySelector('#increment')
    this.decrementBtn = this.querySelector('#decrement')
    this.quantityField = this.querySelector('#quantity')
    this.quantityContainer = this.querySelector('#quantity-container')
    this.sendBtnOrg = document.querySelector('.product-form__submit')
    this.quantityFieldOrg = document.querySelector('quantity-input')
    this.quantityFieldInputOrg = this.quantityFieldOrg.querySelector('input')

    const send = () => {
      if(innerWidth <= this.BP) return this.mobileUI()
      this.desktopUI()
    }
    this.addEventListener('click', (e) => {
      const target = e.target
      if(target.tagName === 'BUTTON') e.preventDefault()
      if(target===this) return this.classList.remove(this.modalClass)
      else if(target === this.sendBtn) return send()
      else if(target === this.incrementBtn) return this.increment()
      else if(target === this.decrementBtn) return this.decrement()
    })
    if(this.quantityField) this.quantityField.addEventListener('change', e => {
      const value = parseInt(this.quantityField.value)
      const max = parseInt(this.quantityField.max)
      if(value >= max)
        return this.quantityField.value = this.quantityField.max
      if(value <= 1) this.quantityField.value = 1
    })

    if(this.quantityFieldOrg) {

      const changeValue = () => {
        setTimeout(() => {
          this.quantityField.value = this.quantityFieldOrg.querySelector('.quantity__input').value
        }, 500)
      }

      this.quantityFieldOrg.addEventListener('click', changeValue)
      this.quantityFieldInputOrg.addEventListener('change', changeValue)
      this.quantityField.addEventListener('change',() => {
        this.quantityFieldOrg.querySelector('.quantity__input').value = this.quantityField.value
      })
    }
    else this.quantityContainer.remove()

    // IntersectionHandler.addListener(
    //   this.sendBtnOrg,
    //   () => this.classList.remove('spo-show',this.modalClass),
    //   () => this.classList.add('spo-show')
    // )
  }

  increment() {
    // if(this.quantityFieldInputOrg.max <= this.quantityField.value ) return 
    this.quantityField.value = parseInt(this.quantityField.value) + 1
    this.quantityField.dispatchEvent(new Event("change"))
  }

  decrement() {
    if(this.quantityField.value <= 1) return false
    this.quantityField.value = parseInt(this.quantityField.value) - 1
    this.quantityField.dispatchEvent(new Event("change"))
  }
  mobileUI() {
    // if(!this.classList.contains(this.modalClass)) return this.classList.add(this.modalClass)
    this.sendForm()
  }
  desktopUI() {
    this.sendForm()
  }
  sendForm() {
    this.classList.remove(this.modalClass)
    this.sendBtnOrg.click()
  }
}
customElements.define('sticky-product-options',StickyProductOptions)