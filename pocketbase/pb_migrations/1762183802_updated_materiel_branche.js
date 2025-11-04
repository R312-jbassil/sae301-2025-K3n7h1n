/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3296146660")

  // update field
  collection.fields.addAt(2, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_1486587212",
    "hidden": false,
    "id": "relation1208889792",
    "maxSelect": 999,
    "minSelect": 0,
    "name": "id_materiau",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3296146660")

  // update field
  collection.fields.addAt(2, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_1486587212",
    "hidden": false,
    "id": "relation1208889792",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "id_materiau",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
})
