import { CartsFacade } from './../../cart/+state/carts.facade';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductListComponent } from './product-list.component';
import { ProductsFacade } from '../+state/products.facade';
import { of } from 'rxjs';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('ProductListComponent', () => {
  let component: ProductListComponent; //component instance
  let fixture: ComponentFixture<ProductListComponent>; //test environment around ProductListComponent

  //mock versions of services
  const mockProductsFacade = {
    allProducts$: of([
      { id: 1, title: 'Test Product', thumbnail: 'path/to/img', price: 100 },
    ]),
    categories$: of(['Electronics', 'Clothing']),
    query$: of(''),
    selectedCategory$: of(null),
    doSearch: jest.fn(),
    selectProduct: jest.fn(),
    selectCategory: jest.fn(),
    loadProducts: jest.fn(),
    loadCategories: jest.fn(),
  };

  const mockCartFacade = {
    cartCount$: of(1),
    addProductToCart: jest.fn(),
  };

  const activatedRouteMock = {
    snapshot: {
      paramMap: {
        get: jest.fn(() => 'some value'),
      },
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterModule],
      declarations: [ProductListComponent],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock },

        { provide: ProductsFacade, useValue: mockProductsFacade },
        { provide: CartsFacade, useValue: mockCartFacade },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call loadProducts and loadCategories on initialization', () => {
    component.ngOnInit();
    expect(mockProductsFacade.loadProducts).toHaveBeenCalled();
    expect(mockProductsFacade.loadCategories).toHaveBeenCalled();
  });
  it('should display products', () => {
    const compiled = fixture.nativeElement; //store the root DOM element of ProductListComponent in the "compiled"
    const productTitle = compiled.querySelector('.card-title'); //grab the product's title element
    expect(productTitle.textContent).toContain('Test Product'); //validate its content
  });

  it('should display categories in dropdown', () => {
    const compiled = fixture.nativeElement;
    const categoryDropdownOptions = compiled.querySelectorAll('select option');
    expect(categoryDropdownOptions[1].textContent).toContain('Electronics'); //verify the content of each dropdown option
    expect(categoryDropdownOptions[2].textContent).toContain('Clothing');
  });

  it('should call addToCart when "Add to Cart" button is clicked', () => {
    const compiled = fixture.nativeElement;
    const addToCartButton = compiled.querySelector('.btn');
    addToCartButton.click();
    expect(mockCartFacade.addProductToCart).toHaveBeenCalled();
  });
  it('should display cart count', () => {
    const compiled = fixture.nativeElement;
    const cartCountSpan = compiled.querySelector('.cart-count');
    expect(cartCountSpan.textContent).toBe('1');
  });
});
