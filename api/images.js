import data from "../lib/api.json" assert { type: "json" };

module.exports = function handler(req, res)  {
  res.status(200).json(data);
}