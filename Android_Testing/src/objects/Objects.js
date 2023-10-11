const chai = require("chai");
const { chaiImage } = require("chai-image");
const { existsSync, writeFileSync, readFileSync } = require("fs");
chai.use(chaiImage);
class ObjectsKategori {
  constructor(driver) {
    /** @type {WebdriverIO.Browser} */ this.driver = driver;
    /** @type {number}*/ this.itemCount = 0;
  }

  async returnHome() {
    let stat = false;
    while (stat === false) {
      const check = await this.driver
        .$("id=utama_tvJudul")
        .getText()
        .catch((e) => {
          throw new Error(e);
        });
      if (check === "Project CRUD") {
        stat == true;
        break;
      }
      await this.driver.back();
    }
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
        chai.expect(res).to.equal(true);
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
        chai.expect(res).to.equal(true);
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
  async inputKategori(value = "404 Value", check = true) {
    await this.driver.$("id=tietNamaKategori").setValue(value);
    await this.driver.$("id=btTambahKategoriSimpan").click();
    if (check) {
      this.itemCount++;
      await this.driver
        .$(
          `//android.widget.ListView/android.widget.TextView[${this.itemCount}]`
        )
        .isExisting()
        .then((res) => {
          chai.expect(res).to.equal(true);
        })
        .catch((e) => {
          throw new Error(e);
        });
    }
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
        chai.expect(res).to.equal("Edit Data Kategori");
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
        chai.expect(res).to.equal(data);
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

    // Baru cek ketika index paling bawah, jika semisal ada 2 item dalam list dan item 1 dihapus maka index item 2 jadi index item 1, belum ada skenario terkait. Solusi yg mungkin dilakukana dalah bukan menggunakan .isExisting tapi menggunakan getText atau semacamnya
    await this.driver
      .$(`//android.widget.ListView/android.widget.TextView[${index}]`)
      .isExisting()
      .then((res) => {
        chai.expect(res).to.equal(false);
      })
      .catch((e) => {
        throw new Error(e);
      });
    this.returnHome();
  }
}

class ObjectsWilayah {
  constructor(driver) {
    /** @type {WebdriverIO.Browser} */ this.driver = driver;
    /** @type {number}*/ this.itemCount = 0;
  }

  async returnHome() {
    let stat = false;
    while (stat === false) {
      await this.driver.back();
      const check = await this.driver
        .$("id=utama_tvJudul")
        .getText()
        .catch((e) => {
          throw new Error(e);
        });
      if (check === "Project CRUD") {
        stat == true;
      }
    }
  }

  /**
   * Fungsi membuka halaman wilayah
   *
   * @memberof ObjectsWilayah
   */
  async openWilayah() {
    await this.driver.$("id=layoutUtama_cvWilayah").click();

    await this.driver
      .$("id=lvwilayah")
      .isExisting()
      .then((res) => {
        chai.expect(res).to.equal(true);
      })
      .catch((e) => {
        throw new Error(e);
      });
  }

  /**
   * Fungsi menekan tombol add item pada halaman wilayah
   *
   * @memberof ObjectsWilayah
   */
  async clickAddButtonWilayah() {
    await this.driver.$("id=fabWilayahTambah").click();

    await this.driver
      .$("id=tvTambahWilayahJudul")
      .isExisting()
      .then((res) => {
        chai.expect(res).to.equal(true);
      })
      .catch((e) => {
        throw new Error(e);
      });
  }

  /**
   * Fungsi input data item di list wilayah
   *
   * @param {string} [value="404 Value"]
   * @memberof ObjectsWilayah
   */
  async inputWilayah(value = "404 Value") {
    await this.driver.$("id=tietNamaWilayah").setValue(value);
    await this.driver.$("id=btTambahWilayahSimpan").click();
    this.itemCount++;
    await this.driver
      .$(`//android.widget.ListView/android.widget.TextView[${this.itemCount}]`)
      .isExisting()
      .then((res) => {
        chai.expect(res).to.equal(true);
      })
      .catch((e) => {
        throw new Error(e);
      });
  }

  /**
   * Fungsi edit data item dari list wilayah
   *
   * @param {Number} index
   * @param {String} data Data yang ingin di input
   * @memberof ObjectsWilayah
   */
  async editWilayah(index, data) {
    if (index > this.itemCount || index < 0) {
      throw new Error("Item tidak ada di list");
    }
    await this.driver
      .$(`//android.widget.ListView/android.widget.TextView[${index}]`)
      .click();

    await this.driver.$(`id=btDetailWilayahEdit`).click();

    await this.driver
      .$("id=tvDetailWilayahJudul")
      .getText()
      .then((res) => {
        chai.expect(res).to.equal("Edit Data Wilayah");
      })
      .catch((e) => {
        throw new Error(e);
      });

    await this.driver.$("id=tietEditNamaWilayah").setValue(data);

    await this.driver.$(`id=btDetailWilayahEdit`).click();

    await this.driver
      .$(`//android.widget.ListView/android.widget.TextView[${index}]`)
      .getText()
      .then((res) => {
        chai.expect(res).to.equal(data);
      })
      .catch((e) => {
        throw new Error(e);
      });
  }

  /**
   * Fungsi hapus item dari list wilayah
   *
   * @param {number} index
   * @memberof ObjectsWilayah
   */
  async deleteWilayah(index) {
    if (index > this.itemCount || index < 0) {
      throw new Error("Item tidak ada di list");
    }
    await this.driver
      .$(`//android.widget.ListView/android.widget.TextView[${index}]`)
      .click();

    await this.driver.$(`id=btDetailWilayahHapus`).click();

    await this.driver
      .waitUntil(async () => {
        return (
          (await this.driver.$("id=alertTitle").getText()) === "Hapus Wilayah"
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

    this.openWilayah();

    // Baru cek ketika hapus index paling bawah, jika semisal ada 2 item dalam list dan item 1 dihapus maka index item 2 jadi index item 1, belum ada skenario terkait. Solusi yg mungkin dilakukana dalah bukan menggunakan .isExisting tapi menggunakan getText atau semacamnya
    await this.driver
      .$(`//android.widget.ListView/android.widget.TextView[${index}]`)
      .isExisting()
      .then((res) => {
        chai.expect(res).to.equal(false);
      })
      .catch((e) => {
        throw new Error(e);
      });

    this.returnHome();
  }
}

class ObjectsWisata {
  constructor(driver) {
    /** @type {WebdriverIO.Browser} */ this.driver = driver;
    /** @type {number}*/ this.itemCount = 0;
  }

  async returnHome() {
    let stat = false;
    while (stat === false) {
      const check = await this.driver
        .$("id=utama_tvJudul")
        .getText()
        .catch((e) => {
          throw new Error(e);
        });
      if (check === "Project CRUD") {
        stat == true;
        break;
      }
      await this.driver.back();
    }
  }

  /**
   * Fungsi membuka halaman wisata
   *
   * @memberof ObjectsWisata
   */
  async openWisata() {
    await this.driver.$("id=layoutUtama_cvWisata").click();

    await this.driver
      .$("id=lvWisata")
      .isExisting()
      .then((res) => {
        chai.expect(res).to.equal(true);
      })
      .catch((e) => {
        throw new Error(e);
      });
  }

  /**
   * Fungsi menekan tombol add item pada halaman wisata
   *
   * @memberof ObjectsWisata
   */
  async clickAddButtonWisata() {
    await this.driver.$("id=fabWisataTambah").click();

    await this.driver
      .$("id=tvTambahWisataJudul")
      .isExisting()
      .then((res) => {
        chai.expect(res).to.equal(true);
      })
      .catch((e) => {
        throw new Error(e);
      });
  }

  /**
   * Funsi input data item dari list wisata
   *
   * @param {string} [name="404 Name"]
   * @param {number} [indexWilayah=1]
   * @param {number} [indexKategori=1]
   * @memberof ObjectsWisata
   */
  async inputWisata(name = "404 Name", indexWilayah = 1, indexKategori = 1) {
    const wilayah = `//android.widget.ListView/android.widget.CheckedTextView[${indexWilayah}]`;
    const kategori = `//android.widget.ListView/android.widget.CheckedTextView[${indexKategori}]`;
    await this.driver.$("id=tietNamaWisata").setValue(name);

    await this.driver.$("id=spWilayahWisata").click();
    await this.driver
      .$(wilayah)
      .click()
      .catch((e) => {
        throw new Error(e);
      });

    await this.driver.$("id=spKategoriWisata").click();
    await this.driver
      .$(kategori)
      .click()
      .catch((e) => {
        throw new Error(e);
      });

    await this.driver.$("id=btTambahWisataSimpan").click();
    this.itemCount++;
    await this.driver
      .$(`//android.widget.ListView/android.widget.TextView[${this.itemCount}]`)
      .isExisting()
      .then((res) => {
        chai.expect(res).to.equal(true);
      })
      .catch((e) => {
        throw new Error(e);
      });
  }

  /**
   * Fungsi edit data item dari list wisata
   *
   * @param {Number} index
   * @param {String} newName Nama yang ingin di input
   * @param {String} newIndexWilayah Index Wilayah yang ingin di input
   * @param {String} newIndexKategori Index Kategori yang ingin di input
   * @memberof ObjectsWisata
   */
  async editWisata(index, newName, newIndexWilayah = 1, newIndexKategori = 1) {
    const wilayah = `//android.widget.ListView/android.widget.CheckedTextView[${newIndexWilayah}]`;
    const kategori = `//android.widget.ListView/android.widget.CheckedTextView[${newIndexKategori}]`;
    if (index > this.itemCount || index < 0) {
      throw new Error("Item tidak ada di list");
    }
    await this.driver
      .$(`//android.widget.ListView/android.widget.TextView[${index}]`)
      .click();

    await this.driver.$(`id=btDetailWisataEdit`).click();

    await this.driver
      .$("id=tvDetailWisataJudul")
      .getText()
      .then((res) => {
        chai.expect(res).to.equal("Edit Data Wisata");
      })
      .catch((e) => {
        throw new Error(e);
      });

    await this.driver.$("id=tietEditNamaWisata").setValue(newName);

    await this.driver.$("id=spEditWilayahWisata").click();
    await this.driver
      .$(wilayah)
      .click()
      .catch((e) => {
        throw new Error(e);
      });

    await this.driver.$("id=spEditKategoriWisata").click();
    await this.driver
      .$(kategori)
      .click()
      .catch((e) => {
        throw new Error(e);
      });

    await this.driver.$(`id=btDetailWisataEdit`).click();
    await this.driver
      .$(`//android.widget.ListView/android.widget.TextView[${index}]`)
      .getText()
      .then((res) => {
        chai.expect(res).to.equal(newName);
      })
      .catch((e) => {
        throw new Error(e);
      });
  }

  /**
   * Fungsi hapus item dari list Wisata
   *
   * @param {number} index
   * @memberof ObjectsWisata
   */
  async deleteWisata(index) {
    if (index > this.itemCount || index < 0) {
      throw new Error("Item tidak ada di list");
    }
    await this.driver
      .$(`//android.widget.ListView/android.widget.TextView[${index}]`)
      .click();

    await this.driver.$(`id=btDetailWisataHapus`).click();

    await this.driver
      .waitUntil(async () => {
        return (
          (await this.driver.$("id=alertTitle").getText()) === "Hapus Wisata"
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

    // this.openWilayah();

    // Baru cek ketika hapus index paling bawah, jika semisal ada 2 item dalam list dan item 1 dihapus maka index item 2 jadi index item 1, belum ada skenario terkait. Solusi yg mungkin dilakukana dalah bukan menggunakan .isExisting tapi menggunakan getText atau semacamnya
    await this.driver
      .$(`//android.widget.ListView/android.widget.TextView[${index}]`)
      .isExisting()
      .then((res) => {
        chai.expect(res).to.equal(false);
      })
      .catch((e) => {
        throw new Error(e);
      });

    this.returnHome();
  }
}

class ObjectsVisual {
  /**
   *  Creates an instance of ObjectsVisual.
   * @param {WebdriverIO.Browser} driver
   * @memberof ObjectsVisual
   */
  constructor(driver) {
    this.driver = driver;
  }

  async visualTest(PAGE_NAME) {
    const tempScreenshotPath = `../img/temp/${PAGE_NAME}`;
    const baseScreenshotPath = `../img/base/${PAGE_NAME}.jpg`;
    const actualScreenshotPath = `../img/actual/${PAGE_NAME}.jpg`;

    /** @type {boolean}*/ const isBaseScreenshotExist =
      existsSync(baseScreenshotPath);

    // Return Screenshot Buffer
    const pageScreenshotBuffer = await this.driver
      .saveScreenshot(tempScreenshotPath)
      .catch((e) => {
        throw new Error(e);
      });

    if (isBaseScreenshotExist) {
      const baseScreenshotBuffer = readFileSync(baseScreenshotPath);

      writeFileSync(actualScreenshotPath, pageScreenshotBuffer);

      chai.expect(pageScreenshotBuffer).to.matchImage(baseScreenshotBuffer);
    } else {
      writeFileSync(baseScreenshotPath, pageScreenshotBuffer);
    }
  }
}

module.exports = {
  ObjectsKategori,
  ObjectsWilayah,
  ObjectsWisata,
  ObjectsVisual,
};
