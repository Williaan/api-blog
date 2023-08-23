import { Request, Response } from "express";
import { prisma } from "../utils/prisma";
import { validateAccess } from "../utils/yup";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";


export class LoginController {
    async login(request: Request, response: Response) {
        const { email, password } = request.body;

        try {
            await validateAccess.validate(request.body);

            const user = await prisma.user.findUnique({ where: { email } });
            if (!user) {
                return response.status(400).json("E-mail ou senha incorreta!")
            }

            const isPassword = await compare(password, user.password);

            if (!isPassword) {
                return response.status(400).json("E-mail ou senha incorreta!")
            }

            const token = sign({ id: user.id }, process.env.SECRET_KEY, { expiresIn: "1d" });

            const { id } = user;

            return response.status(200).json({ user: { id, email }, token });


        } catch (error) {
            return response.status(500).json(error);
        }
    }
}