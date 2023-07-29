import Header from "../support/commands/components/Header";
import Basket from "../support/commands/components/Basket";
import State from "../support/commands/pages/State";
import SearchResultPage from "../support/commands/pages/SearchResultPage";
import ComparisonPage from "../support/commands/pages/ComparisonPage";
import data from "./data";

const state = new State();
const header = new Header();
const basket = new Basket();
const searchResultPage = new SearchResultPage();
const comparisonPage = new ComparisonPage();

describe(" TC ", () => {
  beforeEach(() => {
    state.site();
  });

  it("Verify if the price filter working correctly for the following marketplaces", () => {
    header
      .clickOnCatalogBtn()
      .clickOnCategory(data.smartphonesTVAndElectronics)
      .verifyPreloaderAppearsAndDisappears()
      .clickOnSubcategory(data.mobilePhones);

    searchResultPage
      .verifyPreloaderIsNotVisible()
      .getFilter()
      .selectFilterItem(data.samsung)
      .verifyPreloaderIsNotVisible()
      .verifyProductsNamesInTable(data.samsung)
      .getFilter()
      .selectFilterItem(data.galaxyA)
      .verifyPreloaderIsNotVisible()
      .verifyProductsNamesInTable(data.galaxyA);
  });

  it("Add items to the basket", () => {
    header
      .clickOnCatalogBtn()
      .clickOnCategory(data.smartphonesTVAndElectronics)
      .verifyPreloaderAppearsAndDisappears()
      .clickOnSubcategory(data.mobilePhones);

    const firstProductName = searchResultPage
      .verifyPreloaderIsNotVisible()
      .addProductToBasket(1)
      .verifySuccessNotificationAppearsAndDisappears()
      .getProductName(1);

    const firstProductPrice = searchResultPage.getProductPrice(1);

    header
      .clickOnCatalogBtn()
      .clickOnCategory(data.laptopsAndComputers)
      .verifyPreloaderAppearsAndDisappears()
      .clickOnSubcategory(data.laptops);

    const secondProductName = searchResultPage
      .verifyPreloaderIsNotVisible()
      .addProductToBasket(1)
      .verifySuccessNotificationAppearsAndDisappears()
      .getProductName(1);

    const secondProductPrice = searchResultPage.getProductPrice(1);

    header.clickOnBasketBtn().verifyModalLockedElementDoesNotExist();
    const firstProductNameBasket = basket.getProductName(2);
    const firstProductPriceBasket = basket.getProductPrice(2);
    const secondProductNameBasket = basket.getProductName(1);
    const secondProductPriceBasket = basket.getProductPrice(1);

    firstProductNameBasket.then(basketName => {
      firstProductName.then(name => {
        expect(basketName.trim()).to.equal(name.trim());
      });
    });
    firstProductPriceBasket.then(basketPrice => {
      firstProductPrice.then(price => {
        expect(basketPrice.trim()).to.equal(price.trim());
      });
    });
    secondProductNameBasket.then(basketName => {
      secondProductName.then(name => {
        expect(basketName.trim()).to.equal(name.trim());
      });
    });
    secondProductPriceBasket.then(basketPrice => {
      secondProductPrice.then(price => {
        expect(basketPrice.trim()).to.equal(price.trim());
      });
    });
    const totalPrice = basket.getTotalPrice();
    totalPrice.then(total => {
      secondProductPriceBasket.then(secondPrice => {
        firstProductPriceBasket.then(first => {
          expect(
            parseInt(first.replace(/\s/g, "")) +
              parseInt(secondPrice.replace(/\s/g, ""))
          ).to.equal(parseInt(total.replace(/\s/g, "")));
        });
      });
    });

    basket.clickOnActionsBtn(1).verifyDeleteProductBtn();
  });

  it("Search the item", () => {
    const keyWord = "Galaxy";
    header.search(keyWord);

    searchResultPage
      .verifyPreloaderIsNotVisible()
      .verifyProductsNamesInTable(keyWord);
  });

  it("Verify that products added to the comparison", () => {
    const keyWord = "Galaxy";
    header.search(keyWord);

    const firstProductName = searchResultPage
      .verifyPreloaderIsNotVisible()
      .verifyProductsNamesInTable(keyWord)
      .addProductToComparison(1)
      .verifySuccessNotificationAppearsAndDisappears()
      .getProductName(1);

    const secondProductName = searchResultPage
      .addProductToComparison(2)
      .verifySuccessNotificationAppearsAndDisappears()
      .getProductName(2);

    header.clickOnComparisonBtn().chooseListOfComparisons();

    const firstProductNameComparison = comparisonPage.getProductName(2);
    const secondProductNameComparison = comparisonPage.getProductName(1);

    firstProductNameComparison.then(comparisonName => {
      firstProductName.then(name => {
        expect(comparisonName.trim()).to.equal(name.trim());
      });
    });

    secondProductNameComparison.then(comparisonName => {
      secondProductName.then(name => {
        expect(comparisonName.trim()).to.equal(name.trim());
      });
    });
  });
});
