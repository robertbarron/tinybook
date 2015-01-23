var sController = new shareController();
sController.setModel(new shareModel());
sController.setTemplateManager(JPLoad);

//Attach photo
$('#container').on('click', '#share-full .photo-attach', function (e) {
	$(this).siblings('#post-photo').trigger('click');
});

//Catching photo trigger to add preview
$('#container').on('change', '#share-full .input-container #post-photo', function (e) {
	var clickedEl = $(this),
		picture = clickedEl.prop('files')[0],
		reader = new FileReader(),
		$share = clickedEl.closest('.input-container');

    reader.onload = function (e) {
    	$share.find('.photo-share').addClass('no-display');
    	$share.find('.image-preview').removeClass('no-display').attr('src',e.target.result);
    }
	reader.readAsDataURL(picture);
});

//Send share
$('#container').on('click', '#share-full .action-buttons .send', function (e) {
	var clickedEl = $(this),
		$share = $('#share-full'),
		comment = $share.find('.post-comment'),
		picture = $share.find('#post-photo').prop('files')[0];
    
    if (picture == undefined && comment.val().length < 5)
    	return;    

    sController.addPost(comment.val(), picture, function (response) {
		if (response)
			sController.attachPost(mainC, response);
			$("#share-full .action-buttons .cancel").trigger('click');
    });
});

//Cancel share action
$('#container').on('click', '#share-full .action-buttons .cancel', function (e) {
	var $share = $(this).closest('#share-full');

	$share.find('.image-preview').attr('src', '').addClass('no-display');
	$share.find('.photo-share').removeClass('no-display');
	$share.find('.post-comment').val('');
	$share.find('#post-photo').val('');
});