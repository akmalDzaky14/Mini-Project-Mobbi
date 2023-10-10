const setDriver = require("../src/utils/setDriver");
const options = require("../src/driverOptions/crud");
const Objects = require("../src/objects/KategoriObjects");
const formatTime = require("../src/objects/convertTime");

/** @type {WebdriverIO.Browser} */ let driver;
/** @type {Objects} */ let kategori;

describe("Test aplikasi CRUD", () => {
  before(async () => {
    performance.mark("Prepare-start-all");
    driver = await setDriver(options);
    kategori = new Objects(driver);
  });
  after(async () => {
    await driver.closeApp();
    performance.mark("Prepare-finished-all");
    const totalTime = performance
      .measure("Prepare-time-all", "Prepare-start-all", "Prepare-finished-all")
      .duration.toFixed();
    formatTime(totalTime, true);
  });

  it("01_Buka halaman Kategori", async () => {
    await kategori.openKategori();
  });
  it("02_Tambah Kategori 1", async () => {
    await kategori.clickAddButtonKategori();
    await kategori.inputKategori("Kategori 1");
  });
  it("03_Tambah Kategori 2", async () => {
    await kategori.clickAddButtonKategori();
    await kategori.inputKategori("Kategori 2");
  });
  it("04_Edit Kategori 1", async () => {
    await kategori.editKategori(1, "Update Kategori");
  });
  it("05_Delete Kategori 2", async () => {
    await kategori.deleteKategori(2);
  });
});
