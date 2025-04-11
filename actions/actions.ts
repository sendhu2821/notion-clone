"use server";

import { adminDB } from "@/firebase-admin";
import liveblocks from "@/lib/liveblocks";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { title } from "process";

export async function createNewDocument() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const { sessionClaims } = await auth();

  const docCollectionRef = adminDB.collection("documents");
  const docRef = await docCollectionRef.add({
    title: "New Doc",
  });

  await adminDB
    .collection("users")
    .doc(sessionClaims?.email!)
    .collection("rooms")
    .doc(docRef.id)
    .set({
      userId: sessionClaims?.email!,
      role: "owner",
      createdAt: new Date(),
      roomId: docRef.id,
    });

  return { docID: docRef.id };
}

export async function deleteDocument(roomId: string) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  console.log("delete Document", roomId);

  try {
    // Deletes the document from the reference
    await adminDB.collection("documents").doc(roomId).delete();

    const query = await adminDB
      .collectionGroup("rooms")
      .where("roomId", "==", roomId)
      .get();

    const batch = await adminDB.batch();

    //delete the room reference in the user's collection for every user in the room
    query.docs.forEach((doc) => batch.delete(doc.ref));

    await batch.commit();

    //delete the room in liveblocks
    await liveblocks.deleteRoom(roomId);

    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}

export async function inviteUserToDocument(roomId: string, email: string) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  console.log("Invited user and room id", email, roomId);

  try {
    await adminDB
      .collection("users")
      .doc(email)
      .collection("rooms")
      .doc(roomId)
      .set({
        userId: email,
        role: "editor",
        createdAt: new Date(),
        roomId,
      });
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}

export async function removeUserFromDocument(roomId: string, email: string) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  try {
    await adminDB
      .collection("users")
      .doc(email)
      .collection("rooms")
      .doc(roomId)
      .delete();

    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}
