var mainController = function () {
	this.templateManager;
	this.model;
};

mainController.prototype = {
	constructor : mainController,

	setModel : function (model) {
		this.model = model;
	},
	
	setTemplateManager : function (templateManager) {
		this.templateManager = templateManager;
	},

	loadHeader : function (callback) {
		var template = "app/templates/header/header.tpl",
			idSection = "header";

		this.render(template, idSection, function (response) {
			if (callback)
				callback(true);
		});
	},
	
	loadShare : function () {
		var template = "app/templates/share/full.tpl",
			idSection = "container";
		
		this.append(template, idSection)
	},
	
	_addCommas : function (number) {
		while ( /(\d+)(\d{3})/.test(number.toString()) ) {
      			number = number.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
	    	}
	    	return number;
	},

	animateStats : function ($container, duration) {
		var _this = this;
		$container.parent().removeClass('no-display');
		$({initialValue: 0}).animate({initialValue : $container.text()}, {
			duration : 2500,
			easing: 'swing',
			step: function () {
				$container.text(_this._addCommas(Math.round(this.initialValue)));
			},
			complete: function () {
				$container.text(_this._addCommas(Math.round(this.initialValue)));	
			}
		});
	},

	getPosts : function (callback) {
		var _this = this;
		this.model.getPosts(function (response) {
			if (response) {
				callback(response);
			} else
				callback(false);
		});
	},
	
	getUser : function () {
		return this.model.getUserInfo();
	},

	setUserData : function (data) {
		var userInfo = mainC.getUser();
		
		if (data.image == undefined) {
			data.image = '/';
			data.image_attached = false;
		} else {
			data.image_attached = true;
		}
		data.username = userInfo.username;
		data.logo = userInfo.logo;
		data.time = "Now";

		return data;
	},
	

	_checkAttached : function (item) {
		if (item.image == undefined) {
			item.image = '/';
			item.image_attached = false;
		} else {
			item.image_attached = true;
		}
		return item;
	},

	setShare: function ($post) {
		var template = "app/templates/share/tiny.tpl",
			_this = this;

		setTimeout(function () {
			_this.templateManager.getView(template, function (response) {
				$post.append(response);
			});
		},500);
	},

	getComments: function (info, callback) {
		var $post = $(".post[data-id='" + info.postID + "'] .post-comments"),
			template = "app/templates/posts/comment.tpl",
			_this = this;

		this.model.getComments(info.postID, function (data) {
			$.each(data, function (index, item) {
				_this.$append(template, $post, _this._checkAttached(item) );
			});
			_this.setShare($post);
		});
	},

	loadPosts : function (callback) {
		var idSection = "container",
			template = "app/templates/posts/notFound.tpl",
			_this = this;
			
		
		_this.append(template, idSection);

		this.getPosts(function (data) {
			template = "app/templates/posts/single.tpl";
			if (data) {
				$('.post.notfound').remove();
				$.each(data, function (index, item) {
					_this.append(template, idSection, _this._checkAttached(item), function (response) {
						_this.getComments(item);
					});
				});
				if (callback)
					callback(true);
			}
		});
	},

	$append: function (template, $object, data, callback) {
		var _this = this;

		this.templateManager.getView(template, function (response) {
			if (response) {
				_this.templateManager.$appendView(response, $object, data, function (response) {
					if (callback)
						callback(true);
				});
			}
		});
	},

	append: function (template, idSection, data, callback) {
		var _this = this;

		this.templateManager.getView(template, function (response) {
			if (response) {
				_this.templateManager.appendView(response, idSection, data, function (response) {
					if (callback)
						callback(true);
				});
			}
		});
	},

	render: function (template, idSection, callback) {
		var _this = this;

		this.templateManager.getView(template, function (response) {
			if (response) {
				_this.templateManager.loadView(response, idSection, undefined);
				if (callback)
					callback(true);
			}
		});
	}
};
