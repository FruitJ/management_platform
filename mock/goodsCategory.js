

module.exports = {
	["POST /api/editCategoryService"](req, res) {
		
		return res.status(200).json({name: "FruitJ"});
	},
	["POST /api/delCategoryService"](req, res) {
	
		return res.status(200).json({ name: "XXY", age: 23 });
	},
};
