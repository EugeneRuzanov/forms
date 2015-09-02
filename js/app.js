document.addEventListener( 'DOMContentLoaded', function () {
	//todo для картинок показывать синхронизацию
	//todo выводить алерт с сообщениями от сервера
	//fixme сортировка не таскает картинки
	var _files = {},
		PROPERTY_GUID = document.querySelector( '.form-container' ).action.split( 'guid=' )[1],
		dropzone = document.querySelector( '.dropzone'),
		imagesContainer = document.querySelector( '.images-container .sortable'),
		toolBarInfo = document.querySelector( '.toolbar-info'),
		toolbarActions = document.querySelector( '.toolbar-actions' ),
		clickSelect = function () {
			var isSelected = this.classList.contains( 'selected' );
			this.classList[ isSelected ? 'remove' : 'add' ]( 'selected' );
			_files[getIndex( this )].selected = !isSelected;
			setToolBarInfo();
		},
		getIndex = function ( domEl ) {
			return Object.keys( _files ).filter(function ( k ) { return _files[k].dom === domEl; } )[0];
		},
		setToolBarInfo = function () {
			var keys = Object.keys( _files),
				selected = keys.filter( function( i ) { return _files[i].selected; } );
			toolbarActions.classList[ selected.length ? 'remove' : 'add' ]( 'disable' );
			toolBarInfo.innerHTML = 'Total: ' + keys.length;
			toolBarInfo.innerHTML += ' / Selected: ' + selected.length;
		},
		onHover = function ( hover ) {
			dropzone.classList[ hover ? 'add' : 'remove' ]( 'show' );
		},
		onFiles = function ( files ) {
			FileAPI.each( files, function ( file ) {
				FileAPI.Image( file ).get( function (err/**String*/, img/**HTMLElement*/) {
					var guid = getGUID(), li;
					if ( !err ) {
						var li = document.createElement( 'li' );
						li.innerHTML = '<div class="ic-selected">&check;</div>';
						_files[guid] = {
							file : file,
							dom: li,
							selected : false,
							main : false,
							publish : false,
							caption : ''
						};
						setToolBarInfo();
						li.addEventListener( 'click', clickSelect );
						li.appendChild( img );
						imagesContainer.appendChild( li );
						fileUpload( file, guid );
					}
				});
			});
		},
		clickGroupAction = function ( e ) {
			var action = e.target.id.split( '-' )[1];

			Object.keys( _files ).forEach(function ( i ) {
				if ( _files[i].selected ) {
					if ( action === 'delete' ) {
						//fileInfoUpload( i, function ( err, success ) {
						//	if ( !err && _files[success.guid] ) {
						//		_files[success.guid].dom.parentNode.removeChild( _files[success.guid].dom );
						//		delete _files[success.guid];
						//		setToolBarInfo();
						//	}
						//} );
						_files[i].dom.parentNode.removeChild( _files[i].dom );
						delete _files[i];
						setToolBarInfo();
					} else {
						_files[i][action] = true;
						//fileInfoUpload( i, function ( err, success ) {} );
					}
				}
			} );
		},
		getGUID = function() {
			return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
				var r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
				return v.toString(16);
			});
		},
		fileUpload = function ( file, guid ) {
			FileAPI.upload( {
				url : '/?action=properties-file',
				data : { action : 'properties-file', fileGUID: guid, propertyGUID : PROPERTY_GUID },
				files : { file: file },
				upload : function ( xhr/**Object*/, options/**Object*/ ){
					// ...
					console.log( 'upload' );
				},
				progress : function ( e/**Object*/, file/**Object*/, xhr/**Object*/, options/**Object*/ ) {
					console.log( 'progress:', e.loaded / e.total * 100 );
				},
				complete : function ( err/**String*/, xhr/**Object*/, file/**Object/, options/**Object*/ ) {
					if( !err ){
						// Все файлы загружены успешно
						console.log( 'complete', xhr );
					}
				}
			} );
		},
		_post = function ( opt ) {
			var xhr = new XMLHttpRequest();
			xhr.open( 'POST', opt.url, true );
			xhr.onreadystatechange = function () {
				if (xhr.readyState !== 4) return;
				if (xhr.status != 200) {
					opt.fail( { status : xhr.status, statusText : xhr.statusText } );
				} else {
					opt.success( xhr.responseText );
				}
			};
			xhr.send( opt.data );
		},
		fileInfoUpload = function ( guid, callback ) {
			_post( {
				url: '/?action=properties-fileInfo',
				data : {
					propertyGUID : PROPERTY_GUID,
					fileGUID : guid,
					main : _files[guid].main,
					status : _files[guid].publish,
					order : 0,
					title : _files[guid].caption,
				},
				success : callback,
				fail : callback
			} );
		},
		submitProperty = function ( e ) {
			e.preventDefault();
			var i = 0, data = {}, value, xhr;
			for( ; i < e.target.length; i++ ) {
				if ( e.target[i].name ) {
					value = e.target[i][ e.target[i].type === 'checkbox' ? 'checked' : 'value' ];
					data[e.target[i].name] = value;
				}
			}
			_post( {
				url : '/?action=properties-card',
				data : data,
				success : function (response) {
					console.log(response);
				},
				fail : function (err) {
					console.log(err);
				}
			} );
			//todo set loading for form
		};

	new Sortable( document.querySelector( '.sortable' ), {
		onUpdate : function ( e ) {
			//todo send order to server
			console.log( 'onUpdate:', e );
		}
	} );

	setToolBarInfo();

	if ( FileAPI.support.dnd ) {
		document.querySelector( '#dnd-enable' ).classList.remove( 'hide' );
		FileAPI.event.dnd( document, onHover, onFiles );
	}

	FileAPI.event.on( document.querySelector( '.toolbar-buttons input' ), 'change', function ( e ) {
		var files = FileAPI.getFiles( e );
		onFiles(files);
		FileAPI.reset( e.target );
	} );

	document.querySelector( '.form-container').addEventListener( 'submit', submitProperty );

	[ '#action-main', '#action-publish', '#action-delete' ].forEach( function ( el ) {
		document.querySelector( el ).addEventListener( 'click', clickGroupAction );
	} );
} );
