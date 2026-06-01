const express = require("express");

const {
  addIncome,
  getAllIncome,
  deleteIncome,
  downloadIncomeExcel,
} = require("../controllers/incomeController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/addd", protect, addIncome);
router.get("/get", protect, getAllIncome);
router.get("/downloadExcel", protect, downloadIncomeExcel);
router.post("/:id", protect, deleteIncome);

module.exports = router;
