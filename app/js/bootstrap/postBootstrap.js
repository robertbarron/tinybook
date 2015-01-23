var pController = new postController();
pController.setModel(new postModel());

//TOGGLE OPTION MENU
$('#container').on('click', '.post .icon-down-open', function (e) {
	var clickedEl = $(this);

	e.stopPropagation();
	clickedEl.siblings('.menu').toggleClass('open');
});

//EDIT POST
$('#container').on('click', '.post .menu .edit-post', function (e) {
	var clickedEl = $(this),
		$post = clickedEl.closest('.post');

	clickedEl.closest('.menu').removeClass('open');

	$post.find('.edit-comment-container').toggleClass('active');
	$post.find('.comment-container').toggleClass('closed');
});

//CANCEL EDIT POST
$('#container').on('click', '.post .edit-comment-container .edit-comment-cancel', function (e) {
	$(this).closest('.post-content').find('.comment-container').toggleClass('closed');
	$(this).parent().removeClass('active');
});

//SEND EDITED POST
$('#container').on('click', '.post .edit-comment-container .edit-comment-send', function (e) {
	var clickedEl = $(this),
		postID = clickedEl.closest('.post').data('id'),
		comment = clickedEl.siblings('.edit-comment-input').val();

	if (comment.length < 5)
		return;

	pController.updatePost(comment, postID, function (response) {
		if (response) {
			clickedEl.closest('.post-content').find('.comment-container').text(comment).removeClass('closed');
			clickedEl.closest('.post-content').find('.edit-comment-container').toggleClass('active');
		}
	});
});

//DELETE POST
$('#container').on('click', '.post .menu .delete-post', function (e) {
	var clickedEl = $(this),
		$post = clickedEl.closest('.post');

	clickedEl.closest('.menu').removeClass('open');

	pController.deletePost($post.data('id'), function (response) {
		if (response)
			$post.remove();
	});
});

//LIKE POST
$('#container').on('click', '.post .post-actions .like-post', function (e) {
	var clickedEl = $(this),
		postID = clickedEl.closest('.post').data('id'),
		like = clickedEl.hasClass('liked-true');

	pController.setLike(postID, undefined, like, function (response) {
		if (response)
			clickedEl.toggleClass('liked-true');
	});
});

//LIKE A COMMENT
$('#container').on('click', '.post .post-comments .comment .like-comment', function (e) {
	var clickedEl = $(this),
		$comment = clickedEl.closest('.comment'),
		postID = $comment.closest('.post').data('id'),
		commentID = $comment.data('commentid'),
		like = clickedEl.hasClass('liked-true');

	pController.setLike(postID, commentID, like, function (response) {
		if (response)
			clickedEl.toggleClass('liked-true');
	});
});

//ATTACH PHOTO trigger
$('#container').on('click', '.post .post-comments .share-tiny .photo-attach', function (e) {
	$(this).siblings('#comment-photo').trigger('click');
});

$('#container').on('change', '.post .post-comments .share-tiny #comment-photo', function (e) {
	var clickedEl = $(this),
		picture = clickedEl.prop('files')[0],
		reader = new FileReader();

    reader.onload = function (e) {
        clickedEl.siblings('.image-preview-container').find('.image-preview').attr("src", e.target.result);
    }
	reader.readAsDataURL(picture);
});

//SEND COMMENT
$('#container').on('click', '.post .post-comments .share-tiny .action-buttons .send', function (e) {
	var clickedEl = $(this),
		$comment = clickedEl.closest('.input-container').find('.comment-share'),
		postID = clickedEl.closest('.post').data('id'),
		$picture = clickedEl.parent().siblings('.image-preview-container').find('.image-preview'),
		$fileContainer = clickedEl.closest('.post').find('#comment-photo');
		picture = $fileContainer.prop('files')[0];
    
    if (picture == undefined && $comment.val().length < 5)
    	return;    

    sController.addComment(postID, $comment.val(), picture, function (response) {
		if (response)
			pController.attachComment(mainC, clickedEl.closest('.post'), response);
    });
});