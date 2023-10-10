const { expect } = require("chai");

// let kategori = 0;
// let currentPage;

class Objects {
  constructor(driver) {
    /** @type {WebdriverIO.Browser} */ this.driver = driver;
    /** @type {number}*/ this.itemCount = 0;
  }

  /**
   * Fungsi membuka halaman kategori
   *
   * @memberof ObjectKategori
   */
  async openKategori() {
    await this.driver.$("id=layoutUtama_cvKategori").click();

    await this.driver
      .$("id=lvkategori")
      .isExisting()
      .then((res) => {
        expect(res).to.equal(true);
      })
      .catch((e) => {
        throw new Error(e);
      });
  }

  /**
   * Fungsi menekan tombol add item pada halaman kategori
   *
   * @memberof ObjectKategori
   */
  async clickAddButtonKategori() {
    await this.driver.$("id=fabKategoriTambah").click();

    await this.driver
      .$("id=tvTambahKategoriJudul")
      .isExisting()
      .then((res) => {
        expect(res).to.equal(true);
      })
      .catch((e) => {
        throw new Error(e);
      });
  }

  /**
   * Fungsi input data item di list kategori
   *
   * @param {string} [value="404 Value"]
   * @memberof ObjectKategori
   */
  async inputKategori(value = "404 Value") {
    await this.driver.$("id=tietNamaKategori").setValue(value);
    await this.driver.$("id=btTambahKategoriSimpan").click();
    this.itemCount++;
    await this.driver
      .$(`//android.widget.ListView/android.widget.TextView[${this.itemCount}]`)
      .isExisting()
      .then((res) => {
        expect(res).to.equal(true);
      })
      .catch((e) => {
        throw new Error(e);
      });
  }

  /**
   * Fungsi edit data item dari list kategori
   *
   * @param {Number} index
   * @param {String} data Data yang ingin di input
   * @memberof ObjectKategori
   */
  async editKategori(index, data) {
    if (index > this.itemCount || index < 0) {
      throw new Error("Item tidak ada di list");
    }
    await this.driver
      .$(`//android.widget.ListView/android.widget.TextView[${index}]`)
      .click();

    await this.driver.$(`id=btDetailKategoriEdit`).click();

    await this.driver
      .$("id=tvDetailKategoriJudul")
      .getText()
      .then((res) => {
        expect(res).to.equal("Edit Data Kategori");
      })
      .catch((e) => {
        throw new Error(e);
      });

    await this.driver.$("id=tietEditNamaKategori").setValue(data);

    await this.driver.$(`id=btDetailKategoriEdit`).click();

    await this.driver
      .$(`//android.widget.ListView/android.widget.TextView[${index}]`)
      .getText()
      .then((res) => {
        expect(res).to.equal(data);
      })
      .catch((e) => {
        throw new Error(e);
      });
  }

  /**
   * Fungsi hapus item dari list kategori
   *
   * @param {number} index
   * @memberof ObjectKategori
   */
  async deleteKategori(index) {
    if (index > this.itemCount || index < 0) {
      throw new Error("Item tidak ada di list");
    }
    await this.driver
      .$(`//android.widget.ListView/android.widget.TextView[${index}]`)
      .click();

    await this.driver.$(`id=btDetailKategoriHapus`).click();

    await this.driver
      .waitUntil(async () => {
        return (
          (await this.driver.$("id=alertTitle").getText()) === "Hapus Kategori"
        );
      })
      .then(async () => {
        await this.driver
          .$("//android.widget.LinearLayout/android.widget.Button[2]")
          .click();
      })
      .catch((e) => {
        throw new Error(e);
      });

    this.openKategori();

    await this.driver
      .$(`//android.widget.ListView/android.widget.TextView[${index}]`)
      .isExisting()
      .then((res) => {
        expect(res).to.equal(false);
      })
      .catch((e) => {
        throw new Error(e);
      });
  }
}

module.exports = Objects;
