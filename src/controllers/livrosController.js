import livros from "../models/Livro.js";

class LivroController {
	static listarLivros = async (req, res) => {
		try {
			const livrosResultado = await livros.find();
			res.status(200).json(livrosResultado);		
		} catch (err) {
			res.status(500).json(err);
		}
	}

	static listarLivroPorEditora = async (req, res) => {
		const editora = req.query.editora

		try {
			const livrosResultado = await livros.find({'editora': editora})
			res.status(200).send(livrosResultado);
		} catch(err) {
			res.status(500).json(err);
		}
		
		livros.find({'editora': editora}, {}, (err, livros) => {
		  res.status(200).send(livros);
		  
		})
	  }	  

	static listaLivroPorID = async (req, res) => {
		try {
			const id = req.params.id;
			const livro = await livros.findById(id);
			res.status(200).json(livro)
		} catch (err) {
			res.status(500).json(err.message);
		}
	}

	static cadastrarLivro = async (req, res) => {
		let livro = new livros(req.body);

		try {
			await livro.save();
			res.status(201).send(livro.toJSON());
		} catch (err) {
			res.status(500).send(err.message)
		}
	}

	static atualizarLivro = async (req, res) => {
		try {
			const id = req.params.id;
			await livros.findByIdAndUpdate(id, {$set: req.body});
			res.status(200).send("Livro atualizado com sucesso!");
		} catch (err) {
			res.status(500).json(err.message);
		}
	}

	static excluirLivro = async (req, res) => {
		try {
			const id = req.params.id;
			await livros.findByIdAndDelete(id);
			res.status(200).send("Livro removido com sucesso!");
		} catch (err) {
			res.status(500).json(err.message);
		}
	}

}

export default LivroController