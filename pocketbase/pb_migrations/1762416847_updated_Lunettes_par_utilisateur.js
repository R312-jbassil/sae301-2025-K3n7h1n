/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2624508433")

  // update collection data
  unmarshal({
    "viewQuery": "SELECT\n  (ROW_NUMBER() OVER())                 AS id,\n  lunette.user                          AS user_id,\n  COUNT(*)                              AS nb_lunettes\nFROM lunette\nGROUP BY lunette.user;\n"
  }, collection)

  // remove field
  collection.fields.removeById("relation2809058197")

  // remove field
  collection.fields.removeById("_clone_dBHo")

  // remove field
  collection.fields.removeById("_clone_dxbn")

  // add field
  collection.fields.addAt(1, new Field({
    "cascadeDelete": false,
    "collectionId": "_pb_users_auth_",
    "hidden": false,
    "id": "_clone_YDdB",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "user_id",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // add field
  collection.fields.addAt(2, new Field({
    "hidden": false,
    "id": "number768066164",
    "max": null,
    "min": null,
    "name": "nb_lunettes",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2624508433")

  // update collection data
  unmarshal({
    "viewQuery": "SELECT \n  (ROW_NUMBER() OVER()) AS id,\n  users.id        AS user_id,\n  users.email     AS email_utilisateur,\n  configure.id_lunette\nFROM users, configure\nWHERE users.id = configure.id_utilisateur;"
  }, collection)

  // add field
  collection.fields.addAt(1, new Field({
    "cascadeDelete": false,
    "collectionId": "_pb_users_auth_",
    "hidden": false,
    "id": "relation2809058197",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "user_id",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // add field
  collection.fields.addAt(2, new Field({
    "exceptDomains": null,
    "hidden": false,
    "id": "_clone_dBHo",
    "name": "email_utilisateur",
    "onlyDomains": null,
    "presentable": false,
    "required": true,
    "system": true,
    "type": "email"
  }))

  // add field
  collection.fields.addAt(3, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_340737475",
    "hidden": false,
    "id": "_clone_dxbn",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "id_lunette",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // remove field
  collection.fields.removeById("_clone_YDdB")

  // remove field
  collection.fields.removeById("number768066164")

  return app.save(collection)
})
