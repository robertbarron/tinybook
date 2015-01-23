var shareController = function () {
	this.model;
	this.templateManager;
};

shareController.prototype = {
	constructor : shareController,

	setModel : function (model) {
		this.model = model;
	},

	setTemplateManager : function (templateManager) {
		this.templateManager = templateManager;
	},
	
	_addComment : function (postID, comment, image, callback) {
		var _this = this;
		this.uploadPhoto(image, function (response) {
			_this.model.addComment(postID, comment, response, function (response) {
				callback(response);
			});
		});
	},

	addComment : function (postID, comment, picture, callback) {
		var _this = this,
			picture = (picture == undefined) ? false : picture;

		if (picture) {
			_this._addComment(postID, comment, picture, function (response) {
				callback(response);
			});
		} else {
			_this.model.addComment(postID, comment, false, function (response) {
				callback(response);
			});
		}
	},

	uploadPhoto : function (picture, callback) {
		this.model.uploadPhoto(picture, function (response) {
			if (!response)
				callback(false);
			else
				callback(response);
		});
	},

	_addPost : function (comment, image, callback) {
		var _this = this;
		this.uploadPhoto(image, function (response) {
			_this.model.addPost(comment, response, function (response) {
				callback(response);
			});
		});
	},

	addPost : function (comment, picture, callback) {
		var _this = this,
			picture = (picture == undefined) ? false : picture;

		if (picture) {
			_this._addPost(comment, picture, function (response) {
				callback(response);
			});
		} else {
			_this.model.addPost(comment, false, function (response) {
				callback(response);
			});
		}
	},

	attachPost : function (mainC, data) {
		var _this = this,
			$object = $('#container'),
			template = "app/templates/posts/single.tpl";

		this.getTemplate(template, $object, mainC.setUserData(data), function (response) {
			if (response) {
				$('#share-full').after(response);
			}
		});
	},

	getTemplate : function (template, $object, data, callback) {
		var _this = this;
		this.templateManager.getView(template, function (response) {
			_this.templateManager.parseElement(data, response, function (response) {
				callback(response);
			});
		});
	}
};