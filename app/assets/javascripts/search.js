/*
* https://github.com/daviddarnes/jekyll-search-js
*/

class jekyllSearch {
  constructor(dataSource, searchField, resultsList, siteURL) {
    this.dataSource = dataSource
    this.searchField = document.querySelector(searchField)
    this.resultsList = document.querySelector(resultsList)
    this.siteURL = siteURL

    this.displayResults = this.displayResults.bind(this)
  }

  fetchedData() {
    return fetch(this.dataSource)
      .then(blob => blob.json())
  }

  async findResults() {
    const data = await this.fetchedData()
    return data.filter(item => {
      const regex = new RegExp(this.searchField.value, 'gi')
      const title = item.title?.toString() || ''
      return (title && title.match(regex)) || item.content.match(regex)
    })
  }

  async displayResults() {
    const results = await this.findResults()
    const html = results.map(item => {
      return `
        <article class="flex flex-col gap-8 relative">
          <header class="aspect-square w-full bg-gray relative">
            ${item.image && item.image !== null && item.image !== '' ? (
              `<img src="${item.image}" class="w-full h-full object-cover absolute inset-0" alt="${item.title}" />`
            ) : ''}
          </header>
          <h2 class="text-18 leading-115 font-medium" itemprop="headline">
            <a href="${item.url}" class="card-link">${item.title}</a>
          </h2>
          <time class="text-18 leading-00" datetime="${item.date}">${item.date}</time>
        </article>`
      }).join('')
    if(this.searchField.value === '') {
      this.resultsList.innerHTML = ''
    } else if (this.searchField.value !== '' && results.length == 0) {
      this.resultsList.innerHTML = `<p class="body-text no-results col-span-2 md:col-span-4">0 results for "${this.searchField.value}"</p>`
    } else {
      this.resultsList.innerHTML = html
    }
  }

  init() {
    const url = new URL(document.location)
    if (url.searchParams.get("search")) {
      this.searchField.value = url.searchParams.get("search")
      this.displayResults()
    }
    this.searchField.addEventListener('keyup', () => {
      this.displayResults()
      if (this.searchField.value && this.searchField.value !== '') {
        url.searchParams.set("search", this.searchField.value)
        window.history.pushState('', '', url.href)
      } else {
        url.searchParams.delete("search")
        window.history.pushState('', '', url.href)
      }
    })
    this.searchField.addEventListener('keypress', event => {
      if (event.keyCode == 13) {
        event.preventDefault()
      }
    })
  }
}


const search = new jekyllSearch(
  '/search.json',
  '#search', // The selector of your search input field
  '#list', // The selector of your search results wrapper
);

search.init();
