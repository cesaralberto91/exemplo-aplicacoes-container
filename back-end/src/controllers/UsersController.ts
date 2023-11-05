import { Request, Response } from "express";
import { getRepository } from "typeorm";
import User from "../models/User";
import { AppDataSource } from "../data-source";

export default {
  async create(request: Request, response: Response) {
    console.log("CREATE");

    //desestruturar o corpo da requisição (JSON)
    console.log(request.body);

    const { nome, salario } = request.body;

    const userRepository = AppDataSource.getRepository(User);

    const user = userRepository.create({
      nome,
      salario,
    });
    try {
      await userRepository.save(user);

      return response.status(201).json(user);
    } catch (erro) {
      return response.status(400).json({"message": "Falhou ao cadastrar usuário."});
    }
  },

  async delete(request: Request, response: Response) {
    console.log("DELETE");

    const { id } = request.params;
    console.log("ID: ", id);

    if (id == null) {
      return response.status(406).json({ erro: "Usuário não existe." });
    }

    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({
      id: +id,
    });
    if (user) {
      await userRepository.remove(user);

      return response.status(202).json({ mensagem: "Usuário excluído." });
    }
    return response.status(404).json({ erro: "Usuário não existe." });
  },

  async update(request: Request, response: Response) {
    console.log("UPDATE");

    const { id } = request.params;
    if (id == null) {
      return response.status(406).json({ erro: "Usuário não existe." });
    }

    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({
      id: +id,
    });

    if (user) {
      const { nome, salario } = request.body;
      userRepository.merge(user, { nome, salario });
      await userRepository.save(user);

      return response.status(202).json(user);
    }
    return response.status(404).json({ erro: "Usuário não existe." });
  },

  async index(request: Request, response: Response) {
    console.log("INDEX");

    const userRepository = AppDataSource.getRepository(User);

    const users = await userRepository.find();

    response.json(users);
  },
  async show(request: Request, response: Response) {
    console.log("SHOW");

    const { id } = request.params;
    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOneBy({
      id: +id,
    });

    response.json(user);
  },
};
