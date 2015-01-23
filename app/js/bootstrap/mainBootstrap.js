$().ready(function () {
	mainC = new mainController();
	
	mainC.setModel(new mainModel());
	mainC.setTemplateManager(JPLoad);

	mainC.loadHeader();
	mainC.loadShare();
	mainC.loadPosts();
});