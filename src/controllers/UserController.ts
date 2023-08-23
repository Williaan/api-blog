import { Request, Response } from "express";
import { prisma } from "../utils/prisma";
import { hash } from "bcryptjs";
import { validateUser } from "../utils/yup";


export class UserController {
    async createUser(request: Request, response: Response) {
        const { name, email, password } = request.body;

        try {
            await validateUser.validate(request.body);

            const userExist = await prisma.user.findUnique({ where: { email } });

            if (userExist) {
                return response.status(400).json("Já existe um usuário com esse e-mail!")
            }

            const hashPassword = await hash(password, 8);

            const user = await prisma.user.create({
                data: {
                    name,
                    email,
                    password: hashPassword,
                },
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            });

            return response.status(200).json(user);

        } catch (error) {
            return response.status(500).json(error);
        }
    }
}