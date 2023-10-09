const page = require("./page");
const { WebDriver, until, By } = require("selenium-webdriver");

/** List data-id products */
const Products = {
  // Tinggal isi id post yang lain
  packaging: {
    id: "417ed0f",
    posts: [4306, 4294, 4302, 1703, 4735, 4287, 5685],
    title: "Packaging",
  },
  shirt: {
    id: "d2bb1ec",
    posts: [
      4738, 4766, 4788, 4834, 4879, 4911, 5730, 5711, 5702, 5691, 4952, 1741,
      4661, 4649, 4965,
    ],
    title: "T - Shirt",
  },
  jacket: { id: "84074d1", posts: [4781] },
  caps: { id: "2c304d8", posts: [1765] },
  backpack: { id: "0c126de", posts: [5010] },
  sling: { id: "fa201d7", posts: [5026] },
  gym: { id: "c5601b5", posts: [5015] },
  tote: { id: "291e2a4", posts: [4642] },
  bottles: { id: "29f119b", posts: [1781] },
  mugs: { id: "9ce1177", posts: [3919] },
  notebooks: { id: "8199014", posts: [1810] },
  pencils: { id: "996d39a", posts: [4130] },
  tech: { id: "bb02857", posts: [4157] },
  gourmet: { id: "938da13", posts: [4495] },
  bonus: { id: "bda298b", posts: [3710] },
};

class allProductsPage extends page {
  constructor(driver) {
    super(driver);
  }

  async openPage() {
    await this.openUrl("/products");
  }

  async back() {
    await this.driver.navigate().back();
  }

  async selectProduct(product) {
    // Note: ada nama product yg tidak sama dengan title. Contoh Caps & Masks => Caps and Masks.
    this.product = product;
    const Id = Products[this.product].id;

    //select button by xpath
    const el = await this.driver.wait(
      until.elementLocated(
        By.xpath(
          `//div[@data-id="${Id}"]//div[@class="elementor-button-wrapper"]//a`
        )
      )
    );
    const productName = el.getText();
    el.click();
    return productName;
  }

  async selectPost(postNumber = 0) {
    const post = Products[this.product].posts[postNumber];
    const parent = `//ul[contains(@class,'products')]/li[contains(@class,'post-${post}')]`;

    const el = await this.driver.wait(
      until.elementLocated(By.xpath(`${parent}//h2`))
    );
    const title = el.getText();

    el.click();
    return title;
  }

  async addToCart(type) {}
}

module.exports = allProductsPage;
