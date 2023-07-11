import autores from "../models/Autor.js";

class AutorController {
	static listarAutores = async (req, res) => {
		try {
			const autoresResultado = await autores.find();
			res.status(200).json(autoresResultado)
		} catch (err) {
			res.status(500).json(err);
		}
	}

	static listarAutorPorID = async (req, res) => {
		try {
			const id = req.params.id;
			const autor = await autores.findById(id);
			res.status(200).json(autor)
		} catch (err) {
			res.status(500).json(err.message);
		}
	}

	static cadastrarAutor = async (req, res) => {
		let autor = new autores(req.body);

		try {
			await autor.save();
			res.status(201).send(autor.toJSON());
		} catch (err) {
			res.status(500).send(err.message)
		}
	}

	static atualizarAutor= async (req, res) => {
		try {
			const id = req.params.id;
			await autores.findByIdAndUpdate(id, {$set: req.body});
			res.status(200).send("Autor atualizado com sucesso!");
		} catch (err) {
			res.status(500).json(err.message);
		}
	}

	static excluirAutor = async (req, res) => {
		try {
			const id = req.params.id;
			await autores.findByIdAndDelete(id);
			res.status(200).send("Autor removido com sucesso!");
		} catch (err) {
			res.status(500).json(err.message);
		}
	}

}

export default AutorController