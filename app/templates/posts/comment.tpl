<div class="comment" data-commentid="{{commentID}}">
	<div class="comment-container">
		<div class="top-info">
			<div class="logo">
				<img src="{{logo}}" />
			</div>
			<div class="user-info">
				<div class="user-nickname">{{username}}</div>
				<div class="user-posttime">
					<div class="time">{{time}}</div>
					<div class="like-comment liked-{{liked}}"></div>
				</div>
			</div>
		</div>
		<div class="comment-content">
			{{comment}}
			<div class="image-attached-{{image_attached}}">
				<img src="{{image}}"/>
			</div>
		</div>
	</div>
</div>