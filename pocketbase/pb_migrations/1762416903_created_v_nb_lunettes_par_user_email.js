/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = new Collection({
    "createRule": null,
    "deleteRule": null,
    "fields": [
      {
        "autogeneratePattern": "",
        "hidden": false,
        "id": "text3208210256",
        "max": 0,
        "min": 0,
        "name": "id",
        "pattern": "^[a-z0-9]+$",
        "presentable": false,
        "primaryKey": true,
        "required": true,
        "system": true,
        "type": "text"
      },
      {
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
      },
      {
        "hidden": false,
        "id": "json3885137012",
        "maxSize": 1,
        "name": "email",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "json"
      },
      {
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
      },
      {
        "hidden": false,
        "id": "json3545455741",
        "maxSize": 1,
        "name": "total_prix_centimes",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "json"
      }
    ],
    "id": "pbc_761713712",
    "indexes": [],
    "listRule": null,
    "name": "v_nb_lunettes_par_user_email",
    "system": false,
    "type": "view",
    "updateRule": null,
    "viewQuery": "SELECT\n  (ROW_NUMBER() OVER())                                         AS id,\n  L.user                                                        AS user_id,\n  (SELECT email FROM users WHERE users.id = L.user)             AS email,\n  COUNT(*)                                                      AS nb_lunettes,\n  COALESCE(SUM(L.prix), 0)                                      AS total_prix_centimes\nFROM lunette L\nGROUP BY L.user;\n",
    "viewRule": null
  });

  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_761713712");

  return app.delete(collection);
})
