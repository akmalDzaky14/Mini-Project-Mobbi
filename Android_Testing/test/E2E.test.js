const setDriver = require("../src/utils/setDriver");
const options = require("../src/driverOptions/crud");
const {
  ObjectsKategori,
  ObjectsWilayah,
  ObjectsWisata,
} = require("../src/objects/Objects");
const formatTime = require("../src/objects/convertTime");

/** @type {WebdriverIO.Browser} */ let driver;
/** @type {ObjectsKategori} */ let objKategori;
/** @type {ObjectsWilayah} */ let objWilayah;
/** @type {ObjectsWisata} */ let objWisata;

describe("Test aplikasi CRUD", () => {
  before(async () => {
    performance.mark("Prepare-start-all");
    driver = await setDriver(options);
  });
  after(async () => {
    await driver.closeApp();
    performance.mark("Prepare-finished-all");
    const totalTime = performance
      .measure("Prepare-time-all", "Prepare-start-all", "Prepare-finished-all")
      .duration.toFixed();
    formatTime(totalTime, true);
  });

  describe("E2E_01_Halaman Kategori", () => {
    before(async () => {
      performance.mark("Prepare-start");
      objKategori = new ObjectsKategori(driver);
    });
    after(async () => {
      performance.mark("Prepare-finished");
      const totalTime = performance
        .measure("Prepare-time", "Prepare-start", "Prepare-finished")
        .duration.toFixed();
      formatTime(totalTime);
    });

    it("01_Buka halaman Kategori", async () => {
      await objKategori.openKategori();
    });
    it("02_Tambah Kategori 1", async () => {
      await objKategori.clickAddButtonKategori();
      await objKategori.inputKategori("Kategori 1");
    });
    it("03_Tambah Kategori 2", async () => {
      await objKategori.clickAddButtonKategori();
      await objKategori.inputKategori("Kategori 2");
    });
    it("04_Edit Kategori 1", async () => {
      await objKategori.editKategori(1, "Update Kategori");
    });
    it("05_Delete Kategori 2", async () => {
      await objKategori.deleteKategori(2);
    });
  });

  describe("E2E_02_Halaman Wilayah", () => {
    before(async () => {
      performance.mark("Prepare-start");
      objWilayah = new ObjectsWilayah(driver);
    });
    after(async () => {
      performance.mark("Prepare-finished");
      const totalTime = performance
        .measure("Prepare-time", "Prepare-start", "Prepare-finished")
        .duration.toFixed();
      formatTime(totalTime);
    });

    it("01_Buka halaman Wilayah", async () => {
      await objWilayah.openWilayah();
    });
    it("02_Tambah Wilayah 1", async () => {
      await objWilayah.clickAddButtonWilayah();
      await objWilayah.inputWilayah("Wilayah 1");
    });
    it("03_Tambah Wilayah 2", async () => {
      await objWilayah.clickAddButtonWilayah();
      await objWilayah.inputWilayah("Wilayah 2");
    });
    it("04_Edit Wilayah 1", async () => {
      await objWilayah.editWilayah(1, "Update Wilayah");
    });
    it("05_Delete Wilayah 2", async () => {
      await objWilayah.deleteWilayah(2);
    });
  });

  describe("E2E_03_Halaman Wisata", () => {
    before(async () => {
      performance.mark("Prepare-start");
      objWisata = new ObjectsWisata(driver);
    });
    after(async () => {
      performance.mark("Prepare-finished");
      const totalTime = performance
        .measure("Prepare-time", "Prepare-start", "Prepare-finished")
        .duration.toFixed();
      formatTime(totalTime);
    });

    it("01_Buka halaman Wisata", async () => {
      await objWisata.openWisata();
    });
    it("02_Tambah Wisata 1", async () => {
      await objWisata.clickAddButtonWisata();
      await objWisata.inputWisata("Wisata 1", 2, 2);
    });
    it("03_Tambah Wisata 2", async () => {
      await objWisata.clickAddButtonWisata();
      await objWisata.inputWisata("Wisata 2", 1, 1);
    });
    it("04_Edit Wisata 1", async () => {
      await objWisata.editWisata(1, "Update Wilayah", 1, 1);
    });
    it("05_Delete Wisata 2", async () => {
      await objWisata.deleteWisata(2);
    });
  });
});
