/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_340737475")

  // remove field
  collection.fields.removeById("number3967196942")

  // add field
  collection.fields.addAt(9, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text3967196942",
    "max": 0,
    "min": 0,
    "name": "taille_monture",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_340737475")

  // add field
  collection.fields.addAt(6, new Field({
    "hidden": false,
    "id": "number3967196942",
    "max": null,
    "min": null,
    "name": "taille_monture",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  // remove field
  collection.fields.removeById("text3967196942")

  return app.save(collection)
})
