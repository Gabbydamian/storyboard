import { supabase } from "@/lib/supabse";


async function uploadImage(file: File) {
  const fileName = `${Date.now()}-${file.name}`; // Avoid filename conflicts
  const filePath = `story-images/${fileName}`;

  const { data, error } = await supabase.storage
    .from("story-images")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: true,
    });

    console.log("From fetch.ts",data);
    

  if (error) {
    console.error("Upload failed:", error);
    return null;
  }

  return supabase.storage.from("story-images").getPublicUrl(filePath).data
    .publicUrl;
}


export default uploadImage;