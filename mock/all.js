// Esse é apenas um arquivo para mockar um banco de dados.
import { uuid as uuidv4 } from 'uuidv4';

export const addNewComment = async (userId, comment, positionGeo, toUser, repliesId) => {
	const newComment = {
		id: uuidv4(),
		userId,
		comment,
		positionGeo,
		toUser,
		repliesId,
		createdAt: new Date(),
		mock: "Esse é um retorno chumbado para mockar um banco de dados",
	}

	return newComment
}

export const getChildrensComments = async (id) => {
	const childrensComments = [
		{
			id: uuidv4(),
			userId: uuidv4(),
			comment: "Esse é um comentário filho",
			positionGeo: null,
			toUser: null,
			repliesId: id,
			createdAt: new Date(),
			mock: "Esse é um retorno chumbado para mockar um banco de dados",
		},
		{
			id: uuidv4(),
			userId: uuidv4(),
			comment: "Esse é um comentário filho",
			positionGeo: null,
			toUser: null,
			repliesId: id,
			createdAt: new Date(),
			mock: "Esse é um retorno chumbado para mockar um banco de dados",
		},
	]

	return childrensComments
}

export const getFathersComments = async (positionGeo, toUser) => {
	const fathersComments = [
		{
			id: uuidv4(),
			userId: uuidv4(),
			comment: "Esse é um comentário pai",
			positionGeo,
			toUser,
			repliesId: null,
			createdAt: new Date(),
			mock: "Esse é um retorno chumbado para mockar um banco de dados",
		},
		{
			id: uuidv4(),
			userId: uuidv4(),
			comment: "Esse é um comentário pai",
			positionGeo,
			toUser,
			repliesId: null,
			createdAt: new Date(),
			mock: "Esse é um retorno chumbado para mockar um banco de dados",
		},
	]

	return fathersComments
}

export const editComment = async (id, comment) => {
	const editedComment = {
		id,
		mensagem: "comentário editado com sucesso",
		comment,
		createdAt: new Date(),
		mock: "Esse é um retorno chumbado para mockar um banco de dados",
	}

	return editedComment
}

export const disableComment = async (id) => {

	const disabledComment = {
		id,
		mensagem: "comentário desativado com sucesso",
		createdAt: new Date(),
		mock: "Esse é um retorno chumbado para mockar um banco de dados",
	}

	return disabledComment
}

// User perfil

export const getPerfil = async (id) => {
	const perfil = {
		id,
		nome: "Nome do usuário",
		email: "teste@example.com",
		createdAt: new Date(),
		mock: "Esse é um retorno chumbado para mockar um banco de dados",
	}

	return perfil
}

export const updateMail = async (id, email) => {
	const updateMail = {
		id,
		email,
		mensagem: "Email atualizado com sucesso",
		createdAt: new Date(),
		mock: "Esse é um retorno chumbado para mockar um banco de dados",
	}

	return updateMail
}

export const updatePassword = async (id, password) => {
	const updatePassword = {
		id,
		password,
		mensagem: "Senha atualizada com sucesso",
		createdAt: new Date(),
		mock: "Esse é um retorno chumbado para mockar um banco de dados",
	}

	return updatePassword
}

export const editInterests = async (id, interests) => {
	const editInterests = {
		id,
		interests,
		mensagem: "Interesses atualizados com sucesso",
		createdAt: new Date(),
		mock: "Esse é um retorno chumbado para mockar um banco de dados",
	}

	return editInterests
}

export const getInterests = async (id) => {
	const interests = [
		{
			id: uuidv4(),
			interest: "Esporte",
			createdAt: new Date(),
			mock: "Esse é um retorno chumbado para mockar um banco de dados",
		},
		{
			id: uuidv4(),
			interest: "Cinema",
			createdAt: new Date(),
			mock: "Esse é um retorno chumbado para mockar um banco de dados",
		},
	]

	return interests
}


export const editLifestyle = async (id, lifestyle) => {
	const editLifestyle = {
		id,
		lifestyle,
		mensagem: "Estilo de vida atualizado com sucesso",
		createdAt: new Date(),
		mock: "Esse é um retorno chumbado para mockar um banco de dados",
	}

	return editLifestyle
}

export const getLifestyle = async (id) => {
	const lifestyle = [
		{
			id: uuidv4(),
			lifestyle: "bar, balada, festa",
			createdAt: new Date(),
			mock: "Esse é um retorno chumbado para mockar um banco de dados",
		},
		{
			id: uuidv4(),
			lifestyle: "Cerveja",
			createdAt: new Date(),
			mock: "Esse é um retorno chumbado para mockar um banco de dados",
		},
	]

	return lifestyle
}

export const newMatch = async (id, matchId) => {
	const newMatch = {
		id,
		matchId,
		mensagem: "Match realizado com sucesso",
		createdAt: new Date(),
		mock: "Esse é um retorno chumbado para mockar um banco de dados",
	}

	return newMatch
}

export const getMatches = async (id) => {
	const matches = [
		{
			id: uuidv4(),
			userId: uuidv4(),
			createdAt: new Date(),
			mock: "Esse é um retorno chumbado para mockar um banco de dados",
		},
		{
			id: uuidv4(),
			userId: uuidv4(),
			createdAt: new Date(),
			mock: "Esse é um retorno chumbado para mockar um banco de dados",
		},
	]

	return matches
}

export const acceptMatch = async (id, matchId, isaccept) => {
	const acceptMatch = {
		id,
		matchId,
		mensagem: isaccept ? "Match aceito com sucesso" : "Match recusado com sucesso",
		createdAt: new Date(),
		mock: "Esse é um retorno chumbado para mockar um banco de dados",
	}

	return acceptMatch
}

export const unmatch = async (id, matchId) => {
	const unmatch = {
		id,
		matchId,
		mensagem: "Desfazer match realizado com sucesso",
		createdAt: new Date(),
		mock: "Esse é um retorno chumbado para mockar um banco de dados",
	}

	return unmatch
}
