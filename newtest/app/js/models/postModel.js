var postModel = function () {
	this.collection = [];
};

postModel.prototype = {
	constructor : postModel,

	setLike : function (postID, commentID, like, callback) {
		callback(true);
		// var isMain = (commentID != undefined) ? false : true,
		// 	postObject = {'postID' : postID, 'commentID' : commentID, 'isMain' : isMain};
		
		// $.post("/setLike", postObject, function (data) {
		// 	callback(data);
		// })
		// .fail(function () {
		// 	callback(false);
		// });
	},
	updatePost : function (comment, postID, callback) {
		callback(true);
		// var postObject = {'postID' : postID, 'comment' : comment};

		// $.get('/update-comment', postObject, function (data) {
		// 	callback(data);
		// })
		// .fail(function () {
		// 	callback(false);
		// });
	},

	editPost : function (postID, newComment, callback) {
		callback(true);
		// $.get('/edit-comment', {'postID' : postID, 'comment' : 'newComment'}, function (data) {
		// 	callback(data);
		// })
		// .fail(function () {
		// 	callback(false);
		// });
	},

	deletePost : function (postID, callback) {
		callback(true);
		// $.get('/delete-post',{'postID' : postID}, function (data) {
		// 	callback(data);
		// })
		// .fail(function () {
		// 	callback(false);
		// });
	},
};