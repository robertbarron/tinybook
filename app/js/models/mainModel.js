var mainModel = function () {
	this.templateManager;
	this.model;
};

mainModel.prototype = {
	constructor : mainModel,
	getPosts : function (callback) {
		$.get("dummy-data/posts.json", function (data) {
			callback(data);
		})
		.fail(function () {
			callback(false);
		});
	},
	_filterById : function (postID, data, callback) {
		return data.filter(function (item, index) { 
			if (item.postID == postID)
				return item;
		});
	},

	getComments : function (postID, callback) {
		var _this = this;
		$.get("dummy-data/comments.json", function (data) {
			callback(_this._filterById(postID, data));
		})
		.fail(function () {
			callback(false);
		});
	},
	
	getUserInfo : function () {
		var info = {};
		info.username = "Roberto Barron";
		info.logo = "app/images/logos/robert.jpg";

		return info;
	}
};