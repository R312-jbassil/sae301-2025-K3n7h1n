/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_761713712")

  // update collection data
  unmarshal({
    "viewQuery": "SELECT\n  (ROW_NUMBER() OVER())                                         AS id,\n  L.user                                                        AS user_id,\n  (SELECT email FROM users WHERE users.id = L.user)             AS email,\n  COUNT(*)                                                      AS nb_lunettes,\n  COALESCE(SUM(L.prix), 0)                                      AS total_prix_euro\nFROM lunette L\nGROUP BY L.user;\n"
  }, collection)

  // remove field
  collection.fields.removeById("_clone_PJIG")

  // remove field
  collection.fields.removeById("json3545455741")

  // add field
  collection.fields.addAt(1, new Field({
    "cascadeDelete": false,
    "collectionId": "_pb_users_auth_",
    "hidden": false,
    "id": "_clone_xg4E",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "user_id",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // add field
  collection.fields.addAt(4, new Field({
    "hidden": false,
    "id": "json2581408055",
    "maxSize": 1,
    "name": "total_prix_euro",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "json"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_761713712")

  // update collection data
  unmarshal({
    "viewQuery": "SELECT\n  (ROW_NUMBER() OVER())                                         AS id,\n  L.user                                                        AS user_id,\n  (SELECT email FROM users WHERE users.id = L.user)             AS email,\n  COUNT(*)                                                      AS nb_lunettes,\n  COALESCE(SUM(L.prix), 0)                                      AS total_prix_centimes\nFROM lunette L\nGROUP BY L.user;\n"
  }, collection)

  // add field
  collection.fields.addAt(1, new Field({
    "cascadeDelete": false,
    "collectionId": "_pb_users_auth_",
    "hidden": false,
    "id": "_clone_PJIG",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "user_id",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // add field
  collection.fields.addAt(4, new Field({
    "hidden": false,
    "id": "json3545455741",
    "maxSize": 1,
    "name": "total_prix_centimes",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "json"
  }))

  // remove field
  collection.fields.removeById("_clone_xg4E")

  // remove field
  collection.fields.removeById("json2581408055")

  return app.save(collection)
})
