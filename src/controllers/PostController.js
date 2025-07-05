import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

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
    const imageUrl = req.file?.location;
    if (!title || !description || !date || !imageUrl) {
      return res.status(400).json({ error: "All fields are required!" });
    }
    const Post = await prisma.post.create({
      data: {
        title,
        description,
        image: imageUrl,
        date,
      },
    });
    res.json(Post);
  } catch (error) {
    res.status(500).json({ error: "Error Post the Post" });
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

export const UpdateActivity = async (req, res) => {
  try {
    // Parse ID from route parameter
    const postId = parseInt(req.params.id);

    // Destructure incoming fields
    const { title, image, description, date } = req.body;

    // Update activity in the database
    await prisma.activity.update({
      where: { id: postId },
      data: {
        title,
        description,
        image,
        date,
        updatedAt: new Date(),
      },
    });

    // Success response
    res.status(200).json({
      message: "Post Updated Successfully",
    });
  } catch (error) {
    console.error("Error updating Post:", error);
    res.status(500).json({
      error: "Error while updating the Post",
    });
  }
};