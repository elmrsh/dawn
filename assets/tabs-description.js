const TEXT_NODE = 3

class TabsNavigator extends HTMLElement {
  constructor() {
    super();
    this.onlyTags = false
    this.acceptedTags = ['IFRAME', 'IMG']
    const BP = this.getAttribute("data-bp")
      ? parseInt(this.getAttribute("data-bp"))
      : 640;
    this.desktop = this.getAttribute("data-desktop") || "acordeon";
    this.mobile = this.getAttribute("data-mobile") || "acordeon";
    this.container = document.createElement("div");
    
    this.container.classList.add("tabs-navigator");
    this.container.innerHTML = `
    <nav class="tabs-navigator--nav">
      <ul class="tabs-navigator__menu"></ul>
    </nav>
    <div class="tabs-navigator--sections">
    </div>`;
    this.tabsNavigator = this.container.querySelector(".tabs-navigator__menu");
    this.sectionsContainer = this.container.querySelector(
      ".tabs-navigator--sections"
    );

    const displayTab = (e) => {
      e.preventDefault();
      const link = e.target;
      const section = this.querySelector(`${link.getAttribute("href")}`);
      if (!section) return false;

      if (this.sectionActive) this.sectionActive.classList.remove("active");
      if (this.tabActive) this.tabActive.classList.remove("active");

      if (e.type === "click" || link !== this.tabActive) {
        link.classList.add("active");
        if (section) section.classList.add("active");
        this.sectionActive = section;
        this.tabActive = link;
        return false;
      }
      this.sectionActive = undefined;
      this.tabActive = undefined;
    };
    this.tabsNavigator.addEventListener("click", displayTab);
    this.tabsNavigator.addEventListener("dblclick", displayTab);

    this.parse();

    const setDesign = () => {
      if (this.desktop === this.mobile) return false;
      if (window.innerWidth > BP) {
        console.log("Seteamos desktop");
        this.classList.add(this.desktop);
        this.classList.remove(this.mobile);
        console.log(this);
        return false;
      }
      console.log("Seteamos mobile");
      this.classList.remove(this.desktop);
      this.classList.add(this.mobile);
    };
    setDesign();
    if (this.desktop != this.mobile) {
      window.addEventListener("resize", setDesign);
    }

    console.log("tabs")
  }
  parse() {
    if(this.onlyTabs) {
   		const heading = document.createElement('h5')
    	heading.textContent = 'Descripción'
    	this.insertAdjacentElement('afterbegin',heading)
    }

    let tabs = false;
    this.tabs = [];
    this.sections = [];

    [...this.childNodes].forEach((item, index) => {
      const isText = item.nodeType === this.TEXT_NODE
      if(isText) {
        const val = item.textContent.trim()
        item.remove()
        item = document.createElement('p')
        item.textContent = val
      }
      if (item.tagName === "H5") {
        if (!tabs) {
          tabs = true;
          this.replaceChild(this.container, item);
        } else item.remove();

        this.tabs.push(item.textContent);
        this.sections.push([]);
        return false;
      }
      else if (!this.onlyTags && item.tagName.startsWith("H") && tabs) return (tabs = false);
      if (tabs) this.sections[this.sections.length - 1].push(item);
    });

    this.tabs.forEach((tab, i) => {
      this.tabsNavigator.innerHTML += `<li><a href="#section-${i}">${tab}</a></li>`;
      const container = document.createElement("div");
      container.id = `section-${i}`;
      container.classList.add("tabs-navigator__section");

      const acordeonHandler = document.createElement("div");
      acordeonHandler.innerHTML = tab;
      acordeonHandler.classList.add("acordeon-handler");

      acordeonHandler.addEventListener("click", (e) => {
        const a = this.tabsNavigator.querySelector(`[href="#section-${i}"]`);
        a.dispatchEvent(new Event("dblclick", { bubbles: true }));
      });

      container.append(acordeonHandler, ...this.sections[i]);
      this.sectionsContainer.append(container);
    });
    if(this.tabs.length <= 1) return
    const first = this.tabsNavigator.querySelector("a");
//     if (first) first.click();

  }
}

window.customElements.define("tabs-description", TabsNavigator);
