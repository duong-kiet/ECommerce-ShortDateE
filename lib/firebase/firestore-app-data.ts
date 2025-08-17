import app from "@/lib/firebase/firebase.config"
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  doc,
  DocumentData,
  QueryDocumentSnapshot,
  DocumentSnapshot,
} from "firebase/firestore"
import { Product, Category } from "@/lib/data"

function mapCategoryDoc(snapshot: QueryDocumentSnapshot<DocumentData> | DocumentSnapshot<DocumentData>): Category {
  const data = snapshot.data() ?? {}
  return {
    ...(data as Omit<Category, "id">),
    id: snapshot.id,
  }
}

export async function getProducts(): Promise<Product[]> {
  const db = getFirestore(app)
  const snap = await getDocs(collection(db, "products"))
  return snap.docs.map((doc) => ({
    ...(doc.data() as Omit<Product, "id">),
    id: doc.id,
  }))
}

export async function getProductById(productId: string): Promise<Product | null> {
  const db = getFirestore(app)
  const snap = await getDoc(doc(db, "products", productId))
  if (!snap.exists()) return null
  return {
    ...(snap.data() as Omit<Product, "id">),
    id: snap.id,
  }
}

export async function getProductsByCategory(
  categoryId: string
): Promise<Product[]> {
  const db = getFirestore(app);  
  const categorySnap = await getDoc(doc(db, "categories", categoryId));
  // console.log(categorySnap.data());
  if (!categorySnap.exists()) return [];
  const category = mapCategoryDoc(categorySnap);
  if (!category.products || category.products.length === 0) return [];
  const productSnaps = await Promise.all(
    category.products.map((pid) => getDoc(doc(db, "products", pid)))
  );
  return productSnaps
    .filter((snap) => snap.exists())
    .map((snap) => ({
      ...(snap.data() as Omit<Product, "id">),
      id: snap.id,
    }));
}
export async function getCategories(): Promise<Category[]> {
  const db = getFirestore(app)
  const snap = await getDocs(collection(db, "categories"))
  return snap.docs.map(mapCategoryDoc)
}

export async function getCategoryById(categoryId: string): Promise<Category | null> {
  const db = getFirestore(app)
  const snap = await getDoc(doc(db, "categories", categoryId))
  if (!snap.exists()) return null
  return mapCategoryDoc(snap)
}

export async function getDealProducts(): Promise<Product[]> {
  const db = getFirestore(app)
  const snap = await getDocs(collection(db, "products"))
  return snap.docs
    .map((doc) => ({
      ...(doc.data() as Omit<Product, "id">),
      id: doc.id,
    }))
    .filter((product) => !!product.dealEndDate)
}

export async function getProductsByType(type: "dry" | "fresh"): Promise<Product[]> {
  const db = getFirestore(app)
  const snap = await getDocs(collection(db, "products"))
  return snap.docs
    .map((doc) => ({
      ...(doc.data() as Omit<Product, "id">),
      id: doc.id,
    }))
    .filter((product) => product.productType === type)
}

export async function getAutoPricingProducts(): Promise<Product[]> {
  const db = getFirestore(app)
  const snap = await getDocs(collection(db, "products"))
  return snap.docs
    .map((doc) => ({
      ...(doc.data() as Omit<Product, "id">),
      id: doc.id,
    }))
    .filter((product) => product.autoPricingEnabled)
}