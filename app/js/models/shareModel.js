shareModel = function() {
	this.collection = [];
};

shareModel.prototype = {
	constructor : shareModel,

	uploadPhoto : function (picture, callback) {
		var _this = this,
			formData = new FormData();
    		
    	formData.append('file', picture);
    	
    	$.ajax({
            url: 'http://localhost/uploadPhoto/uploadPhoto.php',
            dataType: 'json',
            type: 'post',
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            success: function (data) {
            	callback(data.imageURL);
            },
            error: function (data) {
            	callback(false);
            }
     	});
	},

	addPost : function (comment, image, callback) {
		var postObject = {'comment' : comment};
		
		if (image)
			postObject.image = image;

		callback(postObject);
		// $.post("/addPost", postObject, function (data) {
		// 	callback(data);
		// })
		// .fail(function (response) {
		// 	callback(false);
		// });
	},

	addComment : function (postID, comment, image, callback) {
		var postObject = {'postID' : postID, 'comment' : comment};
		if (image)
			postObject.image = image;

		callback(postObject);
		// $.post("/addComment", postObject, function (data) {
		// 	callback(data);
		// })
		// .fail(function (response) {
		// 	callback(false);
		// });
	}
};