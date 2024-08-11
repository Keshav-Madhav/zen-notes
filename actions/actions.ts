'use server'

import { adminDb } from "@/firebase-admin";
import liveblocks from "@/lib/liveblocks";
import { auth } from "@clerk/nextjs/server"

export async function createNewDocument() {
  auth().protect();

  const {sessionClaims} = await auth();

  const docCollectionRef = adminDb.collection("documents");

  const docRef = await docCollectionRef.add({
    title: 'Untitled Document',
  })

  await adminDb.collection("users").doc(sessionClaims?.email!).collection("rooms").doc(docRef.id).set({
    userId: sessionClaims?.email!,
    role: "owner",
    createdAt: new Date(),
    roomId: docRef.id,
  })

  return {docId: docRef.id}
}

export async function deleteDoc(docId: string) {
  auth().protect();

  try {
    await adminDb.collection("documents").doc(docId).delete()

    const query = await adminDb.collectionGroup("rooms").where("roomId", '==', docId).get()

    const batch = adminDb.batch();

    query.docs.forEach((doc) => {
      batch.delete(doc.ref)
    })

    await batch.commit()

    await liveblocks.deleteRoom(docId)

    return {success: true}
  } catch (error) {
    console.error(error)
    return {success: false}
  }
}

export async function inviteUserToDoc(docId: string, email: string) {
  auth().protect();

  try {
    await adminDb.collection("users").doc(email).collection("rooms").doc(docId).set({
      userId: email,
      role: "collaborator",
      createdAt: new Date(),
      roomId: docId,
    })

    return {success: true}
  } catch (error) {
    console.error(error)
    return {success: false}
  }
}

export async function makeOwnerOfDoc(docId: string, userId: string) {
  auth().protect();

  try {
    await adminDb.collection("users").doc(userId).collection("rooms").doc(docId).update({
      role: "owner"
    })

    return {success: true}
  } catch (error) {
    console.error(error)
    return {success: false}
  }
}

export async function removeOwnerOfDoc(docId: string, userId: string) {
  auth().protect();

  try {
    await adminDb.collection("users").doc(userId).collection("rooms").doc(docId).update({
      role: "collaborator"
    })

    return {success: true}
  } catch (error) {
    console.error(error)
    return {success: false}
  }
}

export async function removeUserFromDoc(docId: string, userId: string) {
  auth().protect();

  try {
    await adminDb.collection("users").doc(userId).collection("rooms").doc(docId).delete()

    return {success: true}
  } catch (error) {
    console.error(error)
    return {success: false}
  }
}