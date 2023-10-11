const setDriver = require("../src/utils/setDriver");
const options = require("../src/driverOptions/crud");
const {
  ObjectsKategori,
  ObjectsWilayah,
  ObjectsWisata,
  ObjectsVisual,
} = require("../src/objects/Objects");

/** @type {WebdriverIO.Browser} */ let driver;
/** @type {ObjectsKategori} */ let objKategori;
/** @type {ObjectsWilayah} */ let objWilayah;
/** @type {ObjectsWisata} */ let objWisata;
/** @type {ObjectsVisual} */ let objVisual;

describe("Functional Test (FT)", () => {
  before(async () => {
    driver = await setDriver(options);
    objKategori = new ObjectsKategori(driver);
    objWilayah = new ObjectsWilayah(driver);
    objWisata = new ObjectsWisata(driver);
    objVisual = new ObjectsVisual(driver);
  });
  after(async () => {
    await driver.closeApp();
  });

  describe.only("FT_001_Input Kategori Tanpa Text", async () => {
    it("01_Buka halaman Kategori", async () => {
      await objKategori.openKategori();
    });
    it("02_Tambah Kategori tanpa text", async () => {
      await objKategori.clickAddButtonKategori();
      await objKategori.inputKategori("", false);
      // await objVisual.visualTest("Kategori", "");
    });
  });
  describe("FT_002_Update kategori tanpa text", async () => {});

  describe("FT_003_Input wilayah Tanpa Text", async () => {});
  describe("FT_004_Update wilayah Tanpa Text", async () => {});

  describe("FT_005_Input wisata Tanpa Text, kategori dan wilayah", async () => {});
  describe("FT_006_Update wisata Tanpa Text", async () => {});
  describe("FT_007_Hapus kategori dan wilayah ketika ada wisata", async () => {});
});
