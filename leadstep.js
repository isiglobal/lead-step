
console.log('nav loaded');

var nav = function() {
	console.log('nav function');
};



//
// LeadStep
// Copyright (c) 2013 Brandon Thomas <bt@brand.io>
//
// Step is a node in an "undirected" graph. Each step corresponds to
// an installment of guided user input. 
//

var Step = Backbone.Model.extend({
	defaults: {
		key: '',
		title: '',

		// Parent and child steps
		parents: null,
		children: null,
 
		// Requires data to move to next step?
		requiresData: false, // false | 'some' | 'all'
	},

	initialize: function() {
		this.set({
			parents: new Steps(),
			children: new Steps(),
		});
	},

	// Add Step, Array, or Collection of Steps.
	setNext: function(steps) {
		var children = this.get('children'),
			i = 0;
		if('toArray' in steps) {
			children.add(steps.toArray()); // Collection
			for(i = 0; i < steps.length; i++) {
				steps.at(i)._addParent(this);
			}
		}
		else if('length' in steps) {
			children.add(steps); // Array
			for(i = 0; i < steps.length; i++) {
				steps[i]._addParent(this);
			}
		}
		else { 
			children.add(steps); // Object
			steps._addParent(this);
		}
	},

	// PRIVATE METHOD
	_addParent: function(parent) {
		this.get('parents').add(parent);
	},

	///////////////////////////////////
	// 	  Override These Functions   //
	// to provide core functionality //
	///////////////////////////////////

	next: function() {
		if(!this.canProceed()) {
			return false;
		}
		return this.children.at(0);
	},

	prev: function() {
		if(!this.canGoBack()) {
			return false;
		}
		return this.parents.at(0);
	},

	canProceed: function() {
		if(!this.children.length) {
			return false;
		}
		return true;
	},

	canGoBack: function() {
		if(!this.parents.length) {
			return false;
		}
		return true;
	},
});


var Steps = Backbone.Collection.extend({
	model: Step,
	get: function(key) {
		return this.findWhere([{key: key}]);
	},
	model: Step,

	// Pointer to last visited and current stage
	_cur: 0,
	_last: 0,

	/////////// NAVIGATION ///////////
	// These *DO* trigger a change event!

	next: function() {
		if(this._cur >= this.length - 1) {
			return;
		}
		this._last = this._cur;
		this._cur += 1;
		this.trigger('steps:change');
	},

	prev: function() {
		if(this._cur <= 0) {
			return;
		}
		this._last = this._cur;
		this._cur -= 1;
		this.trigger('steps:change');
	},

	goto: function(n) {
		if(typeof(n) != 'number') {
			return;
		}
		if(n < 0 || n >= this.length) {
			return;
		}
		this._last = this._cur;
		this._cur = n;
		this.trigger('steps:change');
	},

	/////////// STEP ACCESSORS /////////////
	// These do *not* trigger a change event!

	getCurStep: function() { return this.at(this._cur); },
	getNextStep: function() { return this.at(this.nextId()); },
	getPrevStep: function() { return this.at(this.prevId()); },

	/////////// POINTERS /////////////

	pos: function() { return this._cur; },
	end: function() { return this.length - 1; },
	nextId: function() {
		if(this._cur >= this.length - 1) {
			return this._cur;
		}
		return this._cur + 1;
	},
	prevId: function() {
		if(this._cur <= 0) {
			return 0;
		}
		return this._cur - 1;
	},
});


var Field = Backbone.Model.extend({
	defaults: {
		key: '',
		label: '',
		value: '',
		'default': '',
	},
});

var Fields = Backbone.Collection.extend({
	model: Field,
});


// ASDDF
//
// Get rid of Require.js -- it's not a good build process
// Find out how to build with Node.js require(), export(), etc.
//
//	-	/src
//			- models.js
//			- views.js
//			- etc.js
//
//	- 	/build
//			- leadstep.js
//			- leadstep.min.js
//
//	-	Include git tag, build date, author, license, etc.
//	-	Try to force build before git commit


console.log('main loaded... test');

var main = function() {
	console.log('main function');
};

var main_test = function() {
	console.log('main_test');
};
