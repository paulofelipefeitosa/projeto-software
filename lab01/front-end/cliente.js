const listagem_view = document.getElementById('listagem');

const mensagens = [];
function update_view() {
	const initialTableContent = '<tr> <th>Título</th> <th>Mensagem</th> <th>Autor</th> <th>Criado em</th> </tr>'
    const items = mensagens.map(e => `<tr> <td>${e.title}</td> <td>${e.msg}</td> <td>${e.author}</td> <td>${e.created_at}</td> </tr>`).join("\n");
    listagem_view.innerHTML = '<table>' + initialTableContent + items + '</table>';
}

const backendURI = 'http://150.165.85.16:9900';

fetch(backendURI + '/api/msgs')
.then(r => r.json())
.then(data => {
    Object.assign(mensagens, data);
    update_view();
})

function submitMsgForm() {
	const formTitle = document.getElementById('cadastro_msg_title').value;
	const formAuthor = document.getElementById('cadastro_msg_autor').value;
	const formMsg = document.getElementById('cadastro_msg_mensagem').value;
	const formUserId = document.getElementById('cadastro_authentication_id').value;
	const formUserPassword = document.getElementById('cadastro_authentication_password').value;
	const credential = formUserId + ":" + formUserPassword;
	const mensagem = {
		title: formTitle, 
		author: formAuthor, 
		msg: formMsg,
		created_at: "Pending",
		credentials: credential
	};
	mensagens.push(mensagem);
	update_view();
	doPostRequestForBackend(mensagem)
	alert("Cadastramento de Mensagem Submetido" + "\n" + 
		"Título: " + mensagem.title + "\n" + 
		"Autor: " + mensagem.author + "\n" + 
		"Mensagem: " + mensagem.msg);
}

function doPostRequestForBackend(message) {
	fetch(backendURI + '/api/msgs', {
		method: "POST",
		body: JSON.stringify(message)
	})
	.then(function (r) {
		if(r.status == 200 || r.status == 201) {
			alert("Mensagem " + message.title + " Criada");
		} else {
			alert("Criação da Mensagem " + message.title + " Falhou" + 
				"\nStatus Code: " + r.status);
		}
	})
}