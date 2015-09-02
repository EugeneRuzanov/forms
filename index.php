<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Forms</title>
	<link rel="stylesheet" href="style.css">
</head>
<body>
<div class="dropzone">
	<div class="dropzone-message">Drop files there</div>
</div>
<div class="main-container">
	<form action="/?action=properties-card?guid=<?=GUID()?>" method="POST" class="form-container">
		<div>
			<label>Title</label>
			<input type="text" name="title">
			<div class="error">error</div>
		</div>
		<div>
			<label>Type</label>
			<select name="type">
				<option value="1">villa</option>
				<option value="2">apartment</option>
				<option value="3">land</option>
				<option value="4">hotel</option>
				<option value="5">commercial property</option>
				<option value="6">other</option>
			</select>
		</div>
		<div>
			<label>Condition</label>
			<select name="condition">
				<option value="1">under construction</option>
				<option value="2">off plan</option>
				<option value="3">built</option>
			</select>
		</div>
		<div>
			<label>District</label>
			<select name="district">
				<option value="1">Lefkoşa</option>
				<option value="2">Gazimağusa</option>
				<option value="3">Girne</option>
				<option value="4">Güzelyurt </option>
				<option value="5">İskele</option>
			</select>
		</div>
		<div>
			<label>City</label>
			<select name="city">
				<option value="1">alagadi</option>
				<option value="2">alsancak</option>
				<option value="3">bacheli</option>
				<option value="4">bafra</option>
				<option value="5">bellapais</option>
				<option value="6">bogaz</option>
				<option value="7">catalköy</option>
				<option value="8">cyprus hills</option>
				<option value="9">edremit</option>
				<option value="10">escape beach</option>
				<option value="11">esentepe</option>
				<option value="12">ilgaz</option>
				<option value="13">karaagac</option>
				<option value="14">karaman</option>
				<option value="15">karmi</option>
				<option value="16">karpaz</option>
				<option value="17">karsiyaka</option>
				<option value="18">kayalar</option>
				<option value="19">kyrenia centre</option>
				<option value="20">lapta</option>
				<option value="21">malatya</option>
				<option value="22">ozankoy</option>
				<option value="23">tatlisu</option>
				<option value="24">thalassa</option>
				<option value="25">turtle bay</option>
			</select>
		</div>

		<div class="has-prefix">
			<label for="">Living area</label>
			<input type="text" name="livingarea">
			<div class="prefix">sq.m</div>
			<div class="error">error</div>
		</div>

		<div class="has-prefix">
			<label for="">Residential area</label>
			<input type="text" name="residentialArea">
			<div class="prefix">sq.m</div>
			<div class="error">error</div>
		</div>

		<div class="has-prefix">
			<label for="">Commercial area</label>
			<input type="text" name="commercialArea">
			<div class="prefix">sq.m</div>
			<div class="error">error</div>
		</div>

		<div class="has-prefix">
			<label for="">Built</label>
			<input type="text" name="builtTS">
			<div class="prefix">y-m-d</div>
			<div class="error">error</div>
		</div>
		<div>
			<label for="">Bedrooms</label>
			<input type="text" name="bedrooms">
			<div class="error">error</div>
		</div>
		<div>
			<label for="">Bathrooms</label>
			<input type="text" name="bathrooms">
			<div class="error">error</div>
		</div>
		<div>
			<label for="">Garage</label>
			<input type="text" name="garage">
			<div class="error">error</div>
		</div>

		<div class="checkbox">
			<input id="has-heating" type="checkbox" name="heating">
			<label for="has-heating">Heating</label>
		</div>
		<div class="checkbox">
			<input id="has-pool" type="checkbox" name="pool">
			<label for="has-pool">Pool</label>
		</div>
		<div class="checkbox">
			<input id="has-garden" type="checkbox" name="garden">
			<label for="has-garden">Garden</label>
		</div>
		<div class="checkbox">
			<input id="has-fireplace" type="checkbox" name="fireplace">
			<label for="has-fireplace">Fireplace</label>
		</div>
		<div class="checkbox">
			<input id="has-furniture" type="checkbox" name="furniture">
			<label for="has-furniture">Furniture</label>
		</div>
		<div class="checkbox">
			<input id="has-restaurant" type="checkbox" name="restaurant">
			<label for="has-restaurant">Restaurant</label>
		</div>
		<div class="checkbox">
			<input id="has-fitness-centre" type="checkbox" name="fitnessCentre">
			<label for="has-fitness-centre">Fitness centre</label>
		</div>
		<div class="checkbox">
			<input id="has-grocery-shop" type="checkbox" name="groceryShop">
			<label for="has-grocery-shop">Grocery shop</label>
		</div>
		<div class="checkbox">
			<input id="has-childrens-play-area" type="checkbox" name="childrensPlayArea">
			<label for="has-childrens-play-area">Childrens play area</label>
		</div>
		<div class="checkbox">
			<input id="has-publish" type="checkbox" name="publush">
			<label for="has-publish">Publish</label>
		</div>

		<div class="has-prefix">
			<label for="">Price</label>
			<input type="text" name="price">
			<label class="prefix">&pound;</label>
			<div class="error">error</div>
		</div>
		<div>
			<label>Description</label>
			<textarea name="description"></textarea>
			<div class="error">error</div>
		</div>

		<button type="submit" class="btn">Save</button>
	</form>
	<div class="images-container">
		<div class="toolbar">
			<div class="toolbar-info"></div>
			<div class="toolbar-buttons">
				<div class="btn">
					Upload files
					<input name="files" type="file" multiple>
				</div>
				<span id="dnd-enable" class="hide">&nbsp; or drag'n'drop</span>
			</div>
			<div class="toolbar-actions disable">
				<div id="action-main" class="item">Main</div>
				<div id="action-publish" class="item">Publish</div>
				<div id="action-delete" class="item">Delete</div>
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
