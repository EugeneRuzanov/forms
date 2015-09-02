<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Forms</title>
	<link rel="stylesheet" href="foundation-5.5.2/css/foundation.min.css">
	<link rel="stylesheet" href="style.css">
</head>
<body>
<div class="dropzone">
	<div class="dropzone-message">Drop files there</div>
</div>
<div class="main-container">
	<form action="/?action=properties-card?guid=<?=GUID()?>" method="POST" class="from-container">
		<label>
			Address
			<input type="text" name="address">
		</label>
		<label for="price">Price</label>
		<div class="row collapse">
			<div class="columns medium-2">
				<span class="prefix">&pound;</span>
			</div>
			<div class="columns medium-10">
				<input type="text" id="price" name="price">
			</div>
		</div>
		<label>
			Description
			<textarea name="description"></textarea>
		</label>

		<button type="submit" class="small">Send</button>
	</form>
	<div class="images-container">
		<div class="toolbar">
			<div class="toolbar-info"></div>
			<div class="toolbar-buttons">
				<div class="btn">
					Upload one file
					<input name="files" type="file">
				</div>
				<div class="btn">
					Multiple
					<input name="files" type="file" multiple>
				</div>
				<span id="dnd-enable" class="hide">&nbsp; or drag'n'drop</span>
			</div>
			<div class="toolbar-actions disable">
				<div id="actionMain" class="item">Main</div>
				<div id="actionPublish" class="item">Publish</div>
				<div id="actionDelete" class="item">Delete</div>
			</div>
		</div>
		<ul class="sortable"></ul>
	</div>
</div>
<script src="js/FileAPI.html5.js"></script>
<script src="js/Sortable.js"></script>
<script src="js/app.js"></script>
</body>
</html>
