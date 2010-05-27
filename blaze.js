/**
 * blaze.js
 * http://labs.peterwooley.com/blazejs
 *
 * Copyright 2010 Peter Wooley
 * peter@peterwooley.com
 * @peterwooley
 */
(function(window) {
	// The Blaze object just wraps the init constructor
	// This technique was completely ripped from jQuery
	var Blaze = function(settings) { return new Blaze.fn.init(settings); };
		
	Blaze.fn = Blaze.prototype = {
	
		/**
		 * Constructs a new Blaze sprite.
		 *
		 * @param {Object} settings Sprite settings (Currently not used)
		 * @return The new Blaze object.
		 */    
		init: function(settings) {
			this.id = Blaze.unique();
			this.canvas = Blaze.canvas();
			this.graphics = this.canvas.getContext('2d');
			this.children = [];
			
			return this;
		},
		
		/**
		 * Add a child sprite.
		 *
		 * @param {Blaze} sprite Blaze sprite to add as a child.
		 * @return The current Blaze object.
		 */
		add: function(sprite) {
			this.children.push(sprite);
			return this;
		},
		
		/**
		 * Get an array of all children.
		 *
		 * @return An array of child sprites. The array could be empty.
		 */
		children: function() {
			return this.children;
		},
		
		/**
		 * Render the Blaze with all of its children.
		 *
		 * @param {String} element Optional element to render into. If not given, the rendered canvas is returned.
		 * @return If element is not given, returns the rendered canvas element.
		 */
		render: function(element) {
			// Render canvas to element
			var canvas = this.canvas;
			
			if(this.children.length) {
				var scratch = Blaze.canvas(),
					graphics = scratch.getContext('2d');
					
				graphics.drawImage(this.canvas, 0, 0);
				
				for(var i in this.children) {
					graphics.drawImage(this.children[i].render(), 0, 0);
				}
				
				canvas = scratch;
			}
			
			if(element) {
				element.appendChild(canvas);
			} else {
				return canvas;
			}
		}
	}
	
	/**
	 * Creates a new canvas element.
	 *
	 * @return A new canvas element.
	 */
	Blaze.canvas = function() {
		return document.createElement('canvas');
	}
	
	/**
	 * Generates a unique id.
	 *
	 * @return A unique id.
	 */
	Blaze.unique = (function() {
		var id = new Date().getTime();
		return function() {
			return id++;
		}
	})();
	
	// Taken from jQuery, allows BLaze object to be a dumb wrapper
	Blaze.fn.init.prototype = Blaze.fn;
	
	// Adds Blaze object to the global scope
	window.Blaze = window.blz = Blaze;
	
}(window));