import DealerModel from "../Model/DealerModel.js";
import SubDealerModel from "../Model/SubDealerModel.js";
import SuperDealerModel from "../Model/SuperDealerModel.js";

export const getSuperDealer = async (req, res) => {
  try {
    const superDealers = await SuperDealerModel.find().populate("dealers");
    res.json(superDealers);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching super dealers", error: err.message });
  }
};

export const getDealer = async (req, res) => {
  const { id } = req.params;
  console.log(id);

  try {
    const dealer = await DealerModel.find({ superDealer: id }).populate(
      "subDealers"
    );
    if (!dealer) return res.status(404).json({ message: "Dealer not found" });
    res.json(dealer);
    console.log("Dealer:", dealer);
  } catch (err) {
    console.log(err);

    res
      .status(500)
      .json({ message: "Error fetching dealer", error: err.message });
  }
};

export const getSubDealer = async (req, res) => {
  try {
    const subDealer = await SubDealerModel.find({ dealer: req.params.id });
    if (!subDealer)
      return res.status(404).json({ message: "Sub-dealer not found" });
    res.json(subDealer);
    console.log(subDealer);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching sub-dealer", error: err.message });
  }
};


