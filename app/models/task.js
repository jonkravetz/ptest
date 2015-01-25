exports.definition = {
	config: {
		columns: {
		    "content": "text",
		    "modifed": "text",
		    "status": "text",
		    "image": "blob"
		},
		adapter: {
			type: "sql",
			collection_name: "task"
		}
	},
	extendModel: function(Model) {
		_.extend(Model.prototype, {
			// extended functions and properties go here
		});

		return Model;
	},
	extendCollection: function(Collection) {
		_.extend(Collection.prototype, {
			// extended functions and properties go here
		});

		return Collection;
	}
};