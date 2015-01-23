var postController = function () {
	this.model;
	this.templateManager;
};

postController.prototype = {
	constructor : postController,

	setModel : function (model) {
		this.model = model;
	},

	setTemplateManager : function (templateManager) {
		this.templateManager = templateManager;
	},

	setLike : function (postID, commentID, like, callback) {
		this.model.setLike(postID, undefined, like, function (response) {
			callback(response);
		});
	},

	editPost : function (postID, newComment, callback) {
		this.model.updateComment(postID, newComment, function (response) {
			callback(response);
		});
	},

	deletePost : function (postID, callback) {
		this.model.deletePost(postID, function (response) {
			callback(response);
		});
	},

	updatePost : function (comment, postID, callback) {
		this.model.updatePost(comment, postID, function (response) {
			callback(response);
		});
	},
	
	attachComment : function (mainC, $post, data) {
		var _this = this,
			template = "app/templates/posts/comment.tpl";

		$post.find('.comment.share-tiny').remove();
		$post = $post.find('.post-comments');

		mainC.$append(template, $post, mainC.setUserData(data) );
		mainC.setShare($post);
	}
};