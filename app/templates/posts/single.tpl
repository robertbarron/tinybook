<div class="post" data-id="{{postID}}">
	<div class="post-container">
		<div class="top-info">
			<div class="logo">
				<img src="{{logo}}" />
			</div>
			<div class="user-info">
				<div class="user-nickname">{{username}}</div>
				<div class="user-posttime">{{time}}</div>
			</div>
			<div class="post-menu">
				<div class="icon-down-open"></div>
				<div class="menu ">
					<ul class="menu-list">
						<li class="edit-post" data-id="{{postID}}">Edit</li>
						<li class="delete-post" data-id="{{postID}}">Delete</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="post-content">
			<div class="comment-container">{{comment}}</div>
			<div class="edit-comment-container">
				<input type="text" class="edit-comment-input">
				<button class="edit-comment-send">send</button>
				<button class="edit-comment-cancel">cancel</button>
			</div>
			<div class="image-attached-{{image_attached}}">
				<img src="{{image}}"/>
			</div>
		</div>
		<div class="post-actions">
			<div class="like-post liked-{{liked}}"></div>
			<div class="clear"></div>
		</div>
	</div>
	<div class="post-comments"></div>
</div>