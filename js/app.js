(function ( w, d ) {
	//todo обновлять метаинформацию о файле
	//todo отправлять форму
	//todo для картинок показывать синхронизацию
	//todo выводить алерт с сообщениями от сервера
	//fixme сортировка не таскает картинки
	var _files = {},
		dropzone = d.querySelector( '.dropzone'),
		imagesContainer = d.querySelector( '.images-container .sortable'),
		toolBarInfo = d.querySelector( '.toolbar-info'),
		toolbarActions = d.querySelector( '.toolbar-actions' ),
		clickSelect = function () {
			if ( !this.classList.contains( 'selected' ) ) {
				this.classList.add( 'selected' );
				//todo save to selected
				_files[getIndex( this )].selected = true;
			} else {
				this.classList.remove( 'selected' );
				//todo remove to selected
				_files[getIndex( this )].selected = false;
			}
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
						li = d.createElement( 'li' );
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
		onMain = function () {
			Object.keys( _files ).forEach(function ( i ) {
				if ( _files[i].selected ) {
					_files[i].main = true;
				}
			} );
		},
		onPublish = function () {
			Object.keys( _files ).forEach(function ( i ) {
				if ( _files[i].selected ) {
					_files[i].publish = true;
				}
			} );
		},
		onDelete = function () {
			Object.keys( _files ).forEach(function ( i ) {
				if ( _files[i].selected ) {
					//todo send requset for remove
					_files[i].dom.parentNode.removeChild( _files[i].dom );
					delete _files[i];
					setToolBarInfo();
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
			var propertyGUID = d.querySelector( '.from-container' ).action.split( 'guid=' )[1];
			FileAPI.upload( {
				url : '/?action=properties-file',
				data : { action : 'properties-file', fileGUID: guid, propertyGUID : propertyGUID },
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
		fileInfoUpload = function ( guid ) {
			//todo send meta to server
		};

	new Sortable( d.querySelector( '.sortable' ), {
		onUpdate : function ( e ) {
			//todo send order to server
			console.log( 'onUpdate:', e );
		}
	} );

	setToolBarInfo();

	if ( FileAPI.support.dnd ) {
		d.querySelector( '#dnd-enable' ).classList.remove( 'hide' );
		FileAPI.event.dnd( d, onHover, onFiles );
	}

	Array.prototype.forEach.call( d.querySelectorAll( '.toolbar-buttons input' ), function ( input ) {
		FileAPI.event.on( input, 'change', function ( e ) {
			var files = FileAPI.getFiles( e );
			onFiles(files);
			FileAPI.reset( e.target );
		} );
	} );

	d.querySelector( '#actionMain' ).addEventListener( 'click', onMain );
	d.querySelector( '#actionPublish' ).addEventListener( 'click', onPublish );
	d.querySelector( '#actionDelete' ).addEventListener( 'click', onDelete );

} )( window, document );