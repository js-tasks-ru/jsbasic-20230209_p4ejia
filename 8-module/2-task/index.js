import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filteredProducts = products;
    this.elem = this.makeHTML();
    this.filters = {};
  }

  makeHTML() {
    const grid = createElement('<div class="products-grid"></div>');
    const gridInner = createElement('<div class="products-grid__inner"></div>');

    grid.append(gridInner);

    this.products.forEach(product => {
      const card = new ProductCard(product);
      gridInner.append(card.elem);
    });

    return grid;
  }

  updateFilter(filters) {
    this.filters = { ...this.filters, ...filters };
    const { noNuts = false, vegeterianOnly = false, maxSpiciness = 4, category = null } = this.filters;
    const gridInnerFilters = this.elem.querySelector('.products-grid__inner');
    gridInnerFilters.innerHTML = '';
  
    this.products
      .filter(product => {
        if (noNuts && product.nuts) return false;
        if (vegeterianOnly && !product.vegeterian) return false;
        if (maxSpiciness < 4 && product.spiciness > maxSpiciness) return false;
        if (category && product.category !== category) return false;
        return true;
      })
      .forEach(product => {
        const card = new ProductCard(product);
        gridInnerFilters.append(card.elem);
      });
  }
}
