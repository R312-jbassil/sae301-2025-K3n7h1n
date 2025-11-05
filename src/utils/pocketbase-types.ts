/**
 * This file was @generated using pocketbase-typegen
 */

import type PocketBase from 'pocketbase'
import type { RecordService } from 'pocketbase'

export enum Collections {
	Commande = "commande",
	Commande2 = "commande2",
	Configure = "configure",
	Genere = "genere",
	Lunette = "lunette",
	LunetteIa = "lunette_ia",
	Materiau = "materiau",
	MaterielBranche = "materiel_branche",
	MaterielMonture = "materiel_monture",
	MaterielVerre = "materiel_verre",
	Users = "users",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

// System fields
export type BaseSystemFields<T = never> = {
	id: RecordIdString
	created: IsoDateString
	updated: IsoDateString
	collectionId: string
	collectionName: Collections
	expand?: T
}

export type AuthSystemFields<T = never> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export type CommandeRecord = {
	numero_commande?: string
	date_commande?: IsoDateString
	etat_commande?: string
	montant_total?: number
	id_utilisateur?: RecordIdString
}

export type Commande2Record = {
	numero_commande?: string
	date_commande?: IsoDateString
	etat_commande?: string
	montant_total?: number
	id_utilisateur?: RecordIdString
}

export type ConfigureRecord = {
	id_lunette?: RecordIdString
	id_utilisateur?: RecordIdString
}

export type GenereRecord = {
	id_utilisateur?: RecordIdString
	id_svg_ia?: RecordIdString
}

export type LunetteRecord = {
	nom_modele?: string
	largeur_pont_mm?: number
	largeur_verre_mm?: number
	hauteur_verre_mm?: number
	longueur_branche_mm?: number
	taille_monture?: number
	couleur_monture_hex?: string
	couleur_branche_hex?: string
	couleur_verre_hex?: string
}

export type LunetteIaRecord = {
	modele_ia?: string
	chat_history?: string // JSON string containing array of messages
	code_svg?: any // JSON field
}

// Helper type for parsed chat history
export type ChatMessage = {
	role: 'user' | 'assistant' | 'system'
	content: string
}

export type MateriauRecord = {
	libelle?: string
}

export type MaterielBrancheRecord = {
	id_materiau?: RecordIdString
	id_lunette?: RecordIdString
}

export type MaterielMontureRecord = {
	id_materiau?: RecordIdString
	id_lunette?: RecordIdString
}

export type MaterielVerreRecord = {
	id_materiau?: RecordIdString
	id_lunette?: RecordIdString
}

export type UsersRecord = {
	nom?: string
}

// Response types include system fields and match responses from the PocketBase API
export type CommandeResponse<Texpand = unknown> = Required<CommandeRecord> & BaseSystemFields<Texpand>
export type Commande2Response<Texpand = unknown> = Required<Commande2Record> & BaseSystemFields<Texpand>
export type ConfigureResponse<Texpand = unknown> = Required<ConfigureRecord> & BaseSystemFields<Texpand>
export type GenereResponse<Texpand = unknown> = Required<GenereRecord> & BaseSystemFields<Texpand>
export type LunetteResponse<Texpand = unknown> = Required<LunetteRecord> & BaseSystemFields<Texpand>
export type LunetteIaResponse<Texpand = unknown> = Required<LunetteIaRecord> & BaseSystemFields<Texpand>
export type MateriauResponse<Texpand = unknown> = Required<MateriauRecord> & BaseSystemFields<Texpand>
export type MaterielBrancheResponse<Texpand = unknown> = Required<MaterielBrancheRecord> & BaseSystemFields<Texpand>
export type MaterielMontureResponse<Texpand = unknown> = Required<MaterielMontureRecord> & BaseSystemFields<Texpand>
export type MaterielVerreResponse<Texpand = unknown> = Required<MaterielVerreRecord> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>

// Types for TypedPocketBase
export type CollectionRecords = {
	commande: CommandeRecord
	commande2: Commande2Record
	configure: ConfigureRecord
	genere: GenereRecord
	lunette: LunetteRecord
	lunette_ia: LunetteIaRecord
	materiau: MateriauRecord
	materiel_branche: MaterielBrancheRecord
	materiel_monture: MaterielMontureRecord
	materiel_verre: MaterielVerreRecord
	users: UsersRecord
}

export type CollectionResponses = {
	commande: CommandeResponse
	commande2: Commande2Response
	configure: ConfigureResponse
	genere: GenereResponse
	lunette: LunetteResponse
	lunette_ia: LunetteIaResponse
	materiau: MateriauResponse
	materiel_branche: MaterielBrancheResponse
	materiel_monture: MaterielMontureResponse
	materiel_verre: MaterielVerreResponse
	users: UsersResponse
}

// Type for instantiated PocketBase instance with proper typing
export type TypedPocketBase = PocketBase & {
	collection(idOrName: 'commande'): RecordService<CommandeResponse>
	collection(idOrName: 'commande2'): RecordService<Commande2Response>
	collection(idOrName: 'configure'): RecordService<ConfigureResponse>
	collection(idOrName: 'genere'): RecordService<GenereResponse>
	collection(idOrName: 'lunette'): RecordService<LunetteResponse>
	collection(idOrName: 'lunette_ia'): RecordService<LunetteIaResponse>
	collection(idOrName: 'materiau'): RecordService<MateriauResponse>
	collection(idOrName: 'materiel_branche'): RecordService<MaterielBrancheResponse>
	collection(idOrName: 'materiel_monture'): RecordService<MaterielMontureResponse>
	collection(idOrName: 'materiel_verre'): RecordService<MaterielVerreResponse>
	collection(idOrName: 'users'): RecordService<UsersResponse>
}
