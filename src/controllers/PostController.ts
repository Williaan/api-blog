import { Request, Response } from "express";
import { prisma } from "../utils/prisma";
import { validatePosts } from "../utils/yup";


export class PostController {
    async createPost(request: Request, response: Response) {
        const { title, description } = request.body;
        const { id } = request.params;

        try {
            await validatePosts.validate(request.body);

            const userExist = await prisma.user.findUnique({ where: { id: Number(id) } });
            if (!userExist) {
                return response.status(400).json("Usuário inexistente!")
            }

            const post = await prisma.post.create({
                data: {
                    title,
                    description,
                    userId: userExist.id
                },
            });

            return response.status(200).json(post);

        } catch (error) {
            return response.status(500).json(error);
        }
    }


    async getPosts(request: Request, response: Response) {

        try {

            const posts = await prisma.post.findMany({
                select: {
                    id: true,
                    title: true,
                    description: true,
                    create_at: true,
                    User: {
                        select: {
                            name: true,
                        }
                    }
                },

            });

            return response.status(200).json(posts);

        } catch (error) {
            return response.status(500).json(error);
        }
    }


    async updatePost(request: Request, response: Response) {
        const { id } = request.params;
        const { title, description } = request.body;

        try {
            await validatePosts.validate(request.body);

            const postExist = await prisma.post.findUnique({ where: { id: Number(id) } });
            if (!postExist) {
                return response.status(400).json("Esse post não existe!")
            }

            const post = await prisma.post.update({
                where: { id: Number(id) },
                data: {
                    title, description
                }
            });
            return response.status(200).json("Atualizado com sucesso!");


        } catch (error) {
            return response.status(500).json(error);
        }

    }


    async deletePost(request: Request, response: Response) {
        const { id } = request.params;

        try {
            const postExist = await prisma.post.findUnique({ where: { id: Number(id) } });
            if (!postExist) {
                return response.status(400).json("Esse post não existe!")
            }

            const post = await prisma.post.delete({ where: { id: Number(id) } });

            return response.status(200).json("Post deletado com sucesso!")

        } catch (error) {
            return response.status(500).json(error);
        }
    }

    async getPost(request: Request, response: Response) {
        const { id } = request.params;

        const postExist = await prisma.post.findUnique({ where: { id: Number(id) } });

        if (!postExist) {
            return response.status(404).json("Post não encontrado!");
        }

        const post = await prisma.post.findUnique({
            where: { id: Number(id) },
            select: {
                id: true,
                title: true,
                description: true,
                create_at: true,
                User: {
                    select: {
                        name: true
                    }
                }
            }
        })

        return response.json(post)
    }
}