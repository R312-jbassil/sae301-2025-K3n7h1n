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
        "collectionId": "pbc_340737475",
        "hidden": false,
        "id": "relation2274609426",
        "maxSelect": 1,
        "minSelect": 0,
        "name": "lunette_id",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "relation"
      },
      {
        "autogeneratePattern": "",
        "hidden": false,
        "id": "_clone_HJrj",
        "max": 0,
        "min": 0,
        "name": "nom_modele",
        "pattern": "",
        "presentable": false,
        "primaryKey": false,
        "required": false,
        "system": false,
        "type": "text"
      },
      {
        "hidden": false,
        "id": "_clone_BRKp",
        "max": null,
        "min": null,
        "name": "prix_euro",
        "onlyInt": false,
        "presentable": false,
        "required": false,
        "system": false,
        "type": "number"
      },
      {
        "hidden": false,
        "id": "_clone_Y8Ds",
        "max": null,
        "min": null,
        "name": "largeur_pont_mm",
        "onlyInt": false,
        "presentable": false,
        "required": false,
        "system": false,
        "type": "number"
      },
      {
        "hidden": false,
        "id": "_clone_mu1A",
        "max": null,
        "min": null,
        "name": "largeur_verre_mm",
        "onlyInt": false,
        "presentable": false,
        "required": false,
        "system": false,
        "type": "number"
      },
      {
        "hidden": false,
        "id": "_clone_TVqa",
        "max": null,
        "min": null,
        "name": "hauteur_verre_mm",
        "onlyInt": false,
        "presentable": false,
        "required": false,
        "system": false,
        "type": "number"
      },
      {
        "hidden": false,
        "id": "_clone_uinj",
        "max": null,
        "min": null,
        "name": "longueur_branche_mm",
        "onlyInt": false,
        "presentable": false,
        "required": false,
        "system": false,
        "type": "number"
      },
      {
        "autogeneratePattern": "",
        "hidden": false,
        "id": "_clone_dj5u",
        "max": 0,
        "min": 0,
        "name": "taille_monture",
        "pattern": "",
        "presentable": false,
        "primaryKey": false,
        "required": false,
        "system": false,
        "type": "text"
      },
      {
        "autogeneratePattern": "",
        "hidden": false,
        "id": "_clone_RLGE",
        "max": 0,
        "min": 0,
        "name": "couleur_monture_hex",
        "pattern": "",
        "presentable": false,
        "primaryKey": false,
        "required": false,
        "system": false,
        "type": "text"
      },
      {
        "autogeneratePattern": "",
        "hidden": false,
        "id": "_clone_T8tl",
        "max": 0,
        "min": 0,
        "name": "couleur_branche_hex",
        "pattern": "",
        "presentable": false,
        "primaryKey": false,
        "required": false,
        "system": false,
        "type": "text"
      },
      {
        "autogeneratePattern": "",
        "hidden": false,
        "id": "_clone_NIhd",
        "max": 0,
        "min": 0,
        "name": "couleur_verre_hex",
        "pattern": "",
        "presentable": false,
        "primaryKey": false,
        "required": false,
        "system": false,
        "type": "text"
      },
      {
        "hidden": false,
        "id": "_clone_S9n8",
        "name": "created",
        "onCreate": true,
        "onUpdate": false,
        "presentable": false,
        "system": false,
        "type": "autodate"
      },
      {
        "hidden": false,
        "id": "_clone_LqlN",
        "name": "updated",
        "onCreate": true,
        "onUpdate": true,
        "presentable": false,
        "system": false,
        "type": "autodate"
      },
      {
        "cascadeDelete": false,
        "collectionId": "_pb_users_auth_",
        "hidden": false,
        "id": "_clone_4AR7",
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
        "id": "json89163564",
        "maxSize": 1,
        "name": "user_email",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "json"
      }
    ],
    "id": "pbc_1133636363",
    "indexes": [],
    "listRule": null,
    "name": "v_lunettes_avec_user",
    "system": false,
    "type": "view",
    "updateRule": null,
    "viewQuery": "\nSELECT\n  (ROW_NUMBER() OVER()) AS id,            \n  L.id                 AS lunette_id,\n  L.nom_modele,\n  L.prix               AS prix_euro,   \n  L.largeur_pont_mm,\n  L.largeur_verre_mm,\n  L.hauteur_verre_mm,\n  L.longueur_branche_mm,\n  L.taille_monture,\n  L.couleur_monture_hex,\n  L.couleur_branche_hex,\n  L.couleur_verre_hex,\n  L.created,\n  L.updated,\n  L.user               AS user_id,\n  (SELECT email FROM users WHERE users.id = L.user) AS user_email\nFROM lunette L;\n",
    "viewRule": null
  });

  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1133636363");

  return app.delete(collection);
})
