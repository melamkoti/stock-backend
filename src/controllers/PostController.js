import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



export const AllPosts = async (req, res) => {
  try {
    const Posts = await prisma.post.findMany();
    res.json(Posts);
  } catch (error) {
    console.error("Error fetching Posts", error);
    res.status(500).json({ error: "Error fetching posts" });
  }
};

export const PostThePost = async (req, res) => {
  try {
    const { title, description, date } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "Image is required!" });
    }

    const imagePath = path.join('uploads', req.file.filename); // relative path

    if (!title || !description || !date || !imagePath) {
      return res.status(400).json({ error: "All fields are required!" });
    }

    const post = await prisma.post.create({
      data: {
        title,
        description,
        image: imagePath,
        date,
      },
    });

    res.status(200).json(post);
  } catch (error) {
    console.error("Error posting post:", error);
    res.status(500).json({ error: "Error posting the post" });
  }
};


export const UpdateActivity = async (req, res) => {
  try {
    const postId = parseInt(req.params.id);
    const { title, description, date } = req.body;

    // If a new image is uploaded, get the path
    const imagePath = req.file ? `uploads/${req.file.filename}` : null;

    // Prepare the update object
    const updateData = {
      title,
      description,
      date,
      updatedAt: new Date(),
    };
 
    // Only include image if it was uploaded
    if (imagePath) {
      updateData.image = imagePath;
    }

    // Update activity in the database
    await prisma.post.update({
      where: { id: postId },
      data: updateData,
    });

    res.status(200).json({ message: "Post Updated Successfully" });
  } catch (error) {
    console.error("Error updating Post:", error);
    res.status(500).json({ error: "Error while updating the Post" });
  }
};

export const DeletePost = async (req, res) => {
  const postId = parseInt(req.params.id);
  try {
    await prisma.post.delete({
      where: {
        id: postId,
      },
    });
    res.status(200).send({message:"Post Deleted Successfully"})
  } catch (error) {
    console.error("Error Deleting the  Post", error);
    res.status(500).json({ error: "Error Deleting the post" });
  }
};


