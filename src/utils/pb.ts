import PocketBase from 'pocketbase';
import type { TypedPocketBase } from "./pocketbase-types.ts";

let path = '';
if (import.meta.env.MODE === 'development') {
    path = 'http://localhost:8090';    // localhost = machine de dev
} else {
    // En production, PocketBase doit être accessible via une URL
    // Options possibles :
    // 1. Sous-domaine : 'https://pb.sae301.enzo-locatelli.fr'
    // 2. Même domaine avec reverse proxy : 'https://sae301.enzo-locatelli.fr/pb'
    // 3. Port direct (si ouvert) : 'https://sae301.enzo-locatelli.fr:8090'
    path = 'https://sae301.enzo-locatelli.fr/pb';
}

const pb = new PocketBase(path) as TypedPocketBase;
export default pb;