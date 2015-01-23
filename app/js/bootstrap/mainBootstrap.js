$().ready(function () {
	mainC = new mainController();
	
	mainC.setModel(new mainModel());
	mainC.setTemplateManager(JPLoad);

	mainC.loadShare();
	mainC.loadPosts();

	mainC.loadHeader(function (response) {
		var followers = $('#header').find('.header-container #user-stats .followers span'),
			posts = $('#header').find('.header-container #user-stats .posts span');

		mainC.animateStats(followers);

		setTimeout(function () {
			mainC.animateStats(posts);
		},100);
	});
});